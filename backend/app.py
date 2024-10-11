from flask import Flask, jsonify, request, send_file
from flask_mail import Mail, Message
from flask_cors import CORS
from models import db, Patient, Report
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib import styles
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
import os
import io
from flask_mailman import Mail, EmailMessage

mail = Mail()


app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.fastmail.com'
app.config['MAIL_PORT'] = 485
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL')
app.config['MAIL_PASSWORD'] = os.environ.get('PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True


mail.init_app(app)


#Enable CORS, so that the frontend can make API calls
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:5432/aidar_health'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route("/get-patients", methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    patients_info = [
        {
            'patient_id': patient.patient_id,
            'first_name': patient.first_name,
            'last_name': patient.last_name,
            'email': patient.email,
            'dob': patient.dob,
            'gender': patient.gender
        }
        for patient in patients
    ]
    return jsonify({"patients": patients_info})

@app.route("/get-report", methods=['POST'])
def get_report():
    if request.method == 'POST':
        patient_id = request.form.get('patient_id')
        # from_date = request.form.get('from_date')
        # to_date = request.form.get('to_date')
        reports = Report.query.filter_by(patient_id=patient_id).all()
        patients_info = [
            {
                'report_id': report.report_id,
                'patient_id': report.patient_id,
                'heart_rate': report.heart_rate,
                'body_temperature': report.body_temperature,
                'oxygen_saturation': report.oxygen_saturation,
                'systolic_blood_pressure': report.systolic_blood_pressure,
                'diastolic_blood_pressure': report.diastolic_blood_pressure,
                'body_weight': report.body_weight,
                'physician_note': report.physician_note,
                'patient_note' : report.patient_note,
                'timestamp': report.recorded_at
            }
            for report in reports
        ]
        return jsonify({"reports": patients_info})

@app.route("/send-email")
def send_email():
    msg = EmailMessage(
        "THis is the subject",
        "Body of email",
        "bivek@fastmail.com",
        ["bivek@fastmail.com"]
    )
    msg.send()
    return "sent email..."

@app.route("/generate-pdf", methods=['POST'])
def download_pdf():
    if request.method == 'POST':
        patient_id = request.form.get('patient_id')
        # from_date = request.form.get('from_date')
        # to_date = request.form.get('to_date')

        patient = Patient.query.filter_by(patient_id=patient_id).first()
        # print(patients.patient_id)
        patient_name = patient.first_name + " " + patient.last_name
        patient_email = patient.email
        patient_dob = patient.dob
        patient_gender = patient.gender

        reports = Report.query.filter_by(patient_id=patient_id).all()
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

        return send_file(buffer, as_attachment=True, download_name="document.pdf", mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)