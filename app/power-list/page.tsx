'use client';

import { useEffect, useState } from 'react';
import Container from '../ui/Container';
import PowerList from '../ui/PowerList';
import { DocumentData } from 'firebase/firestore';
import { TasksGlobalContext } from '../Context/store';
import { useUser } from '@clerk/nextjs';
import { getTasks } from '@/helpers/taskHelpers';

export default function PowerListPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<DocumentData[]>([]);

  useEffect(() => {
    getTasks(user, setTasks);
  }, []);

  return (
    <Container>
      <TasksGlobalContext.Provider value={{ tasks, setTasks }}>
        <PowerList />
      </TasksGlobalContext.Provider>
    </Container>
  );
}
