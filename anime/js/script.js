document.addEventListener('DOMContentLoaded', () => {
    // Инициализация переменных для работы со страницей
    const menuToggle = document.querySelector('.menu-toggle'); // Кнопка мобильного меню
    const navLinks = document.querySelector('.nav-links'); // Навигационные ссылки
    const header = document.getElementById('header'); // Элемент шапки сайта
    const backToTop = document.getElementById('backToTop'); // Кнопка "наверх"
    const animElements = document.querySelectorAll('.plot-point, .character-card, .gallery-item'); // Элементы для анимации
    
    // Обработчик для мобильного меню (открытие/закрытие)
    menuToggle.addEventListener('click', () => {
        // Переключаем активное состояние для кнопки меню
        menuToggle.classList.toggle('active');
        // Переключаем активное состояние для навигационных ссылок (показываем/скрываем меню)
        navLinks.classList.toggle('active');
    });
    
    // Обработчик для закрытия меню при клике на любую ссылку в меню
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Убираем активное состояние с кнопки меню
            menuToggle.classList.remove('active');
            // Скрываем мобильное меню
            navLinks.classList.remove('active');
        });
    });
    
    // Обработчик события прокрутки страницы
    window.addEventListener('scroll', () => {
        // Если страница прокручена вниз более чем на 50px, добавляем класс 'scrolled' к шапке
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Иначе убираем класс 'scrolled' с шапки
            header.classList.remove('scrolled');
        }
        
        // Управление видимостью кнопки "наверх"
        if (window.scrollY > 300) {
            // Если прокрутка более 300px, показываем кнопку
            backToTop.classList.add('active');
        } else {
            // Иначе скрываем кнопку
            backToTop.classList.remove('active');
        }
        
        // Запуск анимации элементов при прокрутке до них
        animElements.forEach(el => {
            // Получаем позицию элемента относительно верха экрана
            const elPos = el.getBoundingClientRect().top;
            // Если элемент вошел в область видимости (с небольшим отступом для улучшения UX)
            if (elPos < window.innerHeight - 100) {
                // Делаем элемент видимым
                el.style.opacity = '1';
                // Убираем смещение по Y, чтобы элемент "всплыл" на экране
                el.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Настройка плавной прокрутки для всех ссылок-якорей (ссылок с символом # в начале)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            // Предотвращаем стандартное поведение ссылки
            e.preventDefault();
            // Находим целевой элемент, на который ссылается якорь
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                // Получаем высоту шапки сайта (для корректной прокрутки)
                const headerHeight = header.offsetHeight;
                // Вычисляем позицию для прокрутки с учетом высоты шапки
                const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                // Выполняем плавную прокрутку к целевому элементу
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth' // Обеспечивает плавную анимацию прокрутки
                });
            }
        });
    });
    
    // Инициализация начального состояния для анимации элементов
    animElements.forEach(el => {
        // Устанавливаем начальную прозрачность
        el.style.opacity = '0';
        // Устанавливаем начальное смещение по Y
        el.style.transform = 'translateY(20px)';
        // Задаем параметры перехода для анимации
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Запускаем анимацию элементов, видимых при загрузке страницы (с небольшой задержкой)
    setTimeout(() => {
        animElements.forEach(el => {
            // Проверяем, находится ли элемент в видимой области
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                // Делаем элемент видимым
                el.style.opacity = '1';
                // Убираем смещение по Y
                el.style.transform = 'translateY(0)';
            }
        });
    }, 300); // Задержка в 300 мс для более плавного появления после загрузки страницы
});