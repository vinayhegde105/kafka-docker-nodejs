import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'test'
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

function queueRandomMessage() {
  const company = getRandomAnimal();
  const place = getRandomNoise(company);
  const event = { company, place };
  const success = stream.write(eventType.toBuffer(event));
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}

function getRandomAnimal() {
  const categories = ['TEKSYSTEMS', 'INSIGHT'];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomNoise(animal) {
  if (animal === 'TEKSYSTEMS') {
    const noises = ['BLR', 'HYD'];
    return noises[Math.floor(Math.random() * noises.length)];
  } else if (animal === 'INSIGHT') {
    const noises = ['US', 'UK'];
    return noises[Math.floor(Math.random() * noises.length)];
  } else {
    return 'silence..';
  }
