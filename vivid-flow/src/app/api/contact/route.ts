import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'
const NOTIFICATION_EMAIL = 'gareth@ictusflow.com'

function getScoreCategory(score: number) {
  if (score >= 80) return 'Ready to Transform'
  if (score >= 60) return 'Strong Candidate'
  if (score >= 40) return 'Good Foundation'
  return 'Early Stage'
}

function getScoreInterpretation(score: number) {
  if (score >= 80) return 'Your business is well-positioned to benefit significantly from AI automation. You have the foundation in place for rapid implementation and should see quick returns on any automation investment.'
  if (score >= 60) return 'Your business shows strong potential for AI automation. A few targeted improvements could unlock significant efficiency gains.'
  if (score >= 40) return 'You have a good foundation to build on. Starting with one or two key automations would create immediate value.'
  return 'You are at the early stages of your automation journey. There is significant opportunity to transform your operations with the right approach.'
}

async function sendEmail(brevoApiKey: string, to: string, subject: string, htmlContent: string) {
  return fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': brevoApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Vivid Flow', email: 'gareth@vividflow.co.uk' },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { email, name, phone, source, score, answers, interest, message } = data

    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) {
      return NextResponse.json({ success: false, error: 'API key not configured' })
    }

    // Build email content based on source
    let notificationSubject = 'New Website Enquiry'
    let notificationHtml = ''

    if (source === 'website-footer-cta') {
      notificationSubject = `New Contact Form: ${name} - ${interest || 'General Enquiry'}`
      notificationHtml = `
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

      // Send notification only for contact form
      const response = await sendEmail(brevoApiKey, NOTIFICATION_EMAIL, notificationSubject, notificationHtml)
      const responseData = await response.json()

      if (!response.ok) {
        return NextResponse.json({ success: false, error: responseData })
      }

      return NextResponse.json({ success: true, messageId: responseData.messageId })

    } else if (source === 'ai-readiness-assessment') {
      // Send notification to business owner
      notificationSubject = `New Assessment Lead - Score: ${score}/100`
      notificationHtml = `
        <h2>New AI Readiness Assessment Lead</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone || 'Not provided'}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Score:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong style="color: #4f46e5;">${score}/100</strong></td></tr>
          <tr><td style="padding: 8px;"><strong>Category:</strong></td><td style="padding: 8px;">${getScoreCategory(score)}</td></tr>
        </table>
        <p style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
          <strong>Quick actions:</strong><br>
          <a href="mailto:${email}">Reply by email</a> | <a href="tel:${phone}">Call ${phone}</a>
        </p>
        ${answers ? `<details style="margin-top: 15px;"><summary style="cursor: pointer; color: #64748b;">View all answers</summary><pre style="background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 12px; overflow-x: auto;">${JSON.stringify(answers, null, 2)}</pre></details>` : ''}
      `

      // Send report to lead
      const reportSubject = `Your AI Readiness Score: ${score}/100`
      const reportHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">Your AI Readiness Report</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 16px;">Prepared for ${name}</p>
            </div>

            <!-- Score Section -->
            <div style="background: white; padding: 40px 30px; text-align: center; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
              <div style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); line-height: 120px; margin-bottom: 16px;">
                <span style="color: white; font-size: 42px; font-weight: 700;">${score}</span>
              </div>
              <p style="color: #64748b; margin: 0 0 12px 0; font-size: 14px;">out of 100</p>
              <div style="display: inline-block; background: #eef2ff; color: #4f46e5; padding: 8px 20px; border-radius: 20px; font-weight: 600; font-size: 14px;">
                ${getScoreCategory(score)}
              </div>
            </div>

            <!-- Interpretation -->
            <div style="background: #f8fafc; padding: 30px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">What This Means</h2>
              <p style="color: #475569; margin: 0; font-size: 15px; line-height: 1.6;">
                ${getScoreInterpretation(score)}
              </p>
            </div>

            <!-- CTA Section -->
            <div style="background: white; padding: 30px; text-align: center; border: 1px solid #e2e8f0; border-top: none;">
              <h2 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Ready to Take the Next Step?</h2>
              <p style="color: #64748b; margin: 0 0 20px 0; font-size: 14px;">
                Book a free 15-minute discovery call to discuss your results and identify the highest-impact automation for your business.
              </p>
              <a href="https://vividflow.co.uk/#contact" style="display: inline-block; background: #4f46e5; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
                Book a Discovery Call
              </a>
            </div>

            <!-- Footer -->
            <div style="background: #1e293b; border-radius: 0 0 16px 16px; padding: 24px 30px; text-align: center;">
              <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 13px;">
                Vivid Flow - AI Automation for UK Businesses
              </p>
              <a href="https://vividflow.co.uk" style="color: #a5b4fc; text-decoration: none; font-size: 13px;">vividflow.co.uk</a>
            </div>
          </div>
        </body>
        </html>
      `

      // Send both emails
      const [notificationRes, reportRes] = await Promise.all([
        sendEmail(brevoApiKey, NOTIFICATION_EMAIL, notificationSubject, notificationHtml),
        sendEmail(brevoApiKey, email, reportSubject, reportHtml)
      ])

      const notificationData = await notificationRes.json()
      const reportData = await reportRes.json()

      if (!notificationRes.ok || !reportRes.ok) {
        return NextResponse.json({ success: false, error: { notification: notificationData, report: reportData } })
      }

      return NextResponse.json({ success: true, notificationId: notificationData.messageId, reportId: reportData.messageId })

    } else if (source === 'roi-calculator') {
      notificationSubject = 'New ROI Calculator Lead'
      notificationHtml = `
        <h2>New ROI Calculator Lead</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone || 'Not provided'}</a></td></tr>
          <tr><td style="padding: 8px;"><strong>Submitted:</strong></td><td style="padding: 8px;">${new Date().toLocaleString('en-GB')}</td></tr>
        </table>
        <p style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
          <strong>Quick actions:</strong><br>
          <a href="mailto:${email}">Reply by email</a> | <a href="tel:${phone}">Call ${phone}</a>
        </p>
      `
    } else {
      notificationHtml = `
        <h2>New Website Enquiry</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px;"><strong>Source:</strong></td><td style="padding: 8px;">${source || 'Unknown'}</td></tr>
        </table>
      `
    }

    // Send notification for ROI calculator and default cases
    const response = await sendEmail(brevoApiKey, NOTIFICATION_EMAIL, notificationSubject, notificationHtml)
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
