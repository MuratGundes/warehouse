import { RmqOptions, Transport } from "@nestjs/microservices";

export const getRabbitmqConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://rabbitmq:5672`],
    queue: "warehouse_queue",
    queueOptions: {
      durable: true
    },
    socketOptions: {
      heartbeatIntervalInSeconds: 60,
      reconnectTimeInSeconds: 5
    }
  }
});
