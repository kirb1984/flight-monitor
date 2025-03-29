import { PlusIcon } from 'lucide-react'
import NewDataForm from './new-data-form'
import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { NavigationMenuItem } from './ui/navigation-menu'

/** The dialog containing the data form. */
export default function NewDataDialog() {
  return (
    <NavigationMenuItem>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit flight data</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <NewDataForm />
      </DialogContent>
    </NavigationMenuItem>
  )
}
