import clsx from 'clsx'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'
import '~/app.css'
import DisplayMode from '~/components/display-mode'
import { ModeToggle } from '~/components/mode-toggle'
import { Dialog } from '~/components/ui/dialog'
import { NavigationMenu, NavigationMenuList } from '~/components/ui/navigation-menu'
import { themeSessionResolver } from '~/sessions.server'
import type { Route } from './+types/root'
import NewDataDialog from './components/data-dialog'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

function ThemedLayout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={!!data.theme} />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <ThemedLayout>{children}</ThemedLayout>
    </ThemeProvider>
  )
}

export async function loader({ request }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return { theme: getTheme() }
}

export default function App() {
  return (
    <Dialog>
      <NavigationMenu className="p-2">
        <NavigationMenuList className="flex w-screen justify-center">
          <DisplayMode href="/">Text</DisplayMode>
          <DisplayMode href="/visual">Visual</DisplayMode>
          <NewDataDialog />
        </NavigationMenuList>
      </NavigationMenu>
      <div className="absolute end-2 top-2">
        <ModeToggle />
      </div>
      <Outlet />
    </Dialog>
  )
}

export function meta() {
  return [
    { title: 'Flight monitor' },
    { name: 'description', content: 'Flight data diplay made with react router' },
  ]
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
