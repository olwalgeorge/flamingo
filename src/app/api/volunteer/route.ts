import { NextRequest, NextResponse } from 'next/server';
import { 
  createVolunteerApplication, 
  validateApplicationData,
  getVolunteerPositionById,
  type VolunteerApplicationFormData 
} from '@/data/volunteerPositions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { positionId, formData } = body;

    // Validate that the position exists
    const position = getVolunteerPositionById(positionId);
    if (!position) {
      return NextResponse.json(
        { error: 'Invalid position ID' },
        { status: 400 }
      );
    }

    // Validate form data
    const validation = validateApplicationData(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Create application object
    const applicationData = createVolunteerApplication(positionId, formData as VolunteerApplicationFormData);
    
    // Generate a unique application ID and add metadata
    const application = {
      id: `vol-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...applicationData,
      applicationDate: new Date(),
      status: 'pending' as const
    };

    // In a real application, you would save this to a database
    console.log('New volunteer application:', application);

    // Here you could also:
    // 1. Send confirmation email to applicant
    // 2. Send notification email to volunteer coordinator
    // 3. Save to database
    // 4. Integrate with CRM system

    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Error processing volunteer application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const applicationId = searchParams.get('id');

  if (!applicationId) {
    return NextResponse.json(
      { error: 'Application ID is required' },
      { status: 400 }
    );
  }

  // In a real application, you would fetch from database
  // For now, return a mock response
  return NextResponse.json({
    id: applicationId,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    message: 'Application is being reviewed'
  });
}
