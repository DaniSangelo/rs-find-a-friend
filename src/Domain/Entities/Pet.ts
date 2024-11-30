import crypto from 'node:crypto'
import Company from './Company'

export default class Pet {
  #name: string
  #about: string
  #age: string
  #size: string
  #energyLevel: string
  #environment: string
  #company: Company

  constructor(
    readonly id: string,
    name: string,
    about: string,
    age: string,
    size: string,
    energyLevel: string,
    environment: string,
    company: Company,
  ) {
    this.validateName(name)
    this.#name = name
    this.#about = about
    this.#age = age
    this.#size = size
    this.#energyLevel = energyLevel
    this.#environment = environment
    this.validateCompany(company)
    this.#company = company
  }

  static create(
    name: string,
    about: string,
    age: string,
    size: string,
    energyLevel: string,
    environment: string,
    company: Company,
  ): Pet {
    return new Pet(
      crypto.randomUUID(),
      name,
      about,
      age,
      size,
      energyLevel,
      environment,
      company,
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

  public getCompany(): Company {
    return this.#company
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Name cannot be empty')
    }
    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters long')
    }
  }

  private validateCompany(company: Company): void {
    if (!company) {
      throw new Error('Company cannot be empty')
    }
  }
}
