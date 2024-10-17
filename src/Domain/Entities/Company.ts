import { PasswordTypeEnum } from '../Enums/PasswordTypeEnum'
import PasswordFactory from '../Factories/PasswordFactory'
import Email from '../ValueObjects/Email'
import Name from '../ValueObjects/Name'
import Password from '../ValueObjects/Password'
import PhoneNumber from '../ValueObjects/PhoneNumber'
import crypto from 'node:crypto'

export default class Company {
  private name: Name
  private ownerName: Name
  private email: Email
  private whatsapp: PhoneNumber
  private password: Password

  constructor(
    readonly id: string,
    name: string,
    ownerName: string,
    email: string,
    whatsapp: string,
    password: string,
    readonly passwordType: PasswordTypeEnum = PasswordTypeEnum.SHA1,
  ) {
    this.name = new Name(name)
    this.ownerName = new Name(ownerName)
    this.email = new Email(email)
    this.whatsapp = new PhoneNumber(whatsapp)
    this.password = PasswordFactory.create(password, passwordType)
  }

  static create(
    name: string,
    ownerName: string,
    email: string,
    whatsapp: string,
    password: string,
    passwordType: PasswordTypeEnum = PasswordTypeEnum.SHA1,
  ) {
    return new Company(
      crypto.randomUUID(),
      name,
      ownerName,
      email,
      whatsapp,
      password,
      passwordType,
    )
  }

  getEmail() {
    return this.email.get()
  }

  getName() {
    return this.name.get()
  }

  getOwnerName() {
    return this.ownerName.get()
  }

  setEmail(email: string) {
    this.email = new Email(email)
  }

  setPassword(
    password: string,
    passwordType: PasswordTypeEnum = PasswordTypeEnum.SHA1,
  ) {
    this.password = PasswordFactory.create(password, passwordType)
  }

  setWhatsApp(value: string) {
    this.whatsapp = new PhoneNumber(value)
  }

  getWhatsApp() {
    return this.whatsapp.get()
  }

  verifyPassword(password: string): boolean {
    return this.password.verify(password)
  }
}
