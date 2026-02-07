import { jsPDF } from 'jspdf'

interface ReportData {
  name: string
  email: string
  score: number
  category: {
    label: string
    color: string
  }
  recommendations: string[]
  answers: Record<number, string>
}

const questions: Record<number, string> = {
  1: 'What sector is your business in?',
  2: 'How many people work in your business?',
  3: 'How do you currently handle incoming phone calls?',
  4: 'How do you manage customer/client information?',
  5: 'How do you handle invoicing and payments?',
  6: 'How many hours per week do you spend on admin tasks?',
  7: 'What is your biggest operational frustration?',
  8: 'Have you tried any automation tools before?',
  9: 'How quickly would you like to see improvements?',
  10: 'What is your monthly budget for business tools and software?',
}

export function generateReport(data: ReportData): void {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let yPos = 20

  // Header
  doc.setFillColor(79, 70, 229) // Indigo
  doc.rect(0, 0, pageWidth, 45, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('AI Readiness Report', 20, 28)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Prepared for ${data.name}`, 20, 38)

  // Reset colors
  doc.setTextColor(0, 0, 0)
  yPos = 60

  // Score Section
  doc.setFillColor(248, 250, 252) // Slate-50
  doc.roundedRect(15, yPos - 5, pageWidth - 30, 50, 3, 3, 'F')

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Your AI Readiness Score', 20, yPos + 8)

  // Score circle
  const centerX = pageWidth / 2
  doc.setFillColor(79, 70, 229)
  doc.circle(centerX, yPos + 28, 18, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(`${data.score}`, centerX, yPos + 33, { align: 'center' })

  doc.setTextColor(100, 116, 139) // Slate-500
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('out of 100', centerX, yPos + 42, { align: 'center' })

  // Category label
  doc.setTextColor(79, 70, 229)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(data.category.label, centerX + 40, yPos + 30, { align: 'left' })

  yPos += 60

  // What this means
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('What This Means', 20, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)

  let interpretation = ''
  if (data.score >= 80) {
    interpretation = 'Your business is well-positioned to benefit significantly from AI automation. You have the foundation in place for rapid implementation and should see quick returns on any automation investment.'
  } else if (data.score >= 60) {
    interpretation = 'Your business shows strong potential for AI automation. A few targeted improvements could unlock significant efficiency gains. You are in an excellent position to start with high-impact automations.'
  } else if (data.score >= 40) {
    interpretation = 'You have a good foundation to build on. Starting with one or two key automations would create immediate value while setting you up for more advanced solutions in the future.'
  } else {
    interpretation = 'You are at the early stages of your automation journey. There is significant opportunity to transform your operations with the right approach. Starting with simple, high-impact automations can deliver quick wins.'
  }

  const interpretLines = doc.splitTextToSize(interpretation, pageWidth - 40)
  doc.text(interpretLines, 20, yPos)
  yPos += interpretLines.length * 5 + 15

  // Recommendations
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Your Personalised Recommendations', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')

  data.recommendations.forEach((rec, index) => {
    doc.setFillColor(238, 242, 255) // Indigo-50
    const recLines = doc.splitTextToSize(rec, pageWidth - 55)
    const boxHeight = recLines.length * 5 + 8

    doc.roundedRect(20, yPos - 4, pageWidth - 40, boxHeight, 2, 2, 'F')

    doc.setTextColor(79, 70, 229)
    doc.text(`${index + 1}.`, 25, yPos + 2)

    doc.setTextColor(51, 65, 85)
    doc.text(recLines, 35, yPos + 2)

    yPos += boxHeight + 5
  })

  yPos += 10

  // Next Steps
  if (yPos > 230) {
    doc.addPage()
    yPos = 20
  }

  doc.setFillColor(79, 70, 229)
  doc.roundedRect(15, yPos, pageWidth - 30, 45, 3, 3, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Ready to Get Started?', 20, yPos + 12)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const ctaText = 'Book a free 15-minute discovery call with our team. We will review your score together and identify the highest-impact automation for your business.'
  const ctaLines = doc.splitTextToSize(ctaText, pageWidth - 45)
  doc.text(ctaLines, 20, yPos + 22)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('vividflow.co.uk', 20, yPos + 38)

  // Footer
  doc.setTextColor(148, 163, 184)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(
    `Report generated on ${new Date().toLocaleDateString('en-GB')} | Vivid Flow - AI Automation for UK Businesses`,
    pageWidth / 2,
    285,
    { align: 'center' }
  )

  // Save
  doc.save(`AI-Readiness-Report-${data.name.replace(/\s+/g, '-')}.pdf`)
}
