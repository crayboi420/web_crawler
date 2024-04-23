const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    let urls = [];
    links = dom.window.document.getElementsByTagName('a');
    for (let i = 0; i < links.length;i++) {
        let url = links[i].getAttribute("href");
        try {
            urlobj = new URL(url);
        } catch (error) {
            urlobj = new URL(baseURL);
            urlobj.pathname = url;
        }
        urls.push(`${urlobj.protocol}//${urlobj.host}${urlobj.pathname}`);
    }
    console.log(urls);
    return urls
}

async function crawlPage(currentURL) {
    try {
        const response = await fetch(currentURL);
        if (!response.ok) { 
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}