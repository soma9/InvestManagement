'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRightLeft, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useTransactions } from '@/context/transaction-context';
import { useCurrency } from '@/context/currency-context';
import AddTransactionDialog from '@/components/transactions/add-transaction-dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function TransactionsPage() {
  const { transactions, addTransaction } = useTransactions();
  const { formatCurrency } = useCurrency();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
            <ArrowRightLeft className="w-10 h-10 text-primary" />
            Transactions
          </h1>
          <p className="text-muted-foreground mt-2">
            Log your income and expenses to keep track of your finances.
          </p>
        </div>
        <AddTransactionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddTransaction={addTransaction}
        >
          <Button>
            <PlusCircle />
            <span>Add Transaction</span>
          </Button>
        </AddTransactionDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A record of your recent financial activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No transactions yet.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell>{format(new Date(transaction.date), 'PPP')}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'} className='flex items-center gap-1 w-fit'>
                        {transaction.type === 'income' ? <ArrowUpCircle className="h-3 w-3"/> : <ArrowDownCircle className="h-3 w-3" />}
                        <span>{transaction.type}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
