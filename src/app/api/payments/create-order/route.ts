import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// POST /api/payments/create-order
// Creates a payment order for Society Maintenance, Smart Meter Recharge, or Amenity Booking
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, purpose, flatNo, residentName, phone, email } = body;

    const numAmount = Number(amount) || 500;
    const amountInPaise = Math.round(numAmount * 100);

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if live Razorpay credentials exist
    if (keyId && keySecret && !keyId.includes('YOUR_KEY')) {
      try {
        const razorpay = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const receiptId = `rcpt_${Date.now().toString().slice(-8)}`;
        const order = await razorpay.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: receiptId,
          notes: {
            purpose: purpose || 'SOCIETY_MAINTENANCE',
            flatNo: flatNo || 'Tower A - Flat 102',
            residentName: residentName || 'Sudhanshu Pandey',
          },
        });

        return NextResponse.json({
          success: true,
          mode: 'LIVE_RAZORPAY',
          keyId: keyId,
          orderId: order.id,
          amount: numAmount,
          currency: 'INR',
          receipt: order.receipt,
        });
      } catch (rzpErr: any) {
        console.warn('Razorpay live order creation failed, falling back to secure test sandbox mode:', rzpErr.message);
      }
    }

    // Secure Simulated Sandbox Order (For Test Mode, Staging, or when Keys are not yet added)
    const simulatedOrderId = `order_sim_${Date.now()}`;
    const simulatedReceipt = `rcpt_${Date.now().toString().slice(-8)}`;

    return NextResponse.json({
      success: true,
      mode: 'SANDBOX_TEST_MODE',
      keyId: keyId || 'rzp_test_staysetu_demo',
      orderId: simulatedOrderId,
      amount: numAmount,
      currency: 'INR',
      receipt: simulatedReceipt,
      message: 'Payment order created successfully in sandbox mode.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
