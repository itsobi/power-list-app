'use client';

import { DocumentData } from 'firebase/firestore';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type TasksGlobalContext = {
  tasks: DocumentData[] | [];
  setTasks: Dispatch<SetStateAction<DocumentData[]>>;
};

export const TasksGlobalContext = createContext<TasksGlobalContext>({
  tasks: [],
  setTasks: () => {},
});

export const useTasksContext = () => useContext(TasksGlobalContext);
