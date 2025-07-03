import { NextRequest, NextResponse } from 'next/server';
import { financialService } from '@/services/financialManagement';

export async function POST(request: NextRequest) {
  try {
    const { action, eventId, data } = await request.json();

    switch (action) {
      case 'initializeFinances':
        financialService.initializeEventFinances(data.event, data.initialBudget, data.fundraisingTarget);
        return NextResponse.json({ success: true, message: 'Financial tracking initialized' });

      case 'addDonation':
        financialService.addDonation(eventId, data);
        return NextResponse.json({ success: true, message: 'Donation added successfully' });

      case 'addExpenditure':
        const expenditure = financialService.addExpenditure({ ...data, eventId });
        return NextResponse.json({ success: true, data: expenditure });

      case 'createBudget':
        const budget = financialService.createBudget(eventId, data.totalBudget, data.currency);
        return NextResponse.json({ success: true, data: budget });

      case 'generateReport':
        const report = financialService.generateReport(eventId, data.reportType, data.generatedBy);
        return NextResponse.json({ success: true, data: report });

      default:
        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Financial API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const action = searchParams.get('action');

    if (!eventId) {
      return NextResponse.json({ success: false, message: 'Event ID required' }, { status: 400 });
    }

    switch (action) {
      case 'getFinancialData':
        const data = financialService.getEventFinancialData(eventId);
        return NextResponse.json({ success: true, data });

      case 'generateSummary':
        const summary = financialService.generateFinancialSummary(eventId);
        return NextResponse.json({ success: true, data: summary });

      default:
        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Financial API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}
