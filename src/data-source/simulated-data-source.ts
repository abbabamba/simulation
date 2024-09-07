import { DataSource, PatientData } from './interfaces';

class SimulatedDataSource implements DataSource {
  private normalRanges = {
    heartRate: { min: 60, max: 100, unit: 'bpm' },
    bloodPressure: {
      systolic: { min: 110, max: 130, unit: 'mmHg' },
      diastolic: { min: 70, max: 90, unit: 'mmHg' }
    },
    temperature: { min: 36, max: 39, unit: '°C' },
    oxygenSaturation: { min: 95, max: 100, unit: '%' }
  };

  private generateRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateAnomaly(normalValue: number, range: { min: number; max: number }, anomalyChance: number = 0.1): number {
    if (Math.random() < anomalyChance) {
      // Générer une valeur en dehors de la plage normale
      if (Math.random() < 0.5) {
        return Math.floor(range.min * 0.9); // 10% en dessous du minimum
      } else {
        return Math.floor(range.max * 1.1); // 10% au-dessus du maximum
      }
    }
    return normalValue;
  }

  async getData(patientId: number): Promise<PatientData> {
    const heartRate = this.generateAnomaly(
      this.generateRandomValue(this.normalRanges.heartRate.min, this.normalRanges.heartRate.max),
      this.normalRanges.heartRate
    );
    const systolic = this.generateAnomaly(
      this.generateRandomValue(this.normalRanges.bloodPressure.systolic.min, this.normalRanges.bloodPressure.systolic.max),
      this.normalRanges.bloodPressure.systolic
    );
    const diastolic = this.generateAnomaly(
      this.generateRandomValue(this.normalRanges.bloodPressure.diastolic.min, this.normalRanges.bloodPressure.diastolic.max),
      this.normalRanges.bloodPressure.diastolic
    );
    const temperature = this.generateAnomaly(
      this.generateRandomValue(this.normalRanges.temperature.min, this.normalRanges.temperature.max),
      this.normalRanges.temperature
    );
    const oxygenSaturation = this.generateAnomaly(
      this.generateRandomValue(this.normalRanges.oxygenSaturation.min, this.normalRanges.oxygenSaturation.max),
      this.normalRanges.oxygenSaturation
    );

    return {
      id: patientId.toString(),
      heartRate,
      bloodPressure: {
        systolic,
        diastolic,
      },
      temperature,
      oxygenSaturation,
      timestamp: new Date().toISOString(),
    };
  }
}

export default SimulatedDataSource;