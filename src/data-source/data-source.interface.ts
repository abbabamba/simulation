import { DataSource, PatientData } from './interfaces';
import RealDataSource from './real-data-source';
import SimulatedDataSource from './simulated-data-source';

// Function to create data source
export function createDataSource(): DataSource {
  if (process.env.USE_REAL_DATA === 'true') {
    return new RealDataSource();
  } else {
    return new SimulatedDataSource();
  }
}
