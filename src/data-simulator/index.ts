import mqttClient from '../mqtt-handler';
import axios from 'axios';

const simulations = new Map<string, NodeJS.Timeout>();
const MAIN_SERVER_URL = 'http://localhost:5000'; // Assurez-vous que c'est la bonne URL

export const startSimulation = (patientId: string, doctorId: string) => {
    if (simulations.has(patientId)) {
        console.log(`Simulation déjà en cours pour le patient ${patientId}`);
        return;
    }

    const intervalId = setInterval(async () => {
        const data = generateRandomData(patientId);
        mqttClient.publish(`patient/${patientId}/data`, JSON.stringify(data));
        console.log(`Données publiées sur le topic patient/${patientId}/data:`, data);

        // Envoyer les données au serveur principal
        try {
            await axios.post(`${MAIN_SERVER_URL}/receive-simulation-data`, { doctorId, data });
            console.log(`Données envoyées au serveur principal pour le docteur ${doctorId}`);
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données au serveur principal:', error);
        }
    }, 1000); // Envoie de nouvelles données toutes les secondes

    simulations.set(patientId, intervalId);
};

export const stopSimulation = (patientId: string) => {
    const intervalId = simulations.get(patientId);
    if (intervalId) {
        clearInterval(intervalId);
        simulations.delete(patientId);
        console.log(`Simulation arrêtée pour le patient ${patientId}`);
    }
};

const generateRandomData = (patientId: string) => {
    const randomPercentage = Math.random();
  
    // Fonction pour introduire des anomalies modérées
    const introduceAnomaly = (value: number, min: number, max: number, range: number) => {
      // Si la probabilité d'anomalie est inférieure à 10%, introduire une anomalie
      if (randomPercentage < 0.1) {
        const anomalyFactor = (Math.random() * range - range / 2); // Anomalie modérée
        return Math.max(min, Math.min(max, value + anomalyFactor));
      }
      return value; // Sinon, retourne la valeur normale
    };
  
    const heartRate = introduceAnomaly(
      Math.floor(Math.random() * (85 - 70 + 1)) + 70, 
      60, 100, 20
    );
  
    const systolic = introduceAnomaly(
      Math.floor(Math.random() * (120 - 100 + 1)) + 100,
      90, 140, 25
    );
  
    const diastolic = introduceAnomaly(
      Math.floor(Math.random() * (80 - 70 + 1)) + 70,
      60, 100, 15
    );
  
    const bloodPressure = `${systolic}/${diastolic}`;
  
    const oxygenSaturation = introduceAnomaly(
      Math.floor(Math.random() * (98 - 95 + 1)) + 95,
      90, 100, 5
    );
  
    return {
      patientId,
      heartRate,
      bloodPressure,
      oxygenSaturation,
      timestamp: new Date().toISOString(),
    };
  };
  
  
  