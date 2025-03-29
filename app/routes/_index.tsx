import { useLoaderData } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getFromDatabase } from '~/db'
import type { FormSchemaType } from '~/lib/flight-data'

export async function loader(): Promise<FormSchemaType> {
  const data = await getFromDatabase()
  return data ?? { altitude: 0, his: 0, adi: 0 }
}

export default function TextDisplay() {
  const { altitude, his, adi } = useLoaderData<typeof loader>()
  return (
    <main className="m-10 grid h-[calc(100vh-56px-var(--spacing)*20)] grid-cols-3 content-center gap-10">
      <Card>
        <CardHeader>
          <CardTitle>Altitude</CardTitle>
        </CardHeader>
        <CardContent>{altitude}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>HIS</CardTitle>
        </CardHeader>
        <CardContent>{his}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ADI</CardTitle>
        </CardHeader>
        <CardContent>{adi}</CardContent>
      </Card>
    </main>
  )
}
