import { FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

let db: Database;

export const getFirebaseDatabase = (firebaseApp: FirebaseApp | null = null) => {
  if (db) {
    return db
  }
  if (!firebaseApp) {
    throw new Error('Missing database initialization')
  }
  db = getDatabase(firebaseApp)
  return db
}