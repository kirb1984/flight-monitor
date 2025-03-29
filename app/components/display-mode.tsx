import { NavLink } from 'react-router'
import { buttonVariants } from './ui/button'
import { NavigationMenuItem, NavigationMenuLink } from './ui/navigation-menu'

/** A wrapper around Link components to allow simpler reusability. */
export default function DisplayMode({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <NavLink to={href} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
          {children}
        </NavLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
