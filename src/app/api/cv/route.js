// Simple in-memory storage for CVs (for development/testing)
let cvStorage = [];
let nextId = 1;

export async function GET(req) {
  try {
    return Response.json({ success: true, data: cvStorage });
  } catch (error) {
    console.error('GET /api/cv error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { fileData, ...cvData } = body;

    const newCV = {
      _id: `cv_${nextId++}`,
      name: cvData.name,
      type: cvData.type,
      fileName: cvData.fileName,
      fileSize: cvData.fileSize,
      fileType: cvData.fileType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: cvData.data || {},
    };

    cvStorage.push(newCV);

    return Response.json({ 
      success: true, 
      data: newCV
    });
  } catch (error) {
    console.error('POST /api/cv error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { _id, fileData, ...updateData } = body;

    const index = cvStorage.findIndex(cv => cv._id === _id);
    if (index !== -1) {
      cvStorage[index] = {
        ...cvStorage[index],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
    }

    return Response.json({ success: true, data: cvStorage[index] });
  } catch (error) {
    console.error('PUT /api/cv error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    cvStorage = cvStorage.filter(cv => cv._id !== id);

    return Response.json({ success: true, data: { deletedCount: 1 } });
  } catch (error) {
    console.error('DELETE /api/cv error:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

