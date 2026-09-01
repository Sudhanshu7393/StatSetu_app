import { NextResponse } from 'next/server';

// POST /api/parking/alert
// Handles unauthorized vehicle reports, flat owner resolution, and WhatsApp alert trigger
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { carPlate, blockedSlot, reporterFlat } = body;

    const cleanPlate = (carPlate || '').toString().trim().toUpperCase();

    if (!cleanPlate) {
      return NextResponse.json(
        { success: false, error: 'Vehicle license plate number is required' },
        { status: 400 }
      );
    }

    // Mock society vehicle database lookup
    const VEHICLE_REGISTRY: Record<string, { flat: string; owner: string; phone: string }> = {
      'UP14 EX 9988': { flat: 'Tower C - Flat 402', owner: 'Ankit Sharma', phone: '+91 98711 00222' },
      'DL8C AB 1234': { flat: 'Tower A - Flat 102', owner: 'Sudhanshu Pandey', phone: '+91 98711 00111' },
      'HR26 DK 5544': { flat: 'Tower B - Flat 204', owner: 'Neha Kapoor', phone: '+91 98711 00333' },
      'UP16 ZQ 7700': { flat: 'Tower D - Flat 801', owner: 'Rajesh Verma', phone: '+91 98711 00444' },
    };

    const matchedVehicle = VEHICLE_REGISTRY[cleanPlate] || {
      flat: 'Visitor / Unregistered Vehicle',
      owner: 'Guest Driver',
      phone: '+91 98711 00000',
    };

    const alertId = `PRK-${Date.now()}`;
    const countdownMinutes = 10;

    // In production: Trigger WhatsApp API notification to matchedVehicle.phone
    return NextResponse.json({
      success: true,
      alertId,
      carPlate: cleanPlate,
      blockedSlot: blockedSlot || 'Basement Reserved Slot',
      ownerDetails: {
        flat: matchedVehicle.flat,
        ownerName: matchedVehicle.owner,
        phoneMasked: `${matchedVehicle.phone.slice(0, 7)}****`,
      },
      countdownMinutes,
      fineIfExpired: 500,
      timestamp: new Date().toISOString(),
      whatsappStatus: 'DELIVERED_TO_CAR_OWNER',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
