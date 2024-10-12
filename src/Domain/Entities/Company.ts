import { PasswordTypeEnum } from '../Enums/PasswordTypeEnum'
import PasswordFactory from '../Factories/PasswordFactory'
import Email from '../ValueObjects/Email'
import Name from '../ValueObjects/Name'
import Password from '../ValueObjects/Password'
import PhoneNumber from '../ValueObjects/PhoneNumber'

export default class Company {
  private _ownerName: Name
  private _email: Email
  private _CEP: string
  private _address: string
  private _whatsAppNumber: PhoneNumber
  private _password: Password

  constructor(
    ownerName: string,
    email: string,
    CEP: string,
    address: string,
    whatsAppNumber: string,
    password: string,
    readonly passwordType: PasswordTypeEnum = PasswordTypeEnum.SHA1,
  ) {
    this._ownerName = new Name(ownerName)
    this._email = new Email(email)
    this._CEP = CEP
    this._address = address
    this._whatsAppNumber = new PhoneNumber(whatsAppNumber)
    this._password = PasswordFactory.create(password, passwordType)
  }

  static create(
    ownerName: string,
    email: string,
    CEP: string,
    address: string,
    whatsAppNumber: string,
    password: string,
    passwordType: PasswordTypeEnum = PasswordTypeEnum.SHA1,
  ) {
    return new Company(
      ownerName,
      email,
      CEP,
      address,
      whatsAppNumber,
      password,
      passwordType,
    )
  }

  getEmail() {
    return this._email.get()
  }

  getName() {
    return this._ownerName.get()
  }

  setEmail(email: string) {
    this._email = new Email(email)
  }

  setPassword(
    password: string,
    passwordType: PasswordTypeEnum = PasswordTypeEnum.SHA1,
  ) {
    this._password = PasswordFactory.create(password, passwordType)
  }

  setPhoneNumber(value: string) {
    this._whatsAppNumber = new PhoneNumber(value)
  }
}
