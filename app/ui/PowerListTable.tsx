import { collectionDate } from '@/helpers/dateHelpers';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  Button,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from '@radix-ui/themes';
import Container from './Container';
import { Dispatch, SetStateAction, useState } from 'react';
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
  const [disableCheckbox, setDisableCheckbox] = useState(false);

  console.log({ tasks });

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
  const handleCheckbox = async (taskId: any, value: boolean) => {
    if (!user) {
      alert('unable to update this task.');
      return;
    }
    try {
      setDisableCheckbox(true);
      await updateDoc(doc(db, 'tasks', user.id, collectionDate(), taskId), {
        isCompleted: value,
      });
      getTasks(user, setTasks);
      setDisableCheckbox(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDisableCheckbox(false);
    }
  };

  if (tasks.length) {
    return (
      <TableRoot>
        <TableHeader>
          <TableRow align="center">
            <TableColumnHeaderCell></TableColumnHeaderCell>
            <TableColumnHeaderCell justify="center">Task</TableColumnHeaderCell>
            <TableColumnHeaderCell justify="center">
              Completed
            </TableColumnHeaderCell>
            <TableColumnHeaderCell justify="center">
              Action
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task, index) => {
            return (
              <TableRow key={task.id} align="center">
                <TableCell>{index + 1}</TableCell>
                <TableCell justify="center">
                  <p className={`${task.isCompleted && 'line-through'}`}>
                    {task.task}
                  </p>
                </TableCell>
                <TableCell justify="center">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) => handleCheckbox(task.id, e.target.checked)}
                    disabled={disableCheckbox}
                  />
                </TableCell>
                <TableCell justify="center">
                  <Button onClick={() => handleDelete(task.id)} color="red">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableRoot>
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
