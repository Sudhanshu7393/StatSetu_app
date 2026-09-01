import { NextResponse } from 'next/server';

// In-memory bookings store
const AMENITY_BOOKINGS_DB: any[] = [];

// GET /api/amenities/book - Get all bookings
export async function GET() {
  return NextResponse.json({
    success: true,
    bookings: AMENITY_BOOKINGS_DB,
  });
}

// POST /api/amenities/book - Reserve slot
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amenityName, slot, bookedByFlat, date } = body;

    if (!amenityName || !slot) {
      return NextResponse.json(
        { success: false, error: 'Amenity name and slot time are required' },
        { status: 400 }
      );
    }

    // Check for double booking collision
    const isConflict = AMENITY_BOOKINGS_DB.some(
      b => b.amenityName === amenityName && b.slot === slot && b.date === (date || 'TODAY')
    );

    if (isConflict) {
      return NextResponse.json(
        { success: false, error: `Slot ${slot} for ${amenityName} is already reserved by another resident.` },
        { status: 409 }
      );
    }

    const qrPassCode = `QR-SS-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;

    const newBooking = {
      bookingId: `AMN-${Date.now()}`,
      amenityName,
      slot,
      date: date || 'TODAY',
      bookedByFlat: bookedByFlat || 'Tower A - Flat 102',
      qrPassCode,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    AMENITY_BOOKINGS_DB.unshift(newBooking);

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: `${amenityName} successfully reserved for ${slot}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
