const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');
async function main() {
    let args = process.argv.slice(2);
    if (args.length != 1) {
        throw Error('Submit a website to search on')
    }
    let baseURL = args[0];
    console.log(`Started scraping from the base URL: ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);
}

main()