import { db } from '@/firebase/config';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { SetStateAction } from 'react';
import { collectionDate } from './dateHelpers';
import { Task } from '@/typings';

export const getTasks = async (
  user: any,
  setTasks: (value: SetStateAction<Task[]>) => void,
  taskDate: string
) => {
  if (!user) return;
  const collectionRef = collection(db, 'tasks', user.id, taskDate);
  const q = query(collectionRef, orderBy('timestamp'));

  try {
    const querySnapshot = await getDocs(q);

    const userTasks: Task[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      task: doc.data().task,
      isCompleted: doc.data().isCompleted,
      timestamp: doc.data().timestamp,
      userId: doc.data().userId,
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
