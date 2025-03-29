import { ArrowUp } from 'lucide-react'
import { useLoaderData } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { getFromDatabase } from '~/db'
import type { FormSchemaType } from '~/lib/flight-data'

export async function loader(): Promise<FormSchemaType> {
  const data = await getFromDatabase()
  return data ?? { altitude: 0, his: 0, adi: 0 }
}

export default function VisualDisplay() {
  const { altitude, his, adi } = useLoaderData<typeof loader>()
  return (
    <main className="m-10 grid h-[calc(100vh-56px-var(--spacing)*20)] grid-cols-3 content-center gap-10">
      <Card>
        <CardHeader>
          <CardTitle>Altitude</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid justify-center">
            <div className="border-primary relative grid h-64 w-16 auto-cols-fr grid-rows-4 items-center justify-between justify-items-center gap-y-14 border-2">
              <div>3000</div>
              <div>2000</div>
              <div>1000</div>
              <div>0</div>
              <div
                className="bg-foreground absolute -left-2 h-1 w-20"
                style={{ top: 255 - (altitude * 256) / 3000 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>HIS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid justify-center">
            <div className="relative">
              <svg height={256} width={256} className="fill-none">
                <circle r={128} cx={128} cy={128} className="stroke-primary" />
              </svg>
              <div className="absolute top-0 left-31">0</div>
              <div className="absolute top-30 right-1">90</div>
              <div className="absolute bottom-0 left-29">180</div>
              <div className="absolute top-30 left-1">270</div>
              <ArrowUp
                className="absolute top-30 left-29 scale-y-200"
                style={{ rotate: `${his}deg` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ADI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid justify-center">
            <svg height={256} width={256} className="fill-none">
              <defs>
                <clipPath id="cut-bottom">
                  <rect x={0} y={-128 + adi * 1.28} width={256} height={256} />
                </clipPath>
                <clipPath id="cut-top">
                  <rect x={0} y={128 + adi * 1.28} width={256} height={256} />
                </clipPath>
              </defs>
              <circle
                r={128}
                cx={128}
                cy={128}
                clipPath="url(#cut-bottom)"
                className="stroke-primary fill-blue-500"
              />
              <circle
                r={128}
                cx={128}
                cy={128}
                clipPath="url(#cut-top)"
                className="stroke-primary fill-green-500"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
