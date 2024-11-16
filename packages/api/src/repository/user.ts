import { db, NewUser, userSchema } from '@tamagotchi/drizzle'
import { eq } from 'drizzle-orm'

export class UserRepository {
  constructor() {}

  public async create(user: NewUser) {
    return db.insert(userSchema).values(user)
  }

  public async find(id: number) {
    return db.query.userSchema.findFirst({
      where: eq(userSchema.id, id),
    })
  }

  public async findByEmail(email: string) {
    return db.query.userSchema.findFirst({
      where: eq(userSchema.email, email),
    })
  }
}
