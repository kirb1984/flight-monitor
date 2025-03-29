import { z } from 'zod'

export const FormSchema = z.object({
  altitude: z.number().min(0).max(3000),
  his: z.number().min(0).max(360),
  adi: z.number().min(-100).max(100),
})

export type FormSchemaType = z.infer<typeof FormSchema>
