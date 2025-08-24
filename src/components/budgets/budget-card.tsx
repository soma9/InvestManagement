
'use client';

import { useState } from 'react';
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
import { Edit, Trash2, ShoppingCart, Ticket, Car, Home } from 'lucide-react';
import { useCurrency } from '@/context/currency-context';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import EditBudgetDialog from './edit-budget-dialog';

export type IconName = 'ShoppingCart' | 'Ticket' | 'Car' | 'Home';

export type BudgetData = {
  id: string;
  name: string;
  amount: number;
  icon: IconName;
}
export type Budget = BudgetData & {
  spent: number;
};

interface BudgetCardProps {
  budget: Budget;
  onUpdate: (budget: BudgetData) => void;
  onDelete: (id: string) => void;
}

const iconMap: Record<IconName, React.ElementType> = {
  ShoppingCart: ShoppingCart,
  Ticket: Ticket,
  Car: Car,
  Home: Home,
};

export default function BudgetCard({ budget, onUpdate, onDelete }: BudgetCardProps) {
  const { formatCurrency } = useCurrency();
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const progress = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
  const remaining = budget.amount - budget.spent;
  const Icon = iconMap[budget.icon];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-3">
          <Icon className="h-6 w-6 text-primary" />
          {budget.name}
        </CardTitle>
        <CardDescription className="pt-1">
          Monthly spending limit: {formatCurrency(budget.amount)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-2xl font-bold">
              {formatCurrency(budget.spent)}
            </span>
            <span className="text-sm text-muted-foreground">
              of {formatCurrency(budget.amount)}
            </span>
          </div>
          <Progress value={progress > 100 ? 100 : progress} className="h-3" />
          <div className="mt-2">
            <p className={`text-sm ${remaining < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {remaining >= 0 ? `${formatCurrency(remaining)} remaining` : `${formatCurrency(Math.abs(remaining))} over budget`}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <EditBudgetDialog
          budget={budget}
          onUpdateBudget={onUpdate}
          open={isEditDialogOpen}
          onOpenChange={setEditDialogOpen}
        >
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Budget</span>
            </Button>
        </EditBudgetDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete Budget</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the "{budget.name}" budget.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(budget.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
