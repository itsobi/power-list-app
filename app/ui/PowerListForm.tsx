import { db } from '@/firebase/config';
import { collectionDate, dropdownDates } from '@/helpers/dateHelpers';
import { getTasks } from '@/helpers/taskHelpers';
import { useUser } from '@clerk/nextjs';
import {
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from '@radix-ui/themes';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

export default function PowerListForm({
  tasks,
  setTasks,
  taskDate,
  setTaskDate,
}: {
  tasks: any[];
  setTasks: Dispatch<SetStateAction<any[]>>;
  taskDate: string;
  setTaskDate: Dispatch<SetStateAction<string>>;
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
        await getTasks(user, setTasks, taskDate); // updating the new list of tasks
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
    <div className="flex justify-center items-center space-x-2 px-4">
      <form
        onSubmit={submitTask}
        className="flex justify-center items-center space-x-2"
      >
        <input
          type="text"
          className={`border w-[300px] md:w-[500px] lg:w-[600px] p-2 rounded-md focus:outline-none focus:border-blue-600k focus:ring-1 ${
            taskDate !== collectionDate() && 'cursor-not-allowed'
          }`}
          placeholder={
            taskDate !== collectionDate() ? '' : 'Enter Power List task...'
          }
          value={task}
          onChange={(e) => setTask(e.target.value)}
          disabled={taskDate !== collectionDate()}
        />
        <Button
          disabled={disableButton || taskDate !== collectionDate()}
          style={{
            cursor:
              disableButton || taskDate !== collectionDate()
                ? 'not-allowed'
                : 'pointer',
          }}
          color="green"
        >
          Enter
        </Button>
      </form>

      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Button variant="soft" color="gray" style={{ cursor: 'pointer' }}>
            {taskDate}
            <FaCaretDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {dropdownDates().map((date) => {
            return (
              <DropdownMenuItem onClick={() => setTaskDate(date.value)}>
                {date.label === 'Today' ? 'Today' : date.value}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
}
