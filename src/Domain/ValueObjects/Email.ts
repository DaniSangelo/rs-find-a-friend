export default class Email {
  private _email: string

  constructor(email: string) {
    if (!email) throw new Error('Email is required')
    if (!this.isValid(email)) throw new Error('Email is not valid')
    this._email = email
  }

  get() {
    return this._email
  }

  getDomain() {
    return this._email.split('@')[1]
  }

  private isValid(email: string) {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    return regex.test(email)
  }
}
