import { db } from '@/firebase/config';
import { collectionDate } from '@/helpers/dateHelpers';
import { getTasks } from '@/helpers/taskHelpers';
import { useUser } from '@clerk/nextjs';
import { Button } from '@radix-ui/themes';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react';

export default function PowerListForm({
  tasks,
  setTasks,
}: {
  tasks: any[];
  setTasks: Dispatch<SetStateAction<any[]>>;
}) {
  const { user } = useUser();

  const [task, setTask] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const submitTask = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisableButton(true);

    if (!user) {
      setDisableButton(false);
      return;
    }

    if (!task) {
      alert('Please enter a task.');
      setDisableButton(false);
      return;
    } else if (task.length < 3 || task.length > 100) {
      alert(
        'Please enter a valid string that is at least 3 characters long and no more than 100 characters.'
      );
      setDisableButton(false);
      return;
    } else if (tasks?.length === 5) {
      alert('You have reached the max amount of power list tasks for the day.');
      setDisableButton(false);
      return;
    } else {
      try {
        await addDoc(collection(db, 'tasks', user.id, collectionDate()), {
          userId: user.id,
          name: user.fullName,
          task,
          timestamp: serverTimestamp(),
          isCompleted: false,
        });
        await getTasks(user, setTasks); // updating the new list of tasks
      } catch (error) {
        console.error(error);
        alert('Sorry, there was an issue creating your power list task...');
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
          placeholder="Enter Power List task..."
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
    </>
  );
}
