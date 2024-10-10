import { PasswordType } from '../Enums/PasswordTypeEnum'
import PasswordFactory from '../Factories/PasswordFactory'
import Email from '../ValueObjects/Email'
import Name from '../ValueObjects/Name'
import Password from '../ValueObjects/Password'

export default class Company {
  private _ownerName: Name
  private _email: Email
  private _CEP: string
  private _address: string
  private _whatsAppNumber: string
  private _password: Password

  constructor(
    ownerName: string,
    email: string,
    CEP: string,
    address: string,
    whatsAppNumber: string,
    password: string,
  ) {
    this._ownerName = new Name(ownerName)
    this._email = new Email(email)
    this._CEP = CEP
    this._address = address
    this._whatsAppNumber = whatsAppNumber
    this._password = PasswordFactory.create(password, PasswordType.SHA1)
  }

  getEmail() {
    return this._email.get()
  }

  getName() {
    return this._ownerName.get()
  }
}
