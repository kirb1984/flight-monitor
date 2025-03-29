import { getFromDatabase, uploadToDatabase } from '~/db'
import { FormSchema, type FormSchemaType } from '~/lib/flight-data'
import type { Route } from './+types/action.data'

/** This function implements the GET method for the REST API.
 * @returns the required parameters in the form of a promise.
 */
export async function loader(): Promise<FormSchemaType> {
  const data = await getFromDatabase()
  return data ?? { altitude: 0, his: 0, adi: 0 }
}

/** This function implements the POST method for the rest API.
 * @param {Request} request A request which contains the new data as `FormData`.
 */
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const data = {
    altitude: Number(formData.get('altitude')),
    his: Number(formData.get('his')),
    adi: Number(formData.get('adi')),
  }
  const result = FormSchema.safeParse(data)
  if (result.success) {
    await uploadToDatabase(result.data)
  }
  return { ok: result.success }
}
