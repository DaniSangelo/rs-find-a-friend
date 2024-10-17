import { describe, expect, it } from 'vitest'
import Company from '../../Domain/Entities/Company'
import { PasswordTypeEnum } from '../../Domain/Enums/PasswordTypeEnum'

describe('Create company', () => {
  it('Should be able to create a company', () => {
    const company = Company.create(
      'Jhon Doe LTDA',
      'Jhon Doe',
      'jhonDoe@mail.com',
      '6466564458',
      '123456',
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
        PasswordTypeEnum.MD5,
      )
    }).toThrow(new Error('Invalid phone number'))
  })
})
