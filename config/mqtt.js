import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

// Connect to the MQTT broker using credentials from environment variables
const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
});

// Handle MQTT connection
mqttClient.on('connect', () => {
  console.log('✅ Connected to MQTT Broker');
  // Subscribe to IoT device topics
  mqttClient.subscribe('sensor/+/data', (err) => {
    if (err) {
      console.error('❌ Error subscribing to topic:', err);
    } else {
      console.log('✅ Subscribed to sensor/+/data topic');
    }
  });
});

// Handle incoming messages
mqttClient.on('message', async (topic, message) => {
  console.log('🚨 Message received:', topic, message.toString());
  
  // Assuming the message is in JSON format
  const data = JSON.parse(message.toString());
  
  // Example: You can insert this data into PostgreSQL or process it as needed
  // Add your logic to store data or trigger other actions here
});

// Handle errors
mqttClient.on('error', (err) => {
  console.error('❌ MQTT Error:', err);
});

export default mqttClient;