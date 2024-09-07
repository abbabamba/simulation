import mqtt from 'mqtt';

export const publishData = async (simulationData: any) => {
  const client = mqtt.connect('ws://localhost:9001');

  client.on('connect', () => {
    console.log('Connecté au broker MQTT pour publier les données de simulation');

    // Publier les données sur un topic MQTT, par exemple "patient/{patientId}/data"
    const topic = `patient/${simulationData.patientId}/data`;
    client.publish(topic, JSON.stringify(simulationData), (err) => {
      if (err) {
        console.error('Erreur lors de la publication des données MQTT:', err);
      } else {
        console.log(`Données publiées sur le topic ${topic}:`, simulationData);
      }
    });

    // Fermer la connexion après publication
    client.end();
  });

  client.on('error', (error) => {
    console.error('Erreur MQTT lors de la publication des données:', error);
  });
};
