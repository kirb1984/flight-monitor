import { MongoClient } from 'mongodb'

import type { FormSchemaType } from '~/lib/flight-data'

const db = new MongoClient(process.env.MONGODB_URI ?? '')
const collection = db.db().collection<FormSchemaType>('flight_data')

export async function getFromDatabase() {
  return collection.findOne()
}

export async function uploadToDatabase(data: FormSchemaType) {
  return await collection.replaceOne({}, data, { upsert: true })
}
