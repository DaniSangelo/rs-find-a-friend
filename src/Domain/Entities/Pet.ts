import crypto from 'node:crypto'

export default class Pet {
  #name: string
  #about: string
  #age: string
  #size: string
  #energyLevel: string
  #environment: string

  constructor(
    readonly id: string,
    name: string,
    about: string,
    age: string,
    size: string,
    energyLevel: string,
    environment: string,
  ) {
    this.validateName(name)
    this.#name = name
    this.#about = about
    this.#age = age
    this.#size = size
    this.#energyLevel = energyLevel
    this.#environment = environment
  }

  static create(
    name: string,
    about: string,
    age: string,
    size: string,
    energyLevel: string,
    environment: string,
  ): Pet {
    return new Pet(
      crypto.randomUUID(),
      name,
      about,
      age,
      size,
      energyLevel,
      environment,
    )
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.#name
  }

  public setName(name: string): void {
    this.validateName(name)
    this.#name = name
  }

  public getAbout(): string {
    return this.#about
  }

  public setAbout(about: string): void {
    this.#about = about
  }

  public getAge() {
    return this.#age
  }

  public getSize() {
    return this.#size
  }

  public getEnergyLevel() {
    return this.#energyLevel
  }

  public getEnvironment() {
    return this.#environment
  }

  public setAge(value: string) {
    this.#age = value
  }

  public setSize(value: string) {
    this.#size = value
  }

  public setEnergyLevel(value: string) {
    this.#energyLevel = value
  }

  public setEnvironment(value: string) {
    this.#environment = value
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty')
    }
    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters long')
    }
  }
}
