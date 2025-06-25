import { Link } from '@tanstack/react-router'
import { ArrowRight, History, Share, TrendingUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { SignedIn } from './auth/signed-in'
import { SignedOut } from './auth/signed-out'

interface LandingContentProps {
  name?: null | string
}

export function LandingContent({ name = 'Guest' }: LandingContentProps) {
  return (
    <main className="flex-1">
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <SignedIn>Welcome back, {name}!</SignedIn>
              <SignedOut>Share Expenses Effortlessly</SignedOut>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              <SignedIn>
                Manage your expenses and split bills with friends and family seamlessly. Your
                financial journey starts here.
              </SignedIn>
              <SignedOut>
                Join our community to easily track expenses, split bills, and manage shared costs
                with friends and family. Start simplifying your finances today!
              </SignedOut>
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <SignedIn>
              <Button asChild size="lg">
                <Link className="flex items-center space-x-2" to="/dashboard">
                  <span>Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/">View Profile</Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <Button asChild size="lg">
                <Link className="flex items-center space-x-2" to="/sign-in">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>

      <SignedOut>
        <section className="bg-muted/50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Why Choose Us?</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We provide a comprehensive platform to manage your expenses, connect with others,
                and grow your financial knowledge. Here&apos;s what we offer:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Share className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Share Expenses</h3>
                  <p className="text-muted-foreground">
                    Effortlessly track and split expenses with friends and family.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <History className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">History</h3>
                  <p className="text-muted-foreground">
                    Keep track of all your past transactions and shared expenses.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Savings</h3>
                  <p className="text-muted-foreground">
                    Gain insights into your spending habits and find ways to save more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </SignedOut>
    </main>
  )
}
