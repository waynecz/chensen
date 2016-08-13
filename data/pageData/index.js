var _ = require('lodash');
var data = {
    carouselLists: [
        {href: '/', img: 'imgs/1.jpg', alt: ''},
        {href: '/', img: 'imgs/2.jpg', alt: ''},
        {href: '/', img: 'imgs/3.jpg', alt: ''},
        {href: '/', img: 'imgs/4.jpg', alt: ''}
    ],
    caselLists: [
        {href: '/', name: '1', alt: ''},
        {href: '/', name: '2', alt: ''},
        {href: '/', name: '3', alt: ''},
        {href: '/', name: '4', alt: ''},
        {href: '/', name: '5', alt: ''},
        {href: '/', name: '6', alt: ''},
    ],
    partnerLists: [
        {href: '/', name: '1', alt: ''},
        {href: '/', name: '2', alt: ''},
        {href: '/', name: '3', alt: ''},
        {href: '/', name: '4', alt: ''},
        {href: '/', name: '5', alt: ''},
        {href: '/', name: '6', alt: ''},
    ]
};

 module.exports = _.assign(data, require('./head_foot'));