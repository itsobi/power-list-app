'use client';

import { IconButton } from '@radix-ui/themes';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function Task({ task }: { task: DocumentData }) {
  const [crossOutText, setCrossOutText] = useState(false);
  return (
    <div className="grid grid-cols-3 border-b p-4">
      <div className="flex justify-center items-center">
        <p className={crossOutText ? 'line-through font-extralight' : 'none'}>
          {task.task}
        </p>
      </div>

      <label className="text-sm flex items-center justify-center">
        <input
          type="checkbox"
          onChange={(e) => setCrossOutText(e.target.checked)}
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
