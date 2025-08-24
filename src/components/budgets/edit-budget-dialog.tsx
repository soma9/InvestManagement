
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { BudgetData, IconName } from './budget-card';
import type React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Car, Home, ShoppingCart, Ticket } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3, 'Budget name must be at least 3 characters.'),
  amount: z.coerce.number().positive('Budget amount must be positive.'),
  icon: z.enum(['ShoppingCart', 'Ticket', 'Car', 'Home']),
});

type EditBudgetDialogProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateBudget: (budget: BudgetData) => void;
  budget: BudgetData;
};

const iconMap: Record<IconName, React.ElementType> = {
    ShoppingCart: ShoppingCart,
    Ticket: Ticket,
    Car: Car,
    Home: Home,
};

export default function EditBudgetDialog({
  children,
  open,
  onOpenChange,
  onUpdateBudget,
  budget,
}: EditBudgetDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: budget.name,
      amount: budget.amount,
      icon: budget.icon,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onUpdateBudget({ ...budget, ...values });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Edit Budget</DialogTitle>
          <DialogDescription>
            Update the details for your "{budget.name}" budget.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(iconMap).map(([name, Icon]) => (
                            <SelectItem key={name} value={name}>
                                <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    <span>{name}</span>
                                </div>
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
                <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
