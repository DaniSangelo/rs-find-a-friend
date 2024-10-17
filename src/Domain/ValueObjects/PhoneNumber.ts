export default class PhoneNumber {
  private _value: string

  constructor(value: string) {
    if (!this.isValid(value)) throw new Error('Invalid phone number')
    this._value = value
  }

  private isValid(value: string) {
    const regex = /^\d{10,18}$/
    return regex.test(value)
  }

  get() {
    return this._value
  }
}
