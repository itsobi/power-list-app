'use client';

import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import Link from 'next/link';
import { db } from '../../firebase/config';
import { useUser } from '@clerk/nextjs';
import TaskList from './TaskList';
import { Button } from '@radix-ui/themes';
import { useState } from 'react';

export default function PowerList() {
  const { user } = useUser();
  const [task, setTask] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const submitTask = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisableButton(true);

    if (!user) return;

    if (!task) {
      alert('You must enter a task to submit.');
      setDisableButton(false);
      return;
    } else if (task.length < 3) {
      alert('Your task must contain at least 3 characters');
      setDisableButton(false);
      return;
    } else {
      try {
        await addDoc(collection(db, 'users', user.id, 'tasks'), {
          userId: user.id,
          name: user.fullName,
          task,
          timestamp: serverTimestamp(),
          isCompleted: false,
        });
      } catch (error) {
        console.error(error);
        alert('Sorry, there was an issue creating you task...');
      } finally {
        setTask('');
        setDisableButton(false);
      }
    }
  };

  return (
    <>
      <form onSubmit={submitTask} className="flex justify-center items-center">
        <input
          type="text"
          className="border w-[600px] p-2 rounded-md focus:outline-none focus:border-blue-600k focus:ring-1"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          disabled={disableButton}
          style={{ marginLeft: 8, cursor: 'pointer' }}
        >
          Enter task
        </Button>
      </form>

      <br />

      <Link href="/power-list/info" className="flex justify-center">
        <span className="text-center font-thin text-sm hover:underline">
          What is a Power List?
        </span>
      </Link>

      <div className="flex justify-center items-center mt-20 w-full">
        <TaskList />
      </div>
    </>
  );
}
