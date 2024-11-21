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


// Слайдер с участниками

const participants = [
    { name: "Хозе-Рауль Капабланка", title: "Чемпион мира по шахматам", img: "/src/img/statick/employees.png" },
    { name: "Эммануил Ласкер", title: "Чемпион мира по шахматам", img: "/src/img/statick/employees.png" },
    { name: "Александр Алехин", title: "Чемпион мира по шахматам", img: "/src/img/statick/employees.png" },
    { name: "Арон Нимцович", title: "Чемпион мира по шахматам", img: "/src/img/statick/employees.png" },
    { name: "Рихард Рети", title: "Чемпион мира по шахматам", img: "/src/img/statick/employees.png" },
    { name: "Остап Бендер", title: "Чемпион мира по шахматам", img: "/src/img/statick/employees.png" }
];

let currentIndex = 0;
let itemsToShow = 1;
let autoSwitchInterval;

function showParticipants() {
    const sliderItems = document.querySelector('.employees__slider-items');
    sliderItems.innerHTML = ''; // Очищаем текущие элементы

    // Добавляем элементы
    for (let i = -1; i <= itemsToShow; i++) {
        const index = (currentIndex + i + participants.length) % participants.length;
        const participant = participants[index];
        const item = document.createElement('div');
        item.className = 'employees__slider-item';
        item.innerHTML = `
            <picture class="employees__slider-picture">
                <img src="${participant.img}" alt="${participant.name}">
            </picture>
            <div class="employees__slider-fio">${participant.name}</div>
            <div class="employees__slider-info">${participant.title}</div>
            <a href="#" class="employees__slider-btn">Подробнее</a>
        `;
        sliderItems.appendChild(item);
    }
}

function nextParticipant() {
    const sliderItems = document.querySelector('.employees__slider-items');
    
    // Устанавливаем анимацию ухода влево
    sliderItems.style.transition = "transform 0.4s ease";
    sliderItems.style.transform = "translateX(-100%)";

    // После завершения анимации обновляем карточки
    setTimeout(() => {
        sliderItems.style.transition = "none"; // Убираем плавность для перестановки
        currentIndex = (currentIndex + itemsToShow) % participants.length;
        showParticipants();
        sliderItems.style.transform = "translateX(0)"; // Возвращаем в исходное положение
    }, 400);

    resetAutoSwitch();
}

function prevParticipant() {
    const sliderItems = document.querySelector('.employees__slider-items');

    // Добавляем новые карточки перед текущими для анимации справа налево
    currentIndex = (currentIndex - itemsToShow + participants.length) % participants.length;
    showParticipants();

    sliderItems.style.transition = "none"; // Убираем плавность для добавления новых карточек
    sliderItems.style.transform = "translateX(-100%)"; // Перемещаем вправо для начальной позиции

    setTimeout(() => {
        sliderItems.style.transition = "transform 0.4s ease"; // Включаем плавность
        sliderItems.style.transform = "translateX(0)"; // Возвращаем в исходное положение
    }, 50); // Задержка для корректного применения анимации

    resetAutoSwitch();
}

function resetAutoSwitch() {
    clearInterval(autoSwitchInterval);
    autoSwitchInterval = setInterval(nextParticipant, 4000); 
}

function initSlider() {
    showParticipants();
    autoSwitchInterval = setInterval(nextParticipant, 4000);
}

document.addEventListener("DOMContentLoaded", initSlider);
document.querySelector('.arrow__right').addEventListener('click', nextParticipant);
document.querySelector('.arrow__left').addEventListener('click', prevParticipant);