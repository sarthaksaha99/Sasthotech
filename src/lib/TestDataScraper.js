import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const headers = {
    "authority": "www.populardiagnostic.com",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "accept-language": "en-US,en;q=0.7",
    "cache-control": "max-age=0",
    "cookie": "cf_chl_2=7eb6497b1d8c331; cf_clearance=n1NNOLzy8SgMVYkqaY3lSOguvh8Wf5rfz.ox2eJ4pUU-1685972825-0-160; XSRF-TOKEN=eyJpdiI6ImJNdUlCQXhGUUNQUVl5OThiMGRcL1B3PT0iLCJ2YWx1ZSI6IkJ2d29PcE9wUWlcL2EyaERjTHVRSTBuOVwvcXZoQURKVThwWGFhR2FLZUhkelhBUXlTMEdGRkpZSXUyWmpyU01PViIsIm1hYyI6Ijg1YTc3ZTliMTQ3MzdlOTk3MDczMGY1OWVkM2NmM2UxZmEzNTU1ZDFmODZhOWYwMDFiMmIzYTRmNzRmN2NiOGUifQ%3D%3D; laravel_session=eyJpdiI6ImF5UGtXOTQyQU9FSFlId3g3VXZxcUE9PSIsInZhbHVlIjoidFBGTmJxQmk5XC9pZVwvcTIzNHlvakExK3RVT0pIZU1DWlRSSHhWN0g3SHNiaXRLdm9sRDB0RHdmNnpPRGVmN25EIiwibWFjIjoiMDBiZjg5MmE0NTI1ZGQ5ODY3NDcyNGY4YWI5OGEzZjZkMjM0NWVhZjNjYzBiMjdkNDYyOWQzYTJhNGEwMWU1YyJ9",
    "sec-ch-ua": '"Brave";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Linux"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "sec-gpc": "1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
}


export default class TestDataScraper {
    constructor(baseURI) {
        this.baseURI = baseURI;
    }

    async fetchDom(url) {
        // Fetch the data
        const response = await fetch(url, {headers});

        const body = await response.text();

        // Convert to dom
        const dom = new JSDOM(body);

        return dom;
    }

    // Get Get test list 
    async testList(dom) {
        const tests = dom.window.document.querySelectorAll('tbody');

        const data = [];
        tests.forEach(test => {
            console.log("test");
            data.push({
                name: test.children[1].innerHTML,
                price: test.children[2].children[0].innerHTML
            });
        });

        return data;
    }

    // Get Test Data
    async scrape() {
        const dom = await this.fetchDom(`${this.baseURI}/our-price-list/1/15`);

        const testList = this.testList(dom);

        return testList;
    }
}