// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Элементы для навигации между страницами
    const navLinks = document.querySelectorAll('.nav-menu a');
    const pages = document.querySelectorAll('.page');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    // Инициализация главной страницы
    showPage('home');
    
    // Обработка кликов по навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('.html')) {
                return; // Позволяем стандартное поведение для ссылок на файлы
            }
            
            e.preventDefault();
            
            // Получаем id страницы из href
            const pageId = this.getAttribute('href').replace('#', '');
            
            // Показываем выбранную страницу
            showPage(pageId);
            
            // Закрываем мобильное меню, если оно открыто
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Обработчик для кнопки мобильного меню
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Функция показа страницы
    function showPage(pageId) {
        // Скрываем все страницы
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Показываем выбранную страницу
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
        }
        
        // Обновляем активную ссылку в навигации
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageId}` || 
                (pageId === 'home' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
        
        // Если это страница мира, инициализируем вкладки
        if (pageId === 'world') {
            initWorldTabs();
        }
    }
    
    // Инициализация вкладок на странице мира
    function initWorldTabs() {
        const worldTabs = document.querySelectorAll('.world-tab');
        const worldTabContents = document.querySelectorAll('.world-tab-content');
        
        worldTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Убираем активный класс у всех вкладок
                worldTabs.forEach(t => t.classList.remove('active'));
                worldTabContents.forEach(c => c.classList.remove('active'));
                
                // Добавляем активный класс к выбранной вкладке
                this.classList.add('active');
                
                // Показываем соответствующий контент
                const activeContent = document.getElementById(`${tabId}-content`);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }
    
    // Инициализация эффекта печатающейся машинки для "Мысли у костра"
    const thoughtText = document.getElementById('typewriter');
    const thoughtContent = `Зона меняет не только пространство, но и память. То, что было важным "там", здесь теряет смысл. А то, что казалось незначительным, становится единственной нитью, связывающей с реальностью. Мы все здесь — эхо собственных воспоминаний.`;
    
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < thoughtContent.length) {
            thoughtText.innerHTML = thoughtContent.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            thoughtText.innerHTML = thoughtContent + ' <span class="cursor">|</span>';
        }
    }
    
    // Запускаем эффект, когда страница загружена
    setTimeout(typeWriter, 1000);
    
    // Инициализация поиска
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const modalSearchInput = document.getElementById('modalSearchInput');
    const modalSearchBtn = document.getElementById('modalSearchBtn');
    const searchModal = document.getElementById('searchModal');
    const modalClose = document.getElementById('modalClose');
    const searchResults = document.getElementById('searchResults');
    
    // Показываем модальное окно поиска при клике на поле поиска
    searchInput.addEventListener('focus', function() {
        searchModal.style.display = 'flex';
        modalSearchInput.focus();
    });
    
    searchBtn.addEventListener('click', function() {
        searchModal.style.display = 'flex';
        modalSearchInput.focus();
    });
    
    // Закрытие модального окна
    modalClose.addEventListener('click', function() {
        searchModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
        }
    });
    
    // Имитация поиска
    modalSearchBtn.addEventListener('click', performSearch);
    modalSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = modalSearchInput.value.trim();
        
        if (query === '') {
            searchResults.innerHTML = '<p class="search-placeholder">Введите запрос для поиска по архиву.</p>';
            return;
        }
        
        // Имитация результатов поиска
        searchResults.innerHTML = `
            <div class="search-result">
                <h4>Результаты поиска для: "${query}"</h4>
                <div class="result-stats">Найдено записей: 12</div>
                
                <div class="result-item">
                    <h5><a href="#">Глава 14: Эхо в Хрустальном лесу</a></h5>
                    <p>Туман сегодня особенно плотный. Он не просто скрывает очертания деревьев — он поглощает звук, свет, даже <strong>память</strong>...</p>
                    <div class="result-meta">Книга 2: Атлас Новой Реальности • 15.10.2023</div>
                </div>
                
                <div class="result-item">
                    <h5><a href="#">Мысль у костра #23</a></h5>
                    <p>Память в Зоне — ненадёжный товарищ. Она меняется, подстраивается под окружающий ландшафт. То, что помнил вчера, сегодня кажется чужим сном.</p>
                    <div class="result-meta">Мысли у костра • 05.09.2023</div>
                </div>
                
                <div class="result-item">
                    <h5><a href="#">Персонаж: "Эхо"</a></h5>
                    <p>Сталкер, потерявший память в результате встречи с аномалией "Зеркало воспоминаний". Помнит только обрывки прошлого, которые могут принадлежать не ему.</p>
                    <div class="result-meta">Карта мира / Персонажи • Статус: активен</div>
                </div>
            </div>
        `;
    }
    
    // Инициализация вкладок на странице мира при загрузке
    initWorldTabs();
    
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками и другими элементами
    document.querySelectorAll('.book-card, .archive-card, .faction-card, .location-card, .blog-post').forEach(el => {
        observer.observe(el);
    });
});