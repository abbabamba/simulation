declare class MQTTHandler {
  client: any;
  constructor();
  handleMessage(topic: string, message: Buffer): void;
}

const mqttHandlerInstance: MQTTHandler;
export default mqttHandlerInstance;
