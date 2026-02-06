import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { email, name, phone, source, score, answers } = data

    // Build email content based on source
    let subject = 'New Website Enquiry'
    let htmlContent = ''

    if (source === 'website-footer-cta') {
      subject = 'New Contact Form Submission'
      htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> Footer CTA</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-GB')}</p>
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
      console.error('BREVO_API_KEY not configured')
      return NextResponse.json({ success: true }) // Still return success to user
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

    if (!response.ok) {
      const error = await response.json()
      console.error('Brevo error:', error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
