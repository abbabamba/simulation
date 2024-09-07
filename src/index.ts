import express from 'express';
import { startSimulation, stopSimulation } from './data-simulator';
import mqttClient from './mqtt-handler';

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/start', (req, res) => {
    const { patientId, doctorId } = req.body;
    if (patientId && doctorId) {
        startSimulation(patientId, doctorId);
        res.status(200).send({ message: 'Simulation started.' });
    } else {
        res.status(400).send({ message: 'Patient ID and Doctor ID are required.' });
    }
});

app.post('/stop', (req, res) => {
    const { patientId } = req.body;
    if (patientId) {
        stopSimulation(patientId);
        res.status(200).send({ message: 'Simulation stopped.' });
    } else {
        res.status(400).send({ message: 'Patient ID is required.' });
    }
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Serveur de simulation démarré sur le port ${PORT}`);
    mqttClient.start(); // Démarrer la connexion MQTT pour publier les données
});