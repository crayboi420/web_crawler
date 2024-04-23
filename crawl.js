const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(url) {
    if (url.length > 6 && url.slice(0, 7) === 'http://') url = url.slice(7,);
    if (url.length > 7 && url.slice(0, 8) === 'https://') url = url.slice(8,);
    if (url.length > 1 && url[url.length - 1] === '/') url = url.slice(0, url.length - 1);
    return url
    // obj = new URL(url); 
    
    // return obj.hostname + obj.pathname
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    let urls = [];
    links = dom.window.document.getElementsByTagName('a');
    for (let i = 0; i < links.length;i++) {
        urls.push(links[i].getAttribute("href"));
        console.log(links[i].getAttribute("href"));
        
    }

    return urls
}

getURLsFromHTML('<a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>')

module.exports = {
    normalizeURL,
    getURLsFromHTML
}