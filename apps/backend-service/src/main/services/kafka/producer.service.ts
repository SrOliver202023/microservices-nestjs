import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class ProducerService {
  private kafka: Kafka;
  private producer: any;

  constructor () {
    this.kafka = new Kafka({
      clientId: 'backend',
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async sendMessage () {
    await this.producer.connect();
    await this.producer.send({
      topic: 'notification',
      messages: [{ value: `Hello World, ${Date.now()}` }],
    });
    await this.producer.disconnect();
  }
}