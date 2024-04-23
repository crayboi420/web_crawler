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
    let links = dom.window.document.getElementsByTagName('a');
    for (let i = 0; i < links.length;i++) {
        let url = links[i].getAttribute("href");
        let urlobj;
        try {
            urlobj = new URL(url);
        } catch (error) {
            urlobj = new URL(baseURL);
            urlobj.pathname = url;
        }
        urls.push(`${urlobj.protocol}//${urlobj.host}${urlobj.pathname}`);
    }
    return urls
}

async function crawlPage(baseURL, currentURL, pages) {
    
    const baseObj = new URL(baseURL);
    const currentObj = new URL(currentURL);

    if (baseObj.hostname != currentObj.hostname) return pages;

    let ncurrentURL = normalizeURL(currentURL);

    if (pages[ncurrentURL]) {
        pages[ncurrentURL]++;
        return pages;
    }
    else pages[ncurrentURL] = 1;
    // console.log(`Adding ${currentURL} to pages`);


    try {
        const response = await fetch(currentURL);
        if (!response.ok) { 
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        const urllist = getURLsFromHTML(data, baseURL);
        for (let url of urllist) {
            pages = await crawlPage(baseURL, url, pages);
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
    return pages;

}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}