document.addEventListener('DOMContentLoaded', () => {
    // Бургер-меню для мобильной версии
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Функция переключения меню
    burger.addEventListener('click', () => {
        // Переключение класса для навигации
        nav.classList.toggle('nav-active');
        
        // Анимация отдельных ссылок
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Анимация бургера
        burger.classList.toggle('toggle');
    });
    
    // Плавная прокрутка к секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню после клика
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Анимация появления элементов при прокрутке
    const appearOptions = {
        threshold: 0.15,
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
    
    // Применяем наблюдатель к элементам, которые должны анимироваться
    document.querySelectorAll('.character-card, .gallery-item, .plot-text p').forEach(element => {
        element.classList.add('fade-in');
        appearOnScroll.observe(element);
    });
    
    // Добавляем класс для фиксированной навигации при прокрутке
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Анимация для элементов с классом fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    document.querySelectorAll('.appear').forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    });
});

// Добавляем стили для фиксированной шапки
document.head.insertAdjacentHTML('beforeend', `
    <style>
        header.sticky {
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .appear {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);
