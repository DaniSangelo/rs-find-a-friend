export default class Name {
  private _name: string
  constructor(name: string) {
    if (!name) throw new Error('Name is required')
    if (!this.isValid(name)) throw new Error('Invalid name')
    this._name = name
  }

  get() {
    return this._name
  }

  private isValid(name: string) {
    const regex = /[a-zA-Z]{3,}/
    return regex.test(name)
  }
}
