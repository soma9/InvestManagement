import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useCurrency } from '@/context/currency-context';

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
};

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const { formatCurrency } = useCurrency();
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const deadlineDate = new Date(goal.deadline);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">{goal.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {format(deadlineDate, 'MMMM d, yyyy')}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(goal.currentAmount)}
            </span>
            <span className="text-sm text-muted-foreground">
              of {formatCurrency(goal.targetAmount)}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(deadlineDate, { addSuffix: true })} left
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit Goal</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete Goal</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
