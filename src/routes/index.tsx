import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getCount = createServerFn({
  method: 'GET'
}).handler(() => {
  return new Date()
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount()
})

function Home() {
  const state = Route.useLoaderData()

  return (
    <>
      <h1 className="text-3xl font-bold underline"> Hello world! </h1>
      <button type="button">Add 1 to {state.toDateString()}?</button>
    </>
  )
}
