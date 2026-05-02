import jsPDF from 'jspdf';

export function generateCertificatePDF(
  userName: string,
  moduleName: string,
  certId: string,
  score: number,
  dateStr: string,
  expiryDateStr: string
) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, width, height, 'F');

  // Border
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(10);
  doc.rect(20, 20, width - 40, height - 40);

  // Inner border
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(2);
  doc.rect(30, 30, width - 60, height - 60);

  // Header
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(48);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATE', width / 2, 120, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('OF COMPLETION', width / 2, 145, { align: 'center' });

  // Body
  doc.setFontSize(14);
  doc.text('This is to certify that', width / 2, 220, { align: 'center' });

  doc.setFontSize(36);
  doc.setTextColor(37, 99, 235);
  doc.setFont('helvetica', 'bold');
  doc.text(userName, width / 2, 270, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text('has successfully completed the cybersecurity training module:', width / 2, 310, { align: 'center' });

  doc.setFontSize(24);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text(moduleName.toUpperCase(), width / 2, 350, { align: 'center' });

  // Score
  doc.setFontSize(16);
  doc.setTextColor(5, 150, 105);
  doc.text(`Passed with a score of ${score}%`, width / 2, 390, { align: 'center' });

  // Footer / Details
  doc.setFontSize(12);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');

  // Left - Dates
  doc.text(`Issue Date: ${dateStr}`, 80, 480);
  doc.text(`Valid Until: ${expiryDateStr}`, 80, 500);

  // Center - Signature
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(1);
  doc.line(width / 2 - 100, 470, width / 2 + 100, 470);
  doc.text('CyberGuard Academy Director', width / 2, 490, { align: 'center' });

  // Right - Cert ID
  doc.text(`Certificate ID: ${certId}`, width - 80, 490, { align: 'right' });

  // Save
  doc.save(`${certId}.pdf`);
}
