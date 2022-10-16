import { initializeApp } from 'firebase/app';
import { getFirestore, collection, CollectionReference, type DocumentData, doc, updateDoc, addDoc, deleteDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import type { WhereFilterOp } from 'firebase/firestore';
import type { PersistenceAccess, WhereClause } from '../../PersistenceAccess';
import firebaseConfig from './config.json'


export class FirebaseAccess implements PersistenceAccess {
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
    select(callback: (data: object[]) => void, clauses: WhereClause[], order?: string): void {
        let whereClauses = [];
        clauses.forEach(clause => {
            whereClauses.push(where(clause.field, (clause.op as WhereFilterOp), clause.value));
        })
        let queryFn = order ? 
            query(this.dbRef, ...whereClauses, orderBy(order)) : 
            query(this.dbRef, ...whereClauses);
        onSnapshot(queryFn, (querySnapshot) => {
				let objects = [];
				querySnapshot.forEach((doc) => {
					objects.push({ ...doc.data(), id: doc.id });
				});
				callback(objects);
			}
		);
    }
}