document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const faders = document.querySelectorAll('.card, .profile, .skills, .experience, .education, .projects, .certifications, .references');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Carousel functionality
const carouselSlide = document.querySelector('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let counter = 0;

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.skill-card');
    const totalSlides = slides.length;
    
    if (direction === 'next') {
        counter = (counter + 1) % totalSlides;
    } else if (direction === 'prev') {
        counter = (counter - 1 + totalSlides) % totalSlides;
    }
    
    const size = slides[0].clientWidth;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

prevBtn.addEventListener('click', () => moveCarousel('prev'));
nextBtn.addEventListener('click', () => moveCarousel('next'));

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

carouselSlide.addEventListener('mousedown', startDrag);
carouselSlide.addEventListener('mouseup', endDrag);
carouselSlide.addEventListener('mouseleave', endDrag);
carouselSlide.addEventListener('mousemove', dragMove);

carouselSlide.addEventListener('touchstart', startDrag);
carouselSlide.addEventListener('touchend', endDrag);
carouselSlide.addEventListener('touchmove', dragMove);

function startDrag(event) {
    isDragging = true;
    startPosition = getPositionX(event);
    carouselSlide.classList.add('grabbing');
}

function endDrag() {
    isDragging = false;
    carouselSlide.classList.remove('grabbing');
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100) {
        moveCarousel('next');
    } else if (movedBy > 100) {
        moveCarousel('prev');
    } else {
        carouselSlide.style.transform = `translateX(${prevTranslate}px)`;
    }
}

function dragMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
        carouselSlide.style.transform = `translateX(${currentTranslate}px)`;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}
