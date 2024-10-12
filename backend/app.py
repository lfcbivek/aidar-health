import os
import io
import smtplib

from flask import Flask, jsonify, request, send_file
from flask_mail import Mail, Message
from flask_cors import CORS
from models import db, Patient, Report

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors, styles
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph

from dotenv import load_dotenv
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

import ssl
from utils import generate_patient_pdf_report

ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)


SMTP_SERVER = os.environ.get('SMTP_SERVER')
SMTP_PORT = os.environ.get('SMTP_PORT')
USERNAME = os.environ.get('EMAIL_USERNAME')
PASSWORD = os.environ.get('EMAIL_PASSWORD')

#Enable CORS, so that the frontend can make API calls
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:5432/aidar_health'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Endpoint to retrieve data of all the pateints for the physician
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

# Endpoint to get report data of the selected patient
@app.route("/get-report", methods=['POST'])
def get_report():
    if request.method == 'POST':
        patient_id = request.form.get('patient_id')
        from_date = request.form.get('from_date')
        to_date = request.form.get('to_date')
        reports = Report.query.filter(Report.patient_id==patient_id).filter(Report.recorded_at >= from_date).filter(Report.recorded_at <= to_date).all()
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

# Endpoint to send report attachment via email
@app.route("/send-email", methods=['POST'])
def send_email():
    
    if request.method == 'POST':
        patient_id = request.form.get('patient_id')
        to_email = request.form.get('to_email')
        from_date = request.form.get("from_date")
        to_date = request.form.get("to_date")

        print(patient_id)
        print(to_email)
        print(from_date)
        print(to_date)

        subject = 'Patient Report'
        body = 'Pateint Report'
        if not to_email or not subject or not body:
            return jsonify({'error': 'Missing required fields'}), 400

        try:
            # Create the email
            msg = MIMEMultipart()
            msg['From'] = 'bivek@fastmail.com'
            msg['To'] = to_email
            msg['Subject'] = subject
            msg.attach(MIMEText(body, 'html'))

            pdf_buffer = generate_patient_pdf_report(patient_id, from_date, to_date)
            # Attach the PDF
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(pdf_buffer.read())
            encoders.encode_base64(part)
            part.add_header(
                'Content-Disposition',
                f'attachment; filename=patient_report.pdf',
            )
            msg.attach(part)

            # Connect to the SMTP server and send the email
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()  # Upgrade the connection to TLS
                server.login(USERNAME, PASSWORD)
                server.sendmail(msg['From'], msg['To'], msg.as_string())


            return jsonify({'message': 'Email sent successfully'}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500

#Endpoint to generate pdf for the physician to download
@app.route("/generate-pdf", methods=['POST'])
def download_pdf():
    if request.method == 'POST':
        patient_id = request.form.get('patient_id')
        from_date = request.form.get('from_date')
        to_date = request.form.get('to_date')

        buffer = generate_patient_pdf_report(patient_id, from_date, to_date)

        return send_file(buffer, as_attachment=True, download_name="document.pdf", mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)