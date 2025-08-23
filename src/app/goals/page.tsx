'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GoalCard, { type Goal } from '@/components/goals/goal-card';
import AddGoalDialog from '@/components/goals/add-goal-dialog';
import { PlusCircle } from 'lucide-react';

const initialGoals: Goal[] = [
  {
    id: '1',
    name: 'Retirement Fund',
    targetAmount: 1000000,
    currentAmount: 250000,
    deadline: '2050-12-31',
  },
  {
    id: '2',
    name: 'Dream Vacation to Japan',
    targetAmount: 10000,
    currentAmount: 8500,
    deadline: '2025-06-15',
  },
  {
    id: '3',
    name: 'New Car',
    targetAmount: 40000,
    currentAmount: 15000,
    deadline: '2026-01-01',
  },
  {
    id: '4',
    name: 'Home Down Payment',
    targetAmount: 100000,
    currentAmount: 75000,
    deadline: '2027-08-20',
  },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addGoal = (newGoal: Omit<Goal, 'id'>) => {
    setGoals((prev) => [
      ...prev,
      { ...newGoal, id: (prev.length + 1).toString() },
    ]);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
            Financial Goals
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your progress and stay motivated on your financial journey.
          </p>
        </div>
        <AddGoalDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddGoal={addGoal}
        >
          <Button>
            <PlusCircle />
            <span>Add New Goal</span>
          </Button>
        </AddGoalDialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}
