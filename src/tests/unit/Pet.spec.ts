import Company from 'src/Domain/Entities/Company'
import Pet from 'src/Domain/Entities/Pet'
import { describe, expect, it } from 'vitest'

describe('Create pet', () => {
  it('Should be able to create a pet', () => {
    const company = Company.create(
      'Jhon Doe LTDA',
      'Jhon Doe',
      'jhondoe@mail.com',
      '1164666446',
      '123456',
      {
        zipCode: '30514030',
        state: 'Minas Gerais',
        city: 'Belo Horizonte',
        neighborhood: 'Betânia',
        street: 'Rua das Flores',
        latitude: 40.7128,
        longitude: -74.006,
      },
    )
    const pet = Pet.create(
      'Rex',
      'Rex is a sweet dog and he likes to play a lot outdoor',
      '6',
      '1',
      '4',
      'house',
      company,
    )
    expect(pet.getName()).toEqual('Rex')
  })

  it('Should not be possible to create a pet with a name with less than 2 characters', () => {
    const company = Company.create(
      'Jhon Doe LTDA',
      'Jhon Doe',
      'jhondoe@mail.com',
      '1164666446',
      '123456',
      {
        zipCode: '30514030',
        state: 'Minas Gerais',
        city: 'Belo Horizonte',
        neighborhood: 'Betânia',
        street: 'Rua das Flores',
        latitude: 40.7128,
        longitude: -74.006,
      },
    )
    expect(() => {
      return Pet.create(
        'R',
        'Rex is a sweet dog and he likes to play a lot outdoor',
        '6',
        '1',
        '4',
        'house',
        company,
      )
    }).toThrow(new Error('Name must be at least 2 characters long'))
  })

  it('Should not be possible to create a pet with a empty name', () => {
    const company = Company.create(
      'Jhon Doe LTDA',
      'Jhon Doe',
      'jhondoe@mail.com',
      '1164666446',
      '123456',
      {
        zipCode: '30514030',
        state: 'Minas Gerais',
        city: 'Belo Horizonte',
        neighborhood: 'Betânia',
        street: 'Rua das Flores',
        latitude: 40.7128,
        longitude: -74.006,
      },
    )
    expect(() => {
      return Pet.create(
        '',
        'Rex is a sweet dog and he likes to play a lot outdoor',
        '6',
        '1',
        '4',
        'house',
        company,
      )
    }).toThrow(new Error('Name cannot be empty'))
  })
})
