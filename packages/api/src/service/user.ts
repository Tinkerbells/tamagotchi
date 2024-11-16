import { UserRepository } from '../repository/user'

export class UserService {
  private repo: UserRepository

  constructor(userRepository: UserRepository) {
    this.repo = userRepository

    this.create = this.create.bind(this)
    this.findByEmail = this.findByEmail.bind(this)
  }

  public async create(name: string, email: string) {
    await this.repo.create({ name, email })
  }

  public async findByEmail(email: string) {
    return this.repo.findByEmail(email)
  }

  public async find(id: number) {
    return this.repo.find(id)
  }
}
