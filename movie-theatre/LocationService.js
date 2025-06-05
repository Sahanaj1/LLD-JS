class LocationService {
  constructor(theatres) {
    this.theatres = theatres;
  }

  getTheatresByLocation(location) {
    return this.theatres.filter(theatre=>theatre.location === location);
  }

}

export default LocationService;