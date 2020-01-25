import { connect } from 'mongoose'
import signale from 'signale'
import { MongoClientOptions } from 'mongodb'


const mongoOptions: MongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

/**
 * Connects to the Database
 */
export default class Database {
/** Connection to the MongoDB database function */
  private static CONNECTION_KEY: string | undefined = process.env.MONGODB_KEY

  static mongoConnect (callback?: (...args: any) => void) {
    if (this.CONNECTION_KEY) {
      signale.pending('🗄️   Connecting to the MongoDB Instance...')
      connect(this.CONNECTION_KEY, mongoOptions)
        .then(_client => {
          signale.success('🗄️  ✅   Connected to MongoDB Database successfully !')
          callback && callback()
        })
        .catch(error => {
          signale.error('🗄️  ❌   Connection to database failed: ', error)
          callback && callback()
        })
    }
  }
}
