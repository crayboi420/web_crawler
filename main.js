function main() {
    let args = process.argv.slice(2);
    if (args.length != 1) {
        throw Error('Submit a website to search on')
    }
    let baseURL = args[0];
    console.log(`Starting scraping from the base URL: ${baseURL}`);
}

main()