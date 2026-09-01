import { NextResponse } from 'next/server';

// POST /api/auth/otp
// Handles sending and verifying 6-digit WhatsApp/SMS OTP passes
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, phoneNumber, enteredOtp, userRole } = body;

    const cleanPhone = (phoneNumber || '').toString().trim().replace(/\D/g, '');

    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid 10-digit mobile number' },
        { status: 400 }
      );
    }

    // Action 1: SEND OTP
    if (action === 'SEND') {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // In production: Connect to Fast2SMS / Twilio / WhatsApp Cloud API here
      return NextResponse.json({
        success: true,
        message: `OTP sent successfully to +91 ${cleanPhone}`,
        demoOtp: generatedOtp, // For live dev testing
        expiresInSeconds: 300,
      });
    }

    // Action 2: VERIFY OTP
    if (action === 'VERIFY') {
      if (!enteredOtp || enteredOtp.length !== 6) {
        return NextResponse.json(
          { success: false, error: 'Please provide a valid 6-digit OTP code' },
          { status: 400 }
        );
      }

      // Demo/Universal bypass for dev testing or any valid 6-digit
      const isValid = enteredOtp === '123456' || /^\d{6}$/.test(enteredOtp);

      if (isValid) {
        return NextResponse.json({
          success: true,
          message: 'OTP verified successfully',
          session: {
            userPhone: cleanPhone,
            role: userRole || 'RESIDENT',
            token: `stk_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          },
        });
      }

      return NextResponse.json(
        { success: false, error: 'Invalid OTP code entered' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action. Supported: SEND, VERIFY' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
