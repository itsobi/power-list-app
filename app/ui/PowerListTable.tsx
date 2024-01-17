import styles from '../syles/table.module.css';
import { collectionDate } from '@/helpers/dateHelpers';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Button } from '@radix-ui/themes';
import Container from './Container';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/firebase/config';
import { getTasks } from '@/helpers/taskHelpers';

export default function PowerListTable({
  tasks,
  setTasks,
}: {
  tasks: any[];
  setTasks: Dispatch<SetStateAction<any[]>>;
}) {
  const { user } = useUser();

  const handleDelete = async (taskId: any) => {
    if (!user) {
      alert('unable to delete task.');
      return;
    }
    await deleteDoc(doc(db, 'tasks', user.id, collectionDate(), taskId));
    alert('Task was successfully deleted.');

    const tasksCopy = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksCopy);
  };

  // TODO: handle spamming checkbox when function is running.
  const handleCheckbox = async (task: any, taskId: any, value: boolean) => {
    if (!user) {
      alert('unable to update this task.');
      return;
    }
    try {
      await updateDoc(doc(db, 'tasks', user.id, collectionDate(), taskId), {
        isCompleted: value,
      });

      getTasks(user, setTasks);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  if (tasks.length) {
    return (
      <table className="w-full border-collapse">
        <thead className="p-2 text-left">
          <tr>
            <th></th>
            <th className={styles.td}>Task</th>
            <th className={styles.td}>Completed</th>
            <th colSpan={2} className={styles.td}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr
                key={task.id}
                className={
                  index % 2 === 0 ? `${styles.evenRow}` : `${styles.row}`
                }
              >
                <td className={styles.td}>{index + 1}</td>
                <td className={`${styles.td} ${styles.maxWidthCell}`}>
                  {task.task}
                </td>
                <td className={styles.td}>
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) =>
                      handleCheckbox(task, task.id, e.target.checked)
                    }
                  />
                </td>
                <td className={styles.td}>
                  <Button color="red" onClick={() => handleDelete(task.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <Container>
      <div className="text-center">
        <p>No power list tasks...</p>
      </div>
    </Container>
  );
}
