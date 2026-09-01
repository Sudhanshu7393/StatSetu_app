import { NextResponse } from 'next/server';

// In-memory active tickets store for API
const TICKETS_DB: any[] = [];

// GET /api/helpdesk/tickets - List all tickets
export async function GET() {
  return NextResponse.json({
    success: true,
    tickets: TICKETS_DB,
  });
}

// POST /api/helpdesk/tickets - Create or Verify Ticket
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, category, description, raisedByFlat, ticketId, enteredOtp } = body;

    // Action 1: CREATE TICKET
    if (action === 'CREATE' || !action) {
      const id = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
      const residentOtp = Math.floor(1000 + Math.random() * 9000).toString();

      let assignedTech = 'Rakesh Sharma (Society Plumber)';
      let phone = '+91 98711 22334';
      if ((category || '').toLowerCase().includes('electric')) {
        assignedTech = 'Vikas Verma (Society Electrician)';
        phone = '+91 98711 22335';
      } else if ((category || '').toLowerCase().includes('lift')) {
        assignedTech = 'Otis Elevator Response Team';
        phone = '+91 98711 22336';
      }

      const newTicket = {
        id,
        category: category || 'Plumbing & Water Seepage',
        description: description || 'Standard Helpdesk Request',
        raisedByFlat: raisedByFlat || 'Tower A - Flat 102',
        assignedTechnician: assignedTech,
        technicianPhone: phone,
        slaMinutes: 120,
        residentOtpToClose: residentOtp,
        status: 'ASSIGNED',
        createdAt: new Date().toISOString(),
      };

      TICKETS_DB.unshift(newTicket);

      return NextResponse.json({
        success: true,
        ticket: newTicket,
        message: `Ticket #${id} created with 2-Hour SLA guarantee`,
      });
    }

    // Action 2: VERIFY RESIDENT OTP & CLOSE TICKET
    if (action === 'VERIFY_CLOSE') {
      const ticket = TICKETS_DB.find(t => t.id === ticketId);
      if (!ticket) {
        return NextResponse.json(
          { success: false, error: 'Ticket not found' },
          { status: 404 }
        );
      }

      if (ticket.residentOtpToClose === (enteredOtp || '').toString().trim()) {
        ticket.status = 'RESOLVED';
        ticket.resolvedAt = new Date().toISOString();
        return NextResponse.json({
          success: true,
          message: `Ticket #${ticketId} verified and marked as RESOLVED`,
          ticket,
        });
      }

      return NextResponse.json(
        { success: false, error: 'Invalid 4-digit Resident OTP' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported action' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
