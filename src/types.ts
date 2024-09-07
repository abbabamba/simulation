export interface PatientData {
    patientId: string;
    timestamp: string;
    heartRate: number;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    temperature: number;
    oxygenSaturation: number;
    respiratoryRate: number;
    glucoseLevel: number;
  }