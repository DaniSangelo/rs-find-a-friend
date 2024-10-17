export default class Coordinates {
  constructor(
    private readonly latitude: number,
    private readonly longitude: number,
  ) {
    if (latitude < -90 || latitude > 90) {
      throw new Error('Invalid latitude value')
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('Invalid longitude value')
    }
  }

  getLongitude() {
    return this.longitude
  }

  getLatitude() {
    return this.latitude
  }
}
