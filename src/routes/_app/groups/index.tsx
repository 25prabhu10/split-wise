import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Plus, Users, Calendar, TrendingUp, Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { groupQueries } from '@/services/group/group.queries'
import { UserGroup } from '@/services/group/group.validators'

export const Route = createFileRoute('/_app/groups/')({
  component: RouteComponent
})

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: groups, isLoading, error } = useQuery(groupQueries.getUserGroups())

  const filteredGroups =
    groups?.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase())) || []

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg font-medium text-destructive">Failed to load groups</p>
          <p className="mt-2 text-muted-foreground">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-2">
          <h1 className="animate-in text-3xl font-bold tracking-tight duration-500 slide-in-from-left-5">
            My Groups
          </h1>
          <p className="animate-in text-muted-foreground delay-100 duration-500 slide-in-from-left-5">
            Manage your expense groups and track spending with friends and family
          </p>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <div className="relative animate-in duration-500 slide-in-from-right-5">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:w-64"
            />
          </div>

          <Button asChild className="animate-in delay-100 duration-500 slide-in-from-right-5">
            <Link to="/groups/create">
              <Plus className="h-4 w-4" />
              Create Group
            </Link>
          </Button>
        </div>
      </div>

      {!isLoading && groups && (
        <div className="grid animate-in gap-4 delay-200 duration-700 fade-in-50 md:grid-cols-3">
          <Card className="outline-2 transition-all duration-300 hover:shadow-lg hover:outline hover:outline-offset-2 hover:outline-primary">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Groups</p>
                  <p className="text-2xl font-bold">{groups.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="outline-2 transition-all duration-300 hover:shadow-lg hover:outline hover:outline-offset-2 hover:outline-primary">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-green-500/10 p-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Groups</p>
                  <p className="text-2xl font-bold">{groups.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="outline-2 transition-all duration-300 hover:shadow-lg hover:outline hover:outline-offset-2 hover:outline-primary">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-blue-500/10 p-2">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">
                    {
                      groups.filter(
                        (g) => new Date(g.joinedAt).getMonth() === new Date().getMonth()
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-6">
        {isLoading ? (
          <GroupsLoadingSkeleton />
        ) : filteredGroups.length === 0 ? (
          searchQuery ? (
            <EmptySearchState searchQuery={searchQuery} />
          ) : (
            <EmptyGroupsState />
          )
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group, index) => (
              <GroupCard key={group.id} group={group} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function GroupCard({ group, index }: { group: UserGroup; index: number }) {
  return (
    <Card
      className="group animate-in transition-all duration-300 fade-in-50 slide-in-from-bottom-5 hover:shadow-lg"
      style={{
        animationDelay: `${index * 100 + 300}ms`,
        animationFillMode: 'both'
      }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-1">
            <CardTitle className="line-clamp-1 text-lg font-semibold transition-colors duration-200">
              {group.name}
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {group.memberCount} member{group.memberCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Joined</span>
          <span className="font-medium">{format(new Date(group.joinedAt), 'MMM dd, yyyy')}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Created</span>
          <span className="font-medium">{format(new Date(group.createdAt), 'MMM dd, yyyy')}</span>
        </div>

        <div className="pt-2">
          <Button asChild variant="outline" className="w-full">
            <Link to="/groups/$groupId" params={{ groupId: group.id }}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function GroupsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-12" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function EmptyGroupsState() {
  return (
    <div className="flex animate-in flex-col items-center justify-center space-y-6 py-16 duration-700 fade-in-50">
      <div className="rounded-full bg-muted p-4">
        <Users className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold">No groups yet</h3>
        <p className="max-w-md text-muted-foreground">
          Create your first group to start splitting expenses with friends and family.
        </p>
      </div>
      <Button asChild size="lg" className="animate-pulse">
        <Link to="/groups/create">
          <Plus className="h-4 w-4" />
          Create Your First Group
        </Link>
      </Button>
    </div>
  )
}

function EmptySearchState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="flex animate-in flex-col items-center justify-center space-y-6 py-16 duration-500 fade-in-50">
      <div className="rounded-full bg-muted p-4">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold">No groups found</h3>
        <p className="max-w-md text-muted-foreground">
          No groups match your search for "{searchQuery}". Try a different search term.
        </p>
      </div>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Clear Search
      </Button>
    </div>
  )
}
