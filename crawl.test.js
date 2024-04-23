import {expect,test} from "bun:test";
const { normalizeURL } = require('./crawl.js');

test('Cases from boot.dev work out',
    () => {
        expect(normalizeURL("https://blog.boot.dev/path/")).toBe('blog.boot.dev/path');
        expect(normalizeURL("https://blog.boot.dev/path")).toBe('blog.boot.dev/path');
        expect(normalizeURL("http://blog.boot.dev/path/")).toBe('blog.boot.dev/path');
        expect(normalizeURL("http://blog.boot.dev/path")).toBe('blog.boot.dev/path');
    })
test('My own edge cases',
    () => {
        // expect(normalizeURL('asdfksajhdf/asdks/')).toBe('asdfksajhdf/asdks');
    })
