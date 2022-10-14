import { initializeApp } from 'firebase/app';
import { getFirestore, collection, CollectionReference, type DocumentData, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import type { PersistenceAccess } from '../../PersistenceAccess';
import firebaseConfig from './config.json'


class FirebaseAccess implements PersistenceAccess {
    static app = initializeApp(firebaseConfig);
    static db = getFirestore(FirebaseAccess.app);
    dbRef:CollectionReference<DocumentData>;
    collectionName: string;
    constructor(collectionName:string) {
        this.collectionName = collectionName;
        this.dbRef = collection(FirebaseAccess.db, collectionName);
    }
    getDocRef(id:string) {
        return doc(FirebaseAccess.db, this.collectionName, id);
    }
    async update(id: string, obj: object): Promise<void> {
        return updateDoc(doc(FirebaseAccess.db, this.collectionName, id), obj);
    }
    insert(obj: object): Promise<unknown> {
        return addDoc(this.dbRef, obj);
    }
    delete(id: string): Promise<void> {
        return deleteDoc(doc(FirebaseAccess.db, this.collectionName, id));
    }
}