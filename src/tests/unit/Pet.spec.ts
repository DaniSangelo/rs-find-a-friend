import Pet from 'src/Domain/Entities/Pet'
import { describe, expect, it } from 'vitest'

describe('Create pet', () => {
  it('Should be able to create a pet', () => {
    const pet = Pet.create(
      'Rex',
      'Rex is a sweet dog and he likes to play a lot outdoor',
      '6',
      '1',
      '4',
      'house',
    )
    expect(pet.getName()).toEqual('Rex')
  })

  it('Should not be possible to create a pet with a name with less than 2 characters', () => {
    expect(() => {
      return Pet.create(
        'R',
        'Rex is a sweet dog and he likes to play a lot outdoor',
        '6',
        '1',
        '4',
        'house',
      )
    }).toThrow(new Error('Name must be at least 2 characters long'))
  })

  it('Should not be possible to create a pet with a empty name', () => {
    expect(() => {
      return Pet.create(
        '',
        'Rex is a sweet dog and he likes to play a lot outdoor',
        '6',
        '1',
        '4',
        'house',
      )
    }).toThrow(new Error('Name cannot be empty'))
  })
})
