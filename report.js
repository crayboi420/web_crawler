function printReport(pages) {
    console.log('Printing report...');
    const sorted = sortPagesDesc(pages);
    for (let i = 0; i < sorted.length;i++) {
        console.log(`Found ${sorted[i][1]} interal links to ${sorted[i][0]}`);
    }
    return;
}

function sortPagesDesc(pages) {
    let sortable = [];
    for (let key in pages) {
        sortable.push([key, pages[key]]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });
    return sortable;
}

module.exports = {
    printReport,
}