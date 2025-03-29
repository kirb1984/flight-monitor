import { Form } from 'react-router'
import { Button } from './ui/button'
import { DialogClose, DialogFooter } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

/** The form with which you submit new data for the monitor. */
export default function NewDataForm() {
  return (
    <Form action="/action/data" method="post">
      <div className="grid gap-2">
        <Label htmlFor="alt">Altitude</Label>
        <Input type="number" id="alt" name="altitude" placeholder="0"></Input>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="his">HIS</Label>
        <Input type="number" id="his" name="his" placeholder="0"></Input>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="adi">ADI</Label>
        <Input type="number" id="adi" name="adi" placeholder="0"></Input>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" className="cursor-pointer">
            Confirm
          </Button>
        </DialogClose>
      </DialogFooter>
    </Form>
  )
}
