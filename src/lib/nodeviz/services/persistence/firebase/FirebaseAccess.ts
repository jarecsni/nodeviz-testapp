import { initializeApp } from 'firebase/app';
import { getFirestore, collection, CollectionReference, type DocumentData, doc, updateDoc, addDoc, deleteDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import type { WhereFilterOp } from 'firebase/firestore';
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
    update(id: string, obj: object): Promise<void> {
        return updateDoc(doc(FirebaseAccess.db, this.collectionName, id), obj);
    }
    insert(obj: object): Promise<unknown> {
        return addDoc(this.dbRef, obj);
    }
    delete(id: string): Promise<void> {
        return deleteDoc(doc(FirebaseAccess.db, this.collectionName, id));
    }
    select(callback: (data: object[]) => void, clauses: string[][], order?: string): void {
        let whereClauses = [];
        clauses.forEach(clause => {
            whereClauses.push(where(clause[0], (clause[1] as WhereFilterOp), clause[2]));
        })
        let orderByFn = order && orderBy(order);
        onSnapshot(query(this.dbRef, ...whereClauses, orderByFn), (querySnapshot) => {
				let objects = [];
				querySnapshot.forEach((doc) => {
					objects.push({ ...doc.data(), id: doc.id });
				});
				callback(objects);
			}
		);
    }
}