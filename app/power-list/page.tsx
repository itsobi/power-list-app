'use client';

import { useEffect, useState } from 'react';
import Container from '../ui/Container';
import { TasksGlobalContext } from '../context/store';
import { useUser } from '@clerk/nextjs';
import { getTasks } from '@/helpers/taskHelpers';
import PowerListForm from '../ui/PowerListForm';
import PowerListTable from '../ui/PowerListTable';

export default function PowerListPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getTasks(user, setTasks);
  }, [user]);

  return (
    // <TasksGlobalContext.Provider value={{ tasks, setTasks }}>
    //   <Container>
    //     <PowerListForm />

    //     <div className="mt-10">
    //       <PowerListTable />
    //     </div>
    //   </Container>
    // </TasksGlobalContext.Provider>
    <Container>
      <PowerListForm tasks={tasks} setTasks={setTasks} />

      <div className="mt-10">
        <PowerListTable tasks={tasks} setTasks={setTasks} />
      </div>
    </Container>
  );
}
