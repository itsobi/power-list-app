'use client';

import { getDate } from '@/helpers/dateHelpers';
import Task from './Task';
import { useUser } from '@clerk/nextjs';
import { DocumentData } from 'firebase/firestore';
import { useTasksContext } from '../Context/store';

export default function TaskList() {
  const { tasks } = useTasksContext();

  return (
    <div className="border border-blue-600 rounded p-4 flex-col w-full">
      <div className="border-b border-b-blue-600 py-4">
        <p className="font-bold">{getDate()}</p>
      </div>
      {tasks.map((task: DocumentData, index: number) => (
        <Task task={task} bottomBorder={index !== tasks.length - 1} />
      ))}
    </div>
  );
}
