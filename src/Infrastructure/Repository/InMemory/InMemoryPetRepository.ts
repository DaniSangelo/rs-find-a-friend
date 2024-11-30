import Pet from 'src/Domain/Entities/Pet'
import IPetRepository from '../IPetRepository'

export default class InMemoryPetRepository implements IPetRepository {
  public pets: Pet[] = []

  async save(pet: Pet) {
    this.pets.push(pet)
    return pet
  }
}
