import {JSDOM} from 'jsdom';
import fetch from 'node-fetch';


export default class DoctorDataScraper {
    constructor(baseURI) {
        this.rajdocURL = baseURI;
    } 

    async fetchDom(url) {
        // Fetch the specialists data
        const response = await fetch(url);
        const body = await response.text();

        // Convert to dom
        const dom = new JSDOM(body);

        return dom;
    }

    // Parse the types of doctors
    parseDoctorCategory(dom) {
        const categories = dom.window.document.querySelectorAll("#post > div a");

        const data = [];
        categories.forEach(categoryLink => {
            data.push({
                name: categoryLink.children[0].innerHTML,
                link: categoryLink.href
            });
        });

        return data;
    }

    // Parse doctor lists from a category
    parseDoctorList(dom, specialist) {
        const categories = dom.window.document.querySelectorAll("#posts > div a");

        const data = [];
        categories.forEach(categoryLink => {
            data.push({
                specialist,
                link: categoryLink.href,
                image: categoryLink.children[0].src,
                name: categoryLink.children[1].childNodes[0].data,
                designation: categoryLink.children[1].children[1].innerHTML,
                division: 'rajshahi'
            });
        });

        return data;
    }

    // Get Doctor list from list of categories
    async doctorList(categories) {
        const doctorListDoms = await Promise.all(categories.map(category => {
            return this.fetchDom(category.link);
        }));

        let doctorList = [];

        doctorListDoms.forEach((doctorListDom, i) => {
            const doctors = this.parseDoctorList(doctorListDom, categories[i].name);

            doctorList = doctorList.concat(doctors);
        });
        
        return doctorList;
    }

    // Get Doctor Data
    async scrape() {
        const dom =  await this.fetchDom(`${this.rajdocURL}/specialists`);

        const doctorCategories =  this.parseDoctorCategory(dom);
        const doctorList  = this.doctorList(doctorCategories);


        return doctorList;
    }
}