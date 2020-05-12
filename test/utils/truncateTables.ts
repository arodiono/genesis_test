import { Connection, createConnection } from 'typeorm'

export default async () => {
  let connection: Connection

  try {
    connection = await createConnection()

    const entities = connection.entityMetadatas

    for (const entity of entities) {
      const repository = await connection.getRepository(entity.name)
      repository.clear()
    }
  } catch (err) {
    throw err
  } finally {
    if (connection) {
      await connection.close()
    }
  }
}
