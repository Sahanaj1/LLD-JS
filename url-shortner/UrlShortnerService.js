class URLShortenerService {
    constructor(repository) {
        this.repository = repository;
        this.baseDomain = "https://short.ly/";
    }

    shorten(longURL) {
        const mapping = this.repository.save(longURL);
        return this.baseDomain + mapping.shortCode;
    }

    redirect(shortURL) {
        const shortCode = shortURL.replace(this.baseDomain, "");
        const mapping = this.repository.find(shortCode);
        return mapping ? mapping.longURL : null;
    }
}

export default URLShortenerService;
