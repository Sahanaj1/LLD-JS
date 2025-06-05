class Theatre {
    constructor(id,name, location){
        this.id = id; // Unique identifier for the theatre
        this.name = name; // Name of the theatre
        this.location = location; // Location of the theatre, can be used for finding nearby theatres or movies
        this.shows = []; // Array to hold movies currently showing at the theatre
    }

    addShow(movie) {
        this.shows.push(movie); // Add a movie to the list of shows at the theatre
    }

    getShowsByMovie(movieId){
        return this.shows.filter(show=> show.movie.id=== movieId); // Filter shows by movie ID
    }
}

export default Theatre; // Export the Theatre class for use in other modules