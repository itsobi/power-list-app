'use client';

import { getDate } from '@/helpers/dateHelpers';
import Task from './Task';
import { useUser } from '@clerk/nextjs';
import { DocumentData, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useEffect, useState } from 'react';

// TODO: Real time updates

export default function TaskList() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      if (!user) return;
      try {
        const querySnapshot = await getDocs(
          collection(db, 'users', user.id, 'tasks')
        );
        const userTasks = querySnapshot.docs.map((doc) => doc.data());

        setTasks(userTasks);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="border rounded p-4 flex-col w-full">
      <div className="border-b">
        <p className="font-bold">{getDate()}</p>
      </div>
      {/* <Task tasks={tasks} /> */}
      {tasks.map((task) => (
        <Task task={task} />
      ))}
    </div>
  );
}
