
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Rocket } from "lucide-react"
import Link from "next/link"

export default function OnboardingSteps() {
  return (
    <Alert>
      <Rocket className="h-4 w-4" />
      <AlertTitle>Welcome to Your Financial Hub!</AlertTitle>
      <AlertDescription>
        <p className="mb-2">Follow these steps to get the most out of the app:</p>
        <ol className="list-decimal list-inside space-y-1">
            <li>
                Visit the <Link href="/profile" className="font-semibold underline hover:text-primary">Profile</Link> page to set your preferred currency.
            </li>
            <li>
                Head to the <Link href="/transactions" className="font-semibold underline hover:text-primary">Transactions</Link> page to add your income and expenses.
            </li>
            <li>
                Set up your spending limits on the <Link href="/budgets" className="font-semibold underline hover:text-primary">Budgets</Link> page.
            </li>
            <li>
                Define your long-term objectives on the <Link href="/goals" className="font-semibold underline hover:text-primary">Goals</Link> page.
            </li>
            <li>
                Generate a detailed <Link href="/report" className="font-semibold underline hover:text-primary">Performance Report</Link> to see your progress.
            </li>
        </ol>
      </AlertDescription>
    </Alert>
  )
}
