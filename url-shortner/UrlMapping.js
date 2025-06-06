class URLMapping {
    constructor(shortCode, longURL, createdAt = new Date()) {
        this.shortCode = shortCode;
        this.longURL = longURL;
        this.createdAt = createdAt;
    }
}

export default URLMapping;
