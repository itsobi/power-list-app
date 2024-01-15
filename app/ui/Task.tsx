import { db } from '@/firebase/config';
import { collectionDate } from '@/helpers/dateHelpers';
import { getTasks } from '@/helpers/taskHelpers';
import { useUser } from '@clerk/nextjs';
import { IconButton } from '@radix-ui/themes';
import { DocumentData, doc, setDoc, updateDoc } from 'firebase/firestore';
import { ChangeEvent, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useTasksContext } from '../context/store';

export default function Task({
  task,
  bottomBorder,
}: {
  task: DocumentData;
  bottomBorder: boolean;
}) {
  const { user } = useUser();
  const { setTasks } = useTasksContext();
  const [crossOutText, setCrossOutText] = useState(false);
  const [loading, setLoading] = useState(false);

  // const updateTask = async (
  //   id: string,
  //   event: ChangeEvent<HTMLInputElement>
  // ) => {
  //   setLoading(true);
  //   if (!user) {
  //     setLoading(false);
  //     return;
  //   }

  //   const taskRef = doc(db, 'tasks', user.id, collectionDate(), id);

  //   try {
  //     await setDoc(taskRef, {
  //       ...task,
  //       isCompleted: event.target.checked,
  //     });
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCheckboxChange = async (taskId: any, newValue: boolean) => {
    if (!user) return;

    const taskRef = doc(db, 'tasks', user.id, collectionDate(), taskId);

    await updateDoc(taskRef, {
      isCompleted: newValue,
    });

    getTasks(user, setTasks);
  };

  return (
    <div
      className={`grid grid-cols-3 ${
        bottomBorder ? 'border-b border-b-blue-600' : 'border-none'
      } p-4`}
    >
      <div className="flex justify-center items-center">
        {/* <p
          className={`text-center ${
            task.isCompleted ? 'line-through font-extralight' : 'none'
          }`}
        >
          {task.task}
        </p> */}
        <p>{task.task}</p>
      </div>

      <label className="text-sm flex items-center justify-center">
        <input
          type="checkbox"
          onChange={(event) => handleCheckboxChange(task.id, !task.isCompleted)}
          className="mr-1"
          value={task.isCompleted}
        />
        Completed
      </label>

      <div className="flex items-center justify-center">
        <IconButton color="red">
          <FaTrash />
        </IconButton>
      </div>
    </div>
  );
}
