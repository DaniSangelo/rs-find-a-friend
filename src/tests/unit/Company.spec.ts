import { beforeEach, describe, expect, it } from 'vitest'
import Company from '../../Domain/Entities/Company'
import { PasswordTypeEnum } from '../../Domain/Enums/PasswordTypeEnum'
import Address from 'src/Domain/ValueObjects/Address'
import Coordinates from 'src/Domain/ValueObjects/Coordinates'

let address: Address

describe('Create company', () => {
  beforeEach(() => {
    address = new Address(
      '30514030',
      'Minas Gerais',
      'Belo Horizonte',
      'Betânia',
      'Rua das Flores',
      new Coordinates(40.7128, -74.006),
    )
  })

  it('Should be able to create a company', () => {
    const company = Company.create(
      'Jhon Doe LTDA',
      'Jhon Doe',
      'jhonDoe@mail.com',
      '6466564458',
      '123456',
      address,
      PasswordTypeEnum.MD5,
    )
    expect(company.getEmail()).toEqual('jhonDoe@mail.com')
    expect(company.verifyPassword('123456')).toBe(true)
  })

  it('Should not be possible to create a company with an invalid email', () => {
    expect(() => {
      return Company.create(
        'Jhon Doe LTDA',
        'Jhon Doe',
        'jhondoe@mail',
        '6466564',
        '123456',
        address,
        PasswordTypeEnum.MD5,
      )
    }).toThrow(new Error('Email is not valid'))
  })

  it('Should not be possible to create a company with a owner name with less than 3 characters', () => {
    expect(() => {
      return Company.create(
        'Joe Doe LTDA',
        'Jo',
        'jhonDoe@mail.com',
        '6466564',
        '123456',
        address,
        PasswordTypeEnum.MD5,
      )
    }).toThrow(new Error('Invalid name'))
  })

  it('Should not be possible to create a company with a name with less than 3 characters', () => {
    expect(() => {
      return Company.create(
        'Jo',
        'Jhon Doe',
        'jhonDoe@mail.com',
        '6466564',
        '123456',
        address,
        PasswordTypeEnum.MD5,
      )
    }).toThrow(new Error('Invalid name'))
  })

  it('Should not be able to create a company with an invalid phone number', () => {
    expect(() => {
      return Company.create(
        'Jhon Doe LTDA',
        'Jhon Doe',
        'jhondoe@mail.com',
        '6466',
        '123456',
        address,
        PasswordTypeEnum.MD5,
      )
    }).toThrow(new Error('Invalid phone number'))
  })

  it.only('Should not be able to create a company with an invalid latitude', () => {
    expect(() => {
      return new Address(
        '30514030',
        'Minas Gerais',
        'Belo Horizonte',
        'Betânia',
        'Rua das Flores',
        new Coordinates(-140.7128, -74.006),
      )
    }).toThrow(new Error('Invalid latitude value'))
  })

  it('Should not be able to create a company with an invalid longitude', () => {
    expect(() => {
      return new Address(
        '30514030',
        'Minas Gerais',
        'Belo Horizonte',
        'Betânia',
        'Rua das Flores',
        new Coordinates(-40.7128, -174.006),
      )
    }).toThrow(new Error('Invalid longitude value'))
  })
})
