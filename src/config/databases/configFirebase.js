import admin from 'firebase-admin';
import { FIREBASE_CONNECTION } from '../index.js';
import { LoggerInfo } from '../log4.js';

let instanceFirebase = null;

class FirebaseConnection {
  constructor() {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert(FIREBASE_CONNECTION),
    });
    this.#msgConnect();
  }

  connectDB = () => {
    const db = this.admin.firestore();
    return db;
  };

  #msgConnect = () => {
    LoggerInfo.info(`[Firebase(Firestore)] - Conectada`);
    return false;
  };

  static getFirebaseConnectionInstance = () => {
    if (!instanceFirebase) {
      instanceFirebase = new FirebaseConnection();
    }
    return instanceFirebase;
  };
}

export default FirebaseConnection;
