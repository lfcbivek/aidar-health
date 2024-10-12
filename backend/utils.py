from models import Patient, Report
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors, styles
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
import io

def generate_patient_pdf_report(patient_id, from_date, to_date):
    patient = Patient.query.filter_by(patient_id=patient_id).first()
    # print(patients.patient_id)
    patient_name = patient.first_name + " " + patient.last_name
    patient_email = patient.email
    patient_dob = patient.dob
    patient_gender = patient.gender

    # reports = Report.query.filter(Report.patient_id==patient_id).all()
    print(patient_id)
    print(from_date)
    print(to_date)
    reports = Report.query.filter(Report.patient_id==patient_id).filter(Report.recorded_at >= from_date).filter(Report.recorded_at <= to_date).all()
    data = [['Report ID', 'Heart Rate', 'Body Temperature', 'Oxygen Saturation', 'Systolic BP', 'Diastolic BP']]  # Header
    for report in reports:
        data.append([report.report_id, report.heart_rate, report.body_temperature, report.oxygen_saturation, report.systolic_blood_pressure, report.diastolic_blood_pressure]) 
    
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)

    elements = []

    elements.append(Paragraph("Patient Report from From Date to To Date", styles.getSampleStyleSheet()['Title']))
    elements.append(Paragraph(f"Patient Name: {patient_name}", styles.getSampleStyleSheet()['BodyText']))
    elements.append(Paragraph(f"Email: {patient_email}", styles.getSampleStyleSheet()['BodyText']))
    elements.append(Paragraph(f"DOB: {patient_dob}", styles.getSampleStyleSheet()['BodyText']))
    elements.append(Paragraph(f"Gender: {patient_gender}", styles.getSampleStyleSheet()['BodyText']))
    elements.append(Paragraph("<br/>", styles.getSampleStyleSheet()['BodyText']))
    elements.append(Paragraph("<br/>", styles.getSampleStyleSheet()['BodyText']))
    elements.append(Paragraph("<br/>", styles.getSampleStyleSheet()['BodyText']))

    table = Table(data)

    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ])
    table.setStyle(style)

    elements.append(table)
    doc.build(elements)
    buffer.seek(0)
    return buffer