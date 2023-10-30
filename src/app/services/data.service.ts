import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collectionData,
  doc,
  docData,
  collection,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

export interface Clases {
  id?: string;
  nombreClase: string;
  profesor: string;
  horario: string;
  estudiantes: [];
  sigla: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getClases() {
    try {
      const ClasesRef = collection(this.firestore, 'Clases');
      return collectionData(ClasesRef, { idField: 'id' });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getNotes() {
    try {
      const notesRef = collection(this.firestore, 'notes');
      return collectionData(notesRef, { idField: 'id' });
    } catch (e) {
      return null;
      console.log(e);
    }
  }

  getNoteById(id: string): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }

  getClasebyId(id: string): Observable<Clases> {
    const claseDocRef = doc(this.firestore, `Clases/${id}`);
    return docData(claseDocRef, { idField: 'id' }) as Observable<Clases>;
  }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  addClase(clase: Clases) {
    const ClasesRef = collection(this.firestore, 'Clases');
    return addDoc(ClasesRef, clase);
  }

  deleteNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  deleteClase(clase: Clases) {
    const claseDocRef = doc(this.firestore, `Clases/${clase.id}`);
    return deleteDoc(claseDocRef);
  }

  updateClase(clase: Clases) {
    const claseDocRef = doc(this.firestore, `Clases/${clase.id}`);
    return updateDoc(claseDocRef, {
      nombreClase: clase.nombreClase,
      profesor: clase.profesor,
      horario: clase.horario,
      sigla: clase.sigla,
      estudiantes: clase.estudiantes,
    });
  }
  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, { title: note.title, text: note.text });
  }
}
