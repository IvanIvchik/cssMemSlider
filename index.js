"use strick"

const slides = document.querySelectorAll('.slide');
const inscriptions = document.querySelectorAll('.inscription');
const controls = document.querySelectorAll('.controls');
const controlsBtn = document.querySelectorAll('.btn-control');

let index = 0;
let isEnabled = true;
let isMousemove = true;

function changeIndex(n) {
    index = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
    isEnabled = false;
    startAnimationHideSlide(direction);
    controlsBtn[index].classList.remove('active');
    endAnimationHideSlide(direction);
}

function showSlide(direction) {
    startAnimationShowSlide(direction);
    endAnimationShowSlide(direction);
    isEnabled = true;
    controlsBtn[index].classList.add('active');
    controlsBtn[index].classList.remove('focus');
    isMousemove = true;
}

function startAnimationHideSlide(direction) {
    slides[index].classList.add(direction);
    inscriptions[index].classList.add(direction);
}

function endAnimationHideSlide(direction) {
    slides[index].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    });
    inscriptions[index].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    });
}

function startAnimationShowSlide(direction) {
    slides[index].classList.add('next', direction);
    inscriptions[index].classList.add('next-inscription', direction);
}

function endAnimationShowSlide(direction) {
    slides[index].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('active');
    });
    inscriptions[index].addEventListener('animationend', function () {
        this.classList.remove('next-inscription', direction);
        this.classList.add('active');
    });
}

controls.forEach(function (item, indexBullet) {
    item.addEventListener('click', function () {
        if (isEnabled) {
            if (index > indexBullet) {
                hideSlide('to-right');
                changeIndex(index - (index - indexBullet));
                showSlide('from-left');
            }
            if (index < indexBullet) {
                hideSlide('to-left');
                changeIndex(index + (indexBullet - index));
                showSlide('from-right');
            }
        }
    });
});

controlsBtn.forEach(function (e) {
    e.addEventListener('mousedown', function () {
        this.classList.add('focus');
        isMousemove = false;
        this.parentNode.classList.remove('focus-controls');
    });
});

controls.forEach(function (e) {
    e.addEventListener('mouseover', function () {
        if (isMousemove) this.classList.add('focus-controls');
    })
})

controls.forEach(function (e) {
    e.addEventListener('mouseout', function () {
        this.classList.remove('focus-controls');
    })
})

controls.forEach(function (e) {
    e.addEventListener('touchstart', function () {
        if (isMousemove) this.classList.add('focus-controls');
    })
})

controls.forEach(function (e) {
    e.addEventListener('touchmove', function () {
        if (isMousemove) this.classList.add('focus-controls');
    })
})

controls.forEach(function (e) {
    e.addEventListener('touchend', function () {
        this.classList.remove('focus-controls');
    })
})
