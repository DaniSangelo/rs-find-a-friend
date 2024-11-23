import Pet from 'src/Domain/Entities/Pet'

export default interface IPetRepository {
  save(pet: Pet): Promise<unknown>
}
