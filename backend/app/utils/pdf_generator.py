import os
import io
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def generate_fee_receipt_pdf(student, fee_record, transaction):
    """
    Generates a professional PDF fee payment receipt for Sri Vidya PU College.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CollegeTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        alignment=1,
        textColor=colors.HexColor('#0a192f')
    )
    
    subtitle_style = ParagraphStyle(
        'CollegeSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        alignment=1,
        textColor=colors.HexColor('#475569')
    )
    
    header_style = ParagraphStyle(
        'ReceiptHeader',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        alignment=1,
        textColor=colors.HexColor('#b45309')
    )
    
    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#0f172a')
    )
    
    body_normal = ParagraphStyle(
        'BodyNormal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155')
    )

    elements = []

    # College Header
    elements.append(Paragraph("SRI VIDYA INTERNATIONAL PRE-UNIVERSITY COLLEGE", title_style))
    elements.append(Paragraph("Recognised by the Government of Karnataka | Affiliated to Karnataka PU Board", subtitle_style))
    elements.append(Paragraph("#42, Vidya Soudha Campus, Outer Ring Road, Marathahalli-Sarjapur Junction, Bengaluru - 560103", subtitle_style))
    elements.append(Paragraph("Email: contact@srividyapuc.edu.in | Phone: +91 80 2845 7890 / 7891", subtitle_style))
    elements.append(Spacer(1, 10))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#0a192f'), spaceBefore=5, spaceAfter=15))
    
    # Receipt Banner
    elements.append(Paragraph("OFFICIAL STUDENT FEE PAYMENT RECEIPT (SAMPLE DEMO)", header_style))
    elements.append(Spacer(1, 15))

    # Meta Info Table
    meta_data = [
        [Paragraph("<b>Receipt No:</b>", body_normal), Paragraph(str(transaction.receipt_no), body_bold),
         Paragraph("<b>Date & Time:</b>", body_normal), Paragraph(str(transaction.payment_date.strftime('%d-%b-%Y %I:%M %p') if transaction.payment_date else 'N/A'), body_normal)],
        [Paragraph("<b>Transaction Ref:</b>", body_normal), Paragraph(str(transaction.transaction_ref), body_bold),
         Paragraph("<b>Payment Mode:</b>", body_normal), Paragraph(str(transaction.payment_mode), body_normal)],
        [Paragraph("<b>Student Name:</b>", body_normal), Paragraph(str(student.full_name), body_bold),
         Paragraph("<b>Admission No:</b>", body_normal), Paragraph(str(student.admission_no), body_bold)],
        [Paragraph("<b>Class & Combination:</b>", body_normal), Paragraph(f"{student.year} - {student.combination_name} (Sec {student.section})", body_normal),
         Paragraph("<b>Academic Year:</b>", body_normal), Paragraph(str(fee_record.academic_year), body_normal)],
    ]
    meta_table = Table(meta_data, colWidths=[110, 150, 110, 150])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 15))

    # Fee Breakdown Table
    fee_data = [
        [Paragraph("<b>Sl. No</b>", body_bold), Paragraph("<b>Particulars / Fee Head</b>", body_bold), Paragraph("<b>Scheduled Amount (INR)</b>", body_bold)],
        ["1.", "Tuition & Academic Training Fee", f"₹ {fee_record.total_fee * 0.65:,.2f}"],
        ["2.", "Laboratory & Modern Equipment Maintenance", f"₹ {fee_record.total_fee * 0.15:,.2f}"],
        ["3.", "Digital Library & Learning Resources", f"₹ {fee_record.total_fee * 0.10:,.2f}"],
        ["4.", "Competitive Coaching (KCET / NEET / JEE Foundation)", f"₹ {fee_record.total_fee * 0.10:,.2f}"],
        ["", "Gross Total Fee", f"₹ {fee_record.total_fee:,.2f}"],
        ["", "Scholarship / Merit Concession Applied", f"- ₹ {fee_record.concession_amount:,.2f}"],
        ["", "Net Payable", f"₹ {fee_record.net_payable:,.2f}"],
        ["", f"Amount Paid (Current Receipt: {transaction.receipt_no})", f"₹ {transaction.amount:,.2f}"],
        ["", "Cumulative Balance Remaining", f"₹ {fee_record.balance_amount:,.2f}"],
    ]
    
    fee_table = Table(fee_data, colWidths=[50, 320, 150])
    fee_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0a192f')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('BACKGROUND', (0,5), (-1,5), colors.HexColor('#f1f5f9')),
        ('BACKGROUND', (0,8), (-1,8), colors.HexColor('#fef3c7')),
        ('FONTNAME', (1,8), (2,8), 'Helvetica-Bold'),
    ]))
    elements.append(fee_table)
    elements.append(Spacer(1, 20))

    # Notes & Authorization
    footer_text = Paragraph(
        "<i>* This is a computer-generated demonstration receipt generated by Sri Vidya PU College Smart Academic Portal. "
        "All records are maintained securely in accordance with institutional guidelines.</i>",
        subtitle_style
    )
    elements.append(footer_text)
    elements.append(Spacer(1, 35))

    # Signatures Table
    sig_data = [
        [Paragraph("<b>Student / Parent Signature</b>", subtitle_style), Paragraph("<b>Accounts Officer</b>", subtitle_style), Paragraph("<b>Principal & Administrative Seal</b>", subtitle_style)],
        ["", "", ""],
        ["________________________", "________________________", "________________________"]
    ]
    sig_table = Table(sig_data, colWidths=[170, 170, 180])
    sig_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('BOTTOMPADDING', (0,1), (-1,1), 25),
    ]))
    elements.append(sig_table)

    doc.build(elements)
    buffer.seek(0)
    return buffer.getvalue()

