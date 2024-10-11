from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Patient(db.Model):
    __tablename__ = 'patients'

    patient_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10))

    # String representation for Patient table
    def __repr__(self):
        return f'<Patient {self.first_name} {self.last_name}>'

class Report(db.Model):
    __tablename__ = 'reports'

    report_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.patient_id'), nullable=False)  # Foreign key to Patient
    heart_rate = db.Column(db.Integer, nullable=False)
    body_temperature = db.Column(db.Float, nullable=False)
    oxygen_saturation = db.Column(db.Float, nullable=False)
    systolic_blood_pressure= db.Column(db.Integer, nullable=False)
    diastolic_blood_pressure= db.Column(db.Integer, nullable=False)
    body_weight = db.Column(db.Float, nullable=False)
    physician_note = db.Column(db.Text)
    patient_note = db.Column(db.Text)
    recorded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Report {self.report_id} for Patient {self.patient_id}>'


