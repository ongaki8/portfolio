import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Force API-only delivery
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <contact@ongaki.website>',
      to: 'brianongaki@icloud.com',
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Contact Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
      // Critical for deliverability
      headers: {
        'X-Entity-Ref-ID': crypto.randomUUID(),
        'X-Priority': '1'
      }
    });

    if (error) {
      console.error('Resend API error:', error);
      throw new Error('Delivery failed via API');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Full error:', error);
    return NextResponse.json(
      { error: 'Message failed to send. Please try emailing directly.' },
      { status: 500 }
    );
  }
}