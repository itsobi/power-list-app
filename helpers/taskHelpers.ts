import { db } from '@/firebase/config';
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import { SetStateAction } from 'react';
import { collectionDate } from './dateHelpers';

export const getTasks = async (
  user: any,
  setTasks: (value: SetStateAction<DocumentData[]>) => void
) => {
  if (!user) return;
  try {
    const querySnapshot = await getDocs(
      collection(db, 'tasks', user.id, collectionDate())
    );
    const userTasks = querySnapshot.docs.map((doc) => doc.data());

    setTasks(userTasks);
  } catch (error) {
    console.error(error);
  }
};
