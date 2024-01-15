import styles from '../syles/table.module.css';
import { collectionDate } from '@/helpers/dateHelpers';
import { deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@radix-ui/themes';
import Container from './Container';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/firebase/config';

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
          {tasks.map((task, index) => (
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
                <input type="checkbox" value={task.isCompleted} />
              </td>
              <td className={styles.td}>
                <Button color="red" onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
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
