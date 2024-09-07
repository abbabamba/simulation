export interface BloodPressure {
  systolic: number;
  diastolic: number;
}

export interface PatientData {
  id: string;  // Modification de number à string pour plus de flexibilité
  heartRate: number;
  bloodPressure: BloodPressure;
  temperature: number;
  oxygenSaturation: number;
  timestamp: string;
}

export interface DataSource {
  /**
   * Retourne les données patient pour un patient spécifique
   * @param patientId - L'ID du patient pour lequel les données doivent être récupérées
   * @returns Une promesse contenant les données du patient
   */
  getData(patientId: number): Promise<PatientData>;
}


