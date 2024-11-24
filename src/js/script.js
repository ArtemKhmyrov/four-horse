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

/* Слайдер с карточками */


document.addEventListener("DOMContentLoaded", () => {
    const initSlider = () => {
        const container = document.querySelector(".steps__container");
        const slides = Array.from(container.children);
        const paginationDots = Array.from(document.querySelectorAll(".steps__circle"));
        const btnPrev = document.querySelector(".arrow__prev");
        const btnNext = document.querySelector(".arrow__next");

        const slidePositions = [
            "translateX(0)",    // Показывает 1 и 2 элемент
            "translateX(-100%)", // Показывает 3 элемент
            "translateX(-200%)", // Показывает 4 и 5 элемент
            "translateX(-300%)", // Показывает 6 элемент
            "translateX(-400%)", // Показывает 7 элемент
        ];

        let currentIndex = 0;

        // Обновление состояния слайдера
        const updateSlider = () => {
            container.style.transform = slidePositions[currentIndex];
            container.style.transition = "transform 0.6s ease";

            // Убираем и добавляем активные классы для точек пагинации
            paginationDots.forEach((dot) => dot.classList.remove("_active"));
            paginationDots[currentIndex].classList.add("_active");

            // Управляем состоянием кнопок
            btnPrev.classList.toggle("_disabled", currentIndex === 0);
            btnNext.classList.toggle("_disabled", currentIndex === slidePositions.length - 1);
        };

        // Переключение на предыдущий слайд
        btnPrev.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex -= 1;
                updateSlider();
            }
        });

        // Переключение на следующий слайд
        btnNext.addEventListener("click", () => {
            if (currentIndex < slidePositions.length - 1) {
                currentIndex += 1;
                updateSlider();
            }
        });

        // Переключение слайдов по точкам пагинации
        paginationDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSlider();
            });
        });

        updateSlider();
    };

    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            initSlider();
        }
    };

    checkScreenSize();

    let sliderInitialized = false;

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 768 && !sliderInitialized) {
            initSlider();
            sliderInitialized = true;
        } else if (window.innerWidth > 768 && sliderInitialized) {
            sliderInitialized = false;
        }
    });
});



// Слайдер с участниками

document.addEventListener("DOMContentLoaded", function () {
    const sliderWrap = document.querySelector(".employees__slider-wrap");
    const slides = Array.from(sliderWrap.children);
    const btnLeft = document.querySelector(".arrow__left");
    const btnRight = document.querySelector(".arrow__right");
    const counter = document.querySelector(".employees__slider-counter .current");
    const total = document.querySelector(".employees__slider-counter .total");

    let slideWidth = slides[0].offsetWidth + 20; // Размер одного слайда
    let slidesPerView = window.innerWidth <= 768 ? 1 : 3; // Количество слайдов на экране
    let currentIndex = 0;
    let timer;

    // Функция для обновления количества слайдов и ширины
    const updateSlideSettings = () => {
        slidesPerView = window.innerWidth <= 768 ? 1 : 3;
        slideWidth = slides[0].offsetWidth + 20;
        total.textContent = Math.ceil(slides.length / slidesPerView);
        moveSlider();
    };

    const updateButtons = () => {
        btnLeft.classList.toggle("_disabled", currentIndex === 0);
        btnRight.classList.toggle("_disabled", currentIndex >= slides.length - slidesPerView);
    };

    const moveSlider = () => {
        sliderWrap.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        counter.textContent = Math.ceil(currentIndex / slidesPerView) + 1;
        updateButtons();
    };

    const resetTimer = () => {
        clearInterval(timer);
        timer = setInterval(() => {
            currentIndex = (currentIndex + slidesPerView) % slides.length;
            moveSlider();
        }, 4000);
    };

    btnRight.addEventListener("click", () => {
        if (currentIndex < slides.length - slidesPerView) {
            currentIndex += slidesPerView;
            moveSlider();
            resetTimer();
        }
    });

    btnLeft.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex -= slidesPerView;
            moveSlider();
            resetTimer();
        }
    });

    // Обновляем настройки при изменении размера окна
    window.addEventListener("resize", updateSlideSettings);

    // Инициализация
    updateSlideSettings();
    resetTimer();
});


/* Хук для рендеринга новых заголовков в мобильной версии */

function updateHelperTextOnMobile() {
    const helperText = document.querySelector('.helper__text');
    const helperTitle = document.querySelector('.helper__picture');
    if (!helperText) return;

    const span = helperText.querySelector('span');
    const h2 = helperText.querySelector('h2');

    if (window.innerWidth <= 768) {
        h2.textContent = `Чтобы поддержать Международный васюкинский турнир`;
        span.remove();
        const helperPicture = document.querySelector('.helper__picture');

        if (helperPicture) {
            const newHtml = `
                <div class="helper__hook-text">
                    <span>посетите лекцию на тему: </span>
                    <span>«Плодотворная дебютная идея»</span>
                </div>
            `;
            helperPicture.insertAdjacentHTML('afterend', newHtml);
        }
    }
}

window.addEventListener('resize', updateHelperTextOnMobile);
document.addEventListener('DOMContentLoaded', updateHelperTextOnMobile);
