import path from 'path'
import { Builder, fixturesIterator, Loader, Parser, Resolver } from 'typeorm-fixtures-cli/dist'
import { createConnection, getRepository } from 'typeorm'

export default async () => {
  let connection

  try {
    connection = await createConnection()
    const loader = new Loader()

    loader.load(path.resolve('./test/fixtures'))

    const resolver = new Resolver()
    const fixtures = resolver.resolve(loader.fixtureConfigs)
    const builder = new Builder(connection, new Parser())

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await builder.build(fixture)
      await getRepository(entity.constructor.name).save(entity)
    }
  } catch (err) {
    throw err
  } finally {
    if (connection) {
      await connection.close()
    }
  }
}
