import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// This tells Next.js to dynamically generate this route at request time
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching for this route

export async function GET(request: Request) {
  try {
    // Read blogs.json
    const filePath = join(process.cwd(), 'components', 'Content', 'blogs.json');
    const fileData = readFileSync(filePath, 'utf-8');
    const blogs = JSON.parse(fileData);

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const todayStr = today.toISOString().split('T')[0]; // Gets YYYY-MM-DD

    // Filter blogs by publishedAt <= today and sort by date (newest first)
    const filteredBlogs = blogs
      .filter((blog: any) => {
        const publishDate = new Date(blog.publishedAt);
        publishDate.setHours(0, 0, 0, 0); // Reset time to start of day
        return publishDate <= today;
      })
      .sort((a: any, b: any) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });

    if (filteredBlogs.length === 0) {
      return NextResponse.json(
        { message: 'No published blogs found for the current date', currentDate: todayStr },
        { 
          status: 404,
          headers: {
            'Cache-Control': 'no-store, must-revalidate',
            'Pragma': 'no-cache',
          }
        }
      );
    }

    // Return filtered blogs with cache control headers
    return new NextResponse(JSON.stringify({
      blogs: filteredBlogs,
      currentDate: todayStr,
      totalBlogs: filteredBlogs.length
    }), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error in blogs route:', error);
    return NextResponse.json(
      { message: 'Error reading blogs', error: String(error) },
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