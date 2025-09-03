import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const filePath = join(process.cwd(), 'components', 'Content', 'neighborhoodContent.json');
    const fileData = readFileSync(filePath, 'utf-8');
    const neighborhoodsObject = JSON.parse(fileData);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    // Flatten object keyed by slug into array
    const neighborhoodsArray = Object.keys(neighborhoodsObject).map((key) => {
      const item = neighborhoodsObject[key] || {};
      // Ensure slug present
      if (!item.slug) {
        item.slug = key;
      }
      return item;
    });

    const filteredNeighborhoods = neighborhoodsArray
      .filter((entry: any) => {
        if (!entry || !entry.publishedAt) {
          // No publish date -> show by default
          return true;
        }
        const publishDate = new Date(entry.publishedAt);
        publishDate.setHours(0, 0, 0, 0);
        return publishDate <= today;
      })
      .sort((a: any, b: any) => {
        const aDate = a?.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const bDate = b?.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return bDate - aDate;
      });

    if (filteredNeighborhoods.length === 0) {
      return NextResponse.json(
        { message: 'No published neighborhoods found for the current date', currentDate: todayStr },
        {
          status: 404,
          headers: {
            'Cache-Control': 'no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        }
      );
    }

    return new NextResponse(JSON.stringify({
      neighborhoods: filteredNeighborhoods,
      currentDate: todayStr,
      totalNeighborhoods: filteredNeighborhoods.length,
    }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error in neighborhoods route:', error);
    return NextResponse.json(
      { message: 'Error reading neighborhoods', error: String(error) },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
        }
      }
    );
  }
}
