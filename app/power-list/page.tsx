'use client';

import { useEffect, useState } from 'react';
import Container from '../ui/Container';
import { useUser } from '@clerk/nextjs';
import { getTasks } from '@/helpers/taskHelpers';
import PowerListForm from '../ui/PowerListForm';
import PowerListTable from '../ui/PowerListTable';
import { Task } from '@/typings';

export default function PowerListPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks(user, setTasks);
  }, [user]);

  return (
    <Container>
      <PowerListForm tasks={tasks} setTasks={setTasks} />

      <div className="mt-10">
        <PowerListTable tasks={tasks} setTasks={setTasks} />
      </div>
    </Container>
  );
}
