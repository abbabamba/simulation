import { DataSource, PatientData } from './interfaces';

class RealDataSource implements DataSource {
  async getData(patientId: number): Promise<PatientData> {
  
    // Ici, nous implémenterions la logique pour se connecter aux vrais capteurs
    // et récupérer les données réelles.
    // Par exemple :
    // return await this.sensorAPI.getLatestData(patientId);
    return {
      id: patientId.toString(),  // Conversion de number en string
      heartRate: 70,
      bloodPressure: {
        systolic: 120,
        diastolic: 80,
      },
      temperature: 37,
      oxygenSaturation: 98,
      timestamp: new Date().toISOString(),
    };
  }
}

export default RealDataSource;
