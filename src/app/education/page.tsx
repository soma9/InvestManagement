import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';

const articles = [
  {
    title: 'Understanding Asset Allocation',
    description: 'Learn how to diversify your portfolio to manage risk and maximize returns.',
    image: 'https://placehold.co/600x400',
    hint: 'finance chart',
  },
  {
    title: 'The Power of Compound Interest',
    description: 'Discover why starting to invest early can make a huge difference in your long-term wealth.',
    image: 'https://placehold.co/600x400',
    hint: 'growing money',
  },
  {
    title: 'Navigating Market Volatility',
    description: 'Strategies to keep a cool head and make smart decisions when the market is unpredictable.',
    image: 'https://placehold.co/600x400',
    hint: 'stock market',
  },
  {
    title: 'Retirement Planning 101',
    description: 'A beginner\'s guide to setting up your retirement accounts and planning for the future.',
    image: 'https://placehold.co/600x400',
    hint: 'happy retirement',
  },
];

const faqs = [
    {
        question: "What is a good starting point for a beginner investor?",
        answer: "A great starting point is to invest in low-cost, diversified index funds or ETFs. They provide broad market exposure without requiring you to pick individual stocks. Also, focus on creating a budget and building an emergency fund before you start investing."
    },
    {
        question: "How much of my income should I invest?",
        answer: "A common rule of thumb is to aim to invest 15% of your pre-tax income for retirement. However, the right amount depends on your age, financial goals, and income. The most important thing is to be consistent, even if you start small."
    },
    {
        question: "What's the difference between a stock and a bond?",
        answer: "A stock represents ownership (equity) in a company, offering potential for growth but with higher risk. A bond is essentially a loan to a company or government, which pays you interest over a set period. Bonds are generally considered safer than stocks but typically offer lower returns."
    },
    {
        question: "How often should I check my investments?",
        answer: "For long-term investors, it's often best to avoid checking your portfolio daily. Reviewing your investments quarterly or semi-annually is usually sufficient to ensure your strategy is on track without reacting emotionally to short-term market fluctuations."
    }
]

export default function EducationPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-primary" />
          Educational Resources
        </h1>
        <p className="text-muted-foreground mt-2">
          Empower your financial decisions with knowledge.
        </p>
      </div>

      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">
          Featured Articles
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.title} className="overflow-hidden group">
              <div className="overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={600}
                  height={400}
                  data-ai-hint={article.hint}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{article.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
