class User {
    constructor(id, name, location){
        this.id = id; // Unique identifier for the user
        this.name = name; // Name of the user
        this.location = location; // Location of the user, can be used for finding nearby theatres or movies
    }

    setLocation(newLocation){
        this.location = newLocation; // Update the user's location
    }
}

export default User; // Export the User class for use in other modules