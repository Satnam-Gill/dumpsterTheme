// app/image/[...imagePath]/route.ts
console.log('Image proxy route loaded') 

import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { imagePath: string[] } }
) {
  console.log('Custom image route triggered')

  const imagePath = params.imagePath.join('/')
  
  // Replace with your actual ImageKit ID
  const imagekitURL = `https://ik.imagekit.io/z6skgnupx/${imagePath}`

  try {
    const imageRes = await fetch(imagekitURL)

    if (!imageRes.ok) {
      console.error(`Image fetch failed: ${imageRes.statusText}`)
      return new NextResponse('Image not found', { status: 404 })
    }

    const contentType = imageRes.headers.get('content-type') || 'image/jpeg'
    const buffer = await imageRes.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (err) {
    console.error('Image proxy error:', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
