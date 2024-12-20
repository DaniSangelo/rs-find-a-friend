import Coordinates from './Coordinates'

export default class Address {
  #zipCode: string
  #state: string
  #city: string
  #neighborhood: string
  #street: string
  #coordinates: Coordinates

  constructor(
    zipCode: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    latitude: number,
    longitude: number,
  ) {
    this.#zipCode = zipCode
    this.#state = state
    this.#city = city
    this.#neighborhood = neighborhood
    this.#street = street
    this.#coordinates = new Coordinates(latitude, longitude)
  }

  getZipCode() {
    return this.#zipCode
  }

  getState() {
    return this.#state
  }

  getCity() {
    return this.#city
  }

  getNeighborhood() {
    return this.#neighborhood
  }

  getStreet() {
    return this.#street
  }

  getCoordinates() {
    return this.#coordinates
  }
}
