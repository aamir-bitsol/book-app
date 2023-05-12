import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class NotificationService {
  private readonly fcm: admin.messaging.Messaging;

  constructor() {
    const serviceAccount: ServiceAccount = JSON.parse(fs.readFileSync('C:/Users/Bitsol/Desktop/book-app/src/notification/firebase-private-key.json', 'utf-8')); // Path to your Firebase service account key JSON file
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    this.fcm = admin.messaging();
  }

  async sendPushNotification(topic: string, title: string, body: string): Promise<void> {
    const message: admin.messaging.Message = {
      topic,
      notification: {
        title,
        body,
      },
    };
    await this.fcm.send(message);
  }
}
