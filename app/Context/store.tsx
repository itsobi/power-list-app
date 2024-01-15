'use client';

import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type TasksGlobalContext = {
  tasks: any[];
  setTasks: Dispatch<SetStateAction<any[]>>;
};

export const TasksGlobalContext = createContext<TasksGlobalContext>({
  tasks: [],
  setTasks: () => {},
});

export const useTasksContext = () => useContext(TasksGlobalContext);
