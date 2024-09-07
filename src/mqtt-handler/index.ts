import mqtt from 'mqtt';

class MQTTClient {
    private client: mqtt.MqttClient | null = null;

    start() {
        this.client = mqtt.connect('ws://localhost:9001');
        this.client.on('connect', () => {
            console.log('Connecté au broker MQTT pour publier les données de simulation');
        });

        this.client.on('error', (error) => {
            console.error('Erreur de connexion au broker MQTT:', error);
        });
    }

    publish(topic: string, message: any) {
        if (!this.client) {
            console.error('Le client MQTT n\'est pas connecté.');
            return;
        }

        this.client.publish(topic, JSON.stringify(message), (err) => {
            if (err) {
                console.error(`Erreur lors de la publication sur ${topic}:`, err);
            } else {
                console.log(`Message publié sur ${topic}`);
            }
        });
    }
}

const mqttClient = new MQTTClient();
export default mqttClient;
