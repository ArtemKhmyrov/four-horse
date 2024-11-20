'use strict';

const marquee = document.querySelectorAll('.marquee__item');
const container = document.querySelector('.marquee__track');

marquee.forEach((el) => {
    const clone = el.cloneNode(true);
    container.appendChild(clone);
});

const marqueeBottom = document.querySelectorAll('.marquee__item_bottom');
const containerBottom = document.querySelector('.marquee__track_bottom');

marqueeBottom.forEach((el) => {
    const clone = el.cloneNode(true);
    containerBottom.appendChild(clone);
});
