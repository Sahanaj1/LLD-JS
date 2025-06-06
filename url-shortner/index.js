import URLRepository from "./UrlRepository.js";
import URLShortenerService from "./UrlShortnerService.js";


const repo = new URLRepository();
const shortener = new URLShortenerService(repo);

// Try shortening multiple different URLs
const url1 = "https://example.com/page1";
const url2 = "https://example.com/page2";
const url3 = "https://example.com/page3";

const short1 = shortener.shorten(url1);
const short2 = shortener.shorten(url2);
const short3 = shortener.shorten(url3);

console.log("Shortened:", short1, short2, short3);
console.log("Redirected URL1:", shortener.redirect(short1));
console.log("Redirected URL2:", shortener.redirect(short2));
console.log("Redirected URL3:", shortener.redirect(short3));

