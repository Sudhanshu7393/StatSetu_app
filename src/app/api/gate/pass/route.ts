import { NextResponse } from 'next/server';

// POST /api/gate/pass
// Handles FastTag ANPR plate scans, delivery OTP verification, visitor passes, and shifting truck bookings
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passType, detail, targetFlat, vehicleNumber } = body;

    const passId = `GP-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    if (passType === 'FASTTAG') {
      return NextResponse.json({
        success: true,
        passId,
        passType: 'FASTTAG_ANPR',
        vehicleNumber: vehicleNumber || 'UP14 EX 9988',
        boomGateAction: 'OPEN_AUTOMATIC_0.4S',
        entryStatus: 'ALLOWED',
        timestamp,
      });
    }

    if (passType === 'DELIVERY') {
      const deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();
      return NextResponse.json({
        success: true,
        passId,
        passType: 'DELIVERY_COURIER',
        deliveryOtp,
        targetFlat: targetFlat || 'Tower A - Flat 102',
        entryStatus: 'PRE_APPROVED',
        timestamp,
      });
    }

    if (passType === 'SHIFTING') {
      const shiftingPassCode = `MV-${Math.floor(1000 + Math.random() * 9000)}`;
      return NextResponse.json({
        success: true,
        passId,
        passType: 'SHIFTING_SERVICE_LIFT',
        shiftingPassCode,
        serviceLiftStatus: 'RESERVED_AND_PADDED',
        allowedDurationHours: 2,
        timestamp,
      });
    }

    return NextResponse.json({
      success: true,
      passId,
      passType: passType || 'GENERAL_VISITOR',
      detail: detail || 'Standard Visitor Pass',
      entryStatus: 'ACTIVE',
      timestamp,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
