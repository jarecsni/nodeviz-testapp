import { initializeApp } from 'firebase/app';
import { getFirestore, collection, CollectionReference, type DocumentData, doc } from "firebase/firestore";
import firebaseConfig from './config.json'


class FirebaseAccess {
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
}