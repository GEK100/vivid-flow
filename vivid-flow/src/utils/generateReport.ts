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
  answers: Record<string, string>
  savings?: {
    adminHoursSaved: number
    annualRevenuePotential: number
    adminReductionPercent: number
  }
}

function getScoreMessage(score: number): string {
  if (score >= 75) return 'Your current processes have substantial room for improvement. AI automation could transform how you work, recover lost revenue, and give you back hours every week.'
  if (score >= 50) return 'You have solid foundations but there are specific areas where automation could save you significant time and help capture more business.'
  if (score >= 25) return 'You\'re already fairly well organised, but there are still areas where AI could enhance your efficiency and client experience.'
  return 'Your business is already well-systematised. There may still be advanced AI capabilities that could give you a competitive edge.'
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
  doc.text('AI Opportunity Report', 20, 28)

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
  doc.text('Your AI Opportunity Score', 20, yPos + 8)

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

  const interpretation = getScoreMessage(data.score)
  const interpretLines = doc.splitTextToSize(interpretation, pageWidth - 40)
  doc.text(interpretLines, 20, yPos)
  yPos += interpretLines.length * 5 + 15

  // Savings Section (if available)
  if (data.savings && (data.savings.adminHoursSaved > 0 || data.savings.annualRevenuePotential > 0)) {
    doc.setFillColor(236, 253, 245) // Emerald-50
    doc.roundedRect(15, yPos - 5, pageWidth - 30, 45, 3, 3, 'F')

    doc.setTextColor(6, 95, 70) // Emerald-800
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Your Potential Savings', 20, yPos + 8)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')

    // Admin hours saved
    doc.setFont('helvetica', 'bold')
    doc.text(`${data.savings.adminHoursSaved} hours/week`, 25, yPos + 22)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(`(~${Math.round(data.savings.adminHoursSaved * 52)} hours per year)`, 25, yPos + 30)

    // Revenue potential
    if (data.savings.annualRevenuePotential > 0) {
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`£${data.savings.annualRevenuePotential.toLocaleString()}/year`, 100, yPos + 22)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text('potential revenue recovery', 100, yPos + 30)
    }

    yPos += 55
  }

  // Recommendations
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Your Personalised Recommendations', 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')

  data.recommendations.forEach((rec, index) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }

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
  if (yPos > 220) {
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
  const ctaText = 'Book a free 15-minute discovery call with our team. We\'ll review your score together and identify the highest-impact automation for your business.'
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
  doc.save(`AI-Opportunity-Report-${data.name.replace(/\s+/g, '-')}.pdf`)
}
