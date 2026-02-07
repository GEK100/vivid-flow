import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'
const NOTIFICATION_EMAIL = 'gareth@ictusflow.com'

function getScoreCategory(score: number) {
  if (score >= 75) return 'High Opportunity'
  if (score >= 50) return 'Good Opportunity'
  if (score >= 25) return 'Some Opportunity'
  return 'Already Optimised'
}

function getScoreMessage(score: number) {
  if (score >= 75) return 'Your current processes have substantial room for improvement. AI automation could transform how you work, recover lost revenue, and give you back hours every week.'
  if (score >= 50) return 'You have solid foundations but there are specific areas where automation could save you significant time and help capture more business.'
  if (score >= 25) return 'You\'re already fairly well organised, but there are still areas where AI could enhance your efficiency and client experience.'
  return 'Your business is already well-systematised. There may still be advanced AI capabilities that could give you a competitive edge.'
}

async function sendEmail(brevoApiKey: string, to: string, subject: string, htmlContent: string) {
  const response = await fetch(BREVO_API_URL, {
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
  return response
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Received data:', JSON.stringify(data, null, 2))

    const { email, name, phone, source, score, savings, sector, recommendations, answers, interest, message } = data

    const brevoApiKey = process.env.BREVO_API_KEY
    if (!brevoApiKey) {
      console.error('BREVO_API_KEY not configured')
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

      const response = await sendEmail(brevoApiKey, NOTIFICATION_EMAIL, notificationSubject, notificationHtml)
      const responseData = await response.json()
      console.log('Contact form email response:', response.status, responseData)

      if (!response.ok) {
        return NextResponse.json({ success: false, error: responseData })
      }

      return NextResponse.json({ success: true, messageId: responseData.messageId })

    } else if (source === 'ai-readiness-assessment') {
      // Extract savings data
      const adminHoursSaved = savings?.adminHoursSaved || 0
      const annualRevenuePotential = savings?.annualRevenuePotential || 0
      const recsArray = recommendations || []

      // Notification to business owner
      notificationSubject = `New Assessment Lead - ${sector} - Score: ${score}/100`
      notificationHtml = `
        <h2>New AI Opportunity Assessment Lead</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name || 'Not provided'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone || 'Not provided'}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Sector:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${sector || 'Not specified'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Score:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong style="color: #4f46e5;">${score}/100 - ${getScoreCategory(score)}</strong></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Est. Time Savings:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${adminHoursSaved} hrs/week</td></tr>
          ${annualRevenuePotential > 0 ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Est. Revenue Potential:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">£${annualRevenuePotential.toLocaleString()}/year</td></tr>` : ''}
        </table>
        <p style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
          <strong>Quick actions:</strong><br>
          <a href="mailto:${email}">Reply by email</a> | <a href="tel:${phone}">Call ${phone}</a>
        </p>
        ${answers ? `<details style="margin-top: 15px;"><summary style="cursor: pointer; color: #64748b;">View all answers</summary><pre style="background: #f8fafc; padding: 12px; border-radius: 8px; font-size: 12px; overflow-x: auto;">${JSON.stringify(answers, null, 2)}</pre></details>` : ''}
      `

      // Report email to lead
      const reportSubject = `Your AI Opportunity Score: ${score}/100`
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
              <h1 style="color: white; margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">Your AI Opportunity Report</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 0; font-size: 16px;">Prepared for ${name}</p>
            </div>

            <!-- Score Section -->
            <div style="background: white; padding: 40px 30px; text-align: center; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
              <div style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); line-height: 120px; margin-bottom: 16px;">
                <span style="color: white; font-size: 42px; font-weight: 700;">${score}</span>
              </div>
              <p style="color: #64748b; margin: 0 0 12px 0; font-size: 14px;">Opportunity Score (out of 100)</p>
              <div style="display: inline-block; background: #eef2ff; color: #4f46e5; padding: 8px 20px; border-radius: 20px; font-weight: 600; font-size: 14px;">
                ${getScoreCategory(score)}
              </div>
            </div>

            <!-- Interpretation -->
            <div style="background: #f8fafc; padding: 30px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">What This Means</h2>
              <p style="color: #475569; margin: 0; font-size: 15px; line-height: 1.6;">
                ${getScoreMessage(score)}
              </p>
            </div>

            <!-- Savings Section -->
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 30px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
              <h2 style="color: #065f46; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Your Potential Savings</h2>
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 15px; background: white; border-radius: 12px; text-align: center; width: 50%;">
                    <p style="color: #065f46; font-size: 32px; font-weight: 700; margin: 0;">${adminHoursSaved}</p>
                    <p style="color: #6b7280; font-size: 13px; margin: 5px 0 0 0;">Hours saved per week</p>
                  </td>
                  ${annualRevenuePotential > 0 ? `
                  <td style="width: 20px;"></td>
                  <td style="padding: 15px; background: white; border-radius: 12px; text-align: center; width: 50%;">
                    <p style="color: #065f46; font-size: 32px; font-weight: 700; margin: 0;">£${annualRevenuePotential.toLocaleString()}</p>
                    <p style="color: #6b7280; font-size: 13px; margin: 5px 0 0 0;">Potential revenue per year</p>
                  </td>
                  ` : ''}
                </tr>
              </table>
              <p style="color: #065f46; font-size: 13px; margin: 15px 0 0 0; text-align: center;">
                That's approximately <strong>${Math.round(adminHoursSaved * 52)} hours per year</strong> you could reclaim for revenue-generating work or family time.
              </p>
            </div>

            <!-- Recommendations -->
            ${recsArray.length > 0 ? `
            <div style="background: white; padding: 30px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Your Personalised Recommendations</h2>
              ${recsArray.map((rec: string, i: number) => `
                <div style="display: flex; gap: 12px; padding: 15px; background: #f8fafc; border-radius: 12px; margin-bottom: 10px; border-left: 4px solid #4f46e5;">
                  <span style="color: #4f46e5; font-weight: 700; font-size: 14px;">${i + 1}.</span>
                  <p style="color: #475569; font-size: 14px; line-height: 1.5; margin: 0;">${rec}</p>
                </div>
              `).join('')}
            </div>
            ` : ''}

            <!-- CTA Section -->
            <div style="background: white; padding: 30px; text-align: center; border: 1px solid #e2e8f0; border-top: none;">
              <h2 style="color: #1e293b; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Ready to Take the Next Step?</h2>
              <p style="color: #64748b; margin: 0 0 20px 0; font-size: 14px;">
                Book a free 15-minute discovery call to discuss your results and identify the highest-impact automation for your ${sector || 'business'}.
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

      console.log('Sending notification to:', NOTIFICATION_EMAIL)
      console.log('Sending report to:', email)

      // Send both emails
      try {
        const [notificationRes, reportRes] = await Promise.all([
          sendEmail(brevoApiKey, NOTIFICATION_EMAIL, notificationSubject, notificationHtml),
          sendEmail(brevoApiKey, email, reportSubject, reportHtml)
        ])

        const notificationData = await notificationRes.json()
        const reportData = await reportRes.json()

        console.log('Notification response:', notificationRes.status, notificationData)
        console.log('Report response:', reportRes.status, reportData)

        if (!notificationRes.ok) {
          console.error('Notification email failed:', notificationData)
        }
        if (!reportRes.ok) {
          console.error('Report email failed:', reportData)
        }

        return NextResponse.json({
          success: true,
          notificationId: notificationData.messageId,
          reportId: reportData.messageId,
          notificationStatus: notificationRes.status,
          reportStatus: reportRes.status
        })
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        return NextResponse.json({ success: false, error: 'Email sending failed', details: String(emailError) })
      }

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
    console.log('Email response:', response.status, responseData)

    if (!response.ok) {
      return NextResponse.json({ success: false, error: responseData })
    }

    return NextResponse.json({ success: true, messageId: responseData.messageId })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ success: false, error: 'Server error', details: String(error) }, { status: 500 })
  }
}
