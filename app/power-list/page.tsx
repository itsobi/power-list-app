'use client';

import { useEffect, useState } from 'react';
import Container from '../ui/Container';
import { useUser } from '@clerk/nextjs';
import { getTasks } from '@/helpers/taskHelpers';
import PowerListForm from '../ui/PowerListForm';
import PowerListTable from '../ui/PowerListTable';
import { Task } from '@/typings';
import { collectionDate } from '@/helpers/dateHelpers';
import Link from 'next/link';

export default function PowerListPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDate, setTaskDate] = useState(collectionDate());

  useEffect(() => {
    getTasks(user, setTasks, taskDate);
  }, [user, taskDate]);

  return (
    <Container>
      <PowerListForm
        tasks={tasks}
        setTasks={setTasks}
        taskDate={taskDate}
        setTaskDate={setTaskDate}
      />

      <Link
        href="/power-list/info"
        className="text-center mt-6 font-extralight text-sm hover:text-slate-600 hover:underline flex justify-center"
      >
        What is a Power List?
      </Link>

      <div className="mt-10">
        <PowerListTable tasks={tasks} setTasks={setTasks} />
      </div>
    </Container>
  );
}
