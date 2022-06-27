// sequelize.ts 파일을 import함과 동시에 export 함.
import User, { associate as associateUser } from "./user"
export * from "./sequelize"

const db = {
  User,
}

export type dbType = typeof db

associateUser(db)