import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    
    // Ping the database
    await db.command({ ping: 1 });
    
    return Response.json({ 
      success: true, 
      message: 'Connected to MongoDB successfully' 
    });
  } catch (error) {
    return Response.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
