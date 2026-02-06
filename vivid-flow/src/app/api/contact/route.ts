import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { email, name, phone, source, score, answers, interest, message } = data

    // Build email content based on source
    let subject = 'New Website Enquiry'
    let htmlContent = ''

    if (source === 'website-footer-cta') {
      subject = `New Contact Form: ${name} - ${interest || 'General Enquiry'}`
      htmlContent = `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Interested In:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${interest || 'Not specified'}</td></tr>
          ${message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${message}</td></tr>` : ''}
          <tr><td style="padding: 8px;"><strong>Submitted:</strong></td><td style="padding: 8px;">${new Date().toLocaleString('en-GB')}</td></tr>
        </table>
        <p style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
          <strong>Quick actions:</strong><br>
          <a href="mailto:${email}">Reply by email</a> | <a href="tel:${phone}">Call ${phone}</a>
        </p>
      `
    } else if (source === 'ai-readiness-assessment') {
      subject = `New Assessment Lead - Score: ${score}/100`
      htmlContent = `
        <h2>New AI Readiness Assessment Lead</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Score:</strong> ${score}/100</p>
        <p><strong>Source:</strong> AI Readiness Assessment</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-GB')}</p>
        ${answers ? `<p><strong>Answers:</strong></p><pre>${JSON.stringify(answers, null, 2)}</pre>` : ''}
      `
    } else if (source === 'roi-calculator') {
      subject = 'New ROI Calculator Lead'
      htmlContent = `
        <h2>New ROI Calculator Lead</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Source:</strong> ROI Calculator</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-GB')}</p>
      `
    } else {
      htmlContent = `
        <h2>New Website Enquiry</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Source:</strong> ${source || 'Unknown'}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-GB')}</p>
      `
    }

    // Send via Brevo
    const brevoApiKey = process.env.BREVO_API_KEY

    if (!brevoApiKey) {
      return NextResponse.json({ success: false, error: 'API key not configured' })
    }

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Vivid Flow Website', email: 'gareth@vividflow.co.uk' },
        to: [{ email: 'gareth@vividflow.co.uk' }],
        subject: subject,
        htmlContent: htmlContent,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      return NextResponse.json({ success: false, error: responseData })
    }

    return NextResponse.json({ success: true, messageId: responseData.messageId })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
