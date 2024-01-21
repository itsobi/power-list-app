import { db } from '@/firebase/config';
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { collectionDate } from './dateHelpers';

export const getTasks = async (
  user: any,
  setTasks: (value: SetStateAction<DocumentData[]>) => void
) => {
  if (!user) return;
  const collectionRef = collection(db, 'tasks', user.id, collectionDate());
  const q = query(collectionRef, orderBy('timestamp'));

  try {
    const querySnapshot = await getDocs(q);
    // const querySnapshot = await getDocs(
    //   collection(db, 'tasks', user.id, collectionDate())
    // );

    const userTasks = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setTasks(userTasks);
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (user: any, id: string, update: any) => {
  if (!user) return;

  const taskRef = doc(db, 'tasks', user.id, collectionDate(), id);
  try {
    await updateDoc(taskRef, {
      isCompleted: update,
    });
  } catch (error) {
    console.error(error);
  }
};
