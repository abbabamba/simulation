declare class DataSimulator {
  client: any;
  dataSource: any;
  PATIENT_COUNT: number;
  UPDATE_INTERVAL: number;
  constructor(dataSource: any);
  publishPatientData(): void;
  start(): void;
}

export default DataSimulator;
