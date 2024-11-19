'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const clone = carousel.innerHTML; // Клонируем содержимое
    carousel.innerHTML += clone; // Добавляем его в конец
});