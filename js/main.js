const header = document.querySelector('.header');
const headerHeight = header.clientHeight;
// определение темы
document.querySelector('.themetoggle').addEventListener('click', (e) => {
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.removeItem('theme');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    addDarkClassToHTML();
});

function addDarkClassToHTML() {
    try {
        const slideOnHome = document.querySelector('.slide-main-slider');
        const main = document.querySelector('main');

        let link = document.getElementById("theme-link");
        let lightTheme = "css/theme-light.css";
        let darkTheme = "css/theme-dark.css";
        let currTheme = link.getAttribute("href");
        let theme = "";

        if (window.innerWidth > 1023.98) {
            main.style.paddingTop = headerHeight + "px";
        }

        if (localStorage.getItem('theme') === 'dark') {
            document.querySelector('html').classList.add('dark');
            link.setAttribute("href", darkTheme);
            theme = "dark";
            if (slideOnHome && window.innerWidth > 1023.98) {
                const headerBackground = document.querySelector('.header__background');
                headerBackground.style.display = "none";
                main.style.paddingTop = 0;
            }
        } else {
            document.querySelector('html').classList.remove('dark');
            link.setAttribute("href", lightTheme);
            theme = "light";
            if (slideOnHome && window.innerWidth > 1023.98) {
                main.style.paddingTop = headerHeight + "px";
            }
        }
        console.log(theme);
    } catch (err) {}
}
addDarkClassToHTML();
// добавление кнопок
let listUl = document.querySelectorAll('.menu__sub-list');
listUl.forEach(function (item, i, listUl) {
    if (item) {
        item.insertAdjacentHTML("afterbegin", '<div class="menu__sub-list-back _icon-arrow-r">Назад</div>');
        item.parentElement.insertAdjacentHTML("beforeend", '<div class="menu__button-sub-open _icon-arrow-r"></div>');
    };
});

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slider__item');
    const sliderMain = document.getElementById('slider-main');
    const sliderNews = document.getElementById('slider-news');

    if (sliderMain && slides.length > 1) {
        // инициализация слайдера
        let slider = new SimpleAdaptiveSlider('#slider-main', {
            loop: true,
            autoplay: false,
            swipe: true,
        });
    }

    if (slides.length <= 1) {
        let controls = document.querySelector('.slider__controls');
        controls.style.display = "none";
    }

    if (window.innerWidth < 1365.98) {
        if (sliderNews && slides.length > 1) {
            // инициализация слайдера
            let slider = new SimpleAdaptiveSlider('#slider-news', {
                autoplay: true,
                interval: 10000,
            });
        }
    }
});

// выпадающее меню
document.querySelector('.menu__body').addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.parentElement;
    const subMenuList = parentElement.querySelector('.menu__sub-list');
    if (targetElement.classList.contains('menu__button-sub-open')) {
        if (parentElement && subMenuList) {
            closeAllSubMenu(subMenuList);
            subMenuList.classList.toggle('_open');
            parentElement.classList.toggle('_hover');
        }
    }

    if (targetElement.classList.contains('menu__sub-list-back') && !targetElement.closest('menu__item')) {
        targetElement.parentNode.classList.remove('_open');
    }
})
document.querySelector('.menu').onmouseleave = closeAllSubMenu;

function closeAllSubMenu(current = null) {
    let parents = [];
    if (current) {
        let currentParent = current.parentNode;
        while (currentParent) {
            if (currentParent.classList.contains('menu__list')) break;
            if (currentParent.nodeName === 'UL') parents.push(currentParent);
            currentParent = currentParent.parentNode;
        }
    }
    const subMenu = document.querySelectorAll('.menu__sub-list');
    // проверка родителей
    subMenu.forEach(item => {
        if (item != current && !parents.includes(item)) {
            item.classList.remove('_open');
            item.parentElement.classList.remove('_hover');
        }
    });
}
// SubMenu
function SubMenu() {
    const windowWidth = document.documentElement.clientWidth;
    let subMenu = document.querySelectorAll('.menu__sub-list');
    subMenu.forEach(function (item, i, subMenu) {
        let left = item.getBoundingClientRect().left;
        let width = item.clientWidth;
        let check = left + width;

        if (windowWidth < check) {
            ;
            item.classList.add('_left');
        };
    });
}
SubMenu();
//закрыть/открыть меню 
const iconMenu = document.querySelector(".burger");
const menu = document.querySelector('.menu__list');
const search = document.querySelector('.search-menu__form');
document.addEventListener('click', function (e) {
    const target = e.target;
    const its_btnMenu = target == iconMenu || iconMenu.contains(target);
    const its_menu = target == menu || menu.contains(target);
    const its_search = target == search || search.contains(target);
    const menu_is_active = document.documentElement.classList.contains("menu-open");

    if (!its_menu && !its_btnMenu && !its_search && menu_is_active) {
        document.documentElement.classList.toggle("menu-open");
    }
});
//
window.onload = function () {
    document.addEventListener('click', documentActions);

    //Actions делегирование события click
    function documentActions(e) {
        const targetElement = e.target;
        if (targetElement.classList.contains('search-menu__icon')) {

            document.querySelector('.search-menu').classList.toggle('_active');
            document.documentElement.classList.add('search-open');

            // закрыть если проскролил
            document.addEventListener("windowScroll", function (e) {
                const startPoint = 0;
                const scrollTop = window.scrollY;
                if (scrollTop >= startPoint) {
                    document.querySelector('.search-menu').classList.remove('_active');
                    document.documentElement.classList.remove('search-open');
                }
            })

        } else if (!targetElement.closest('.form-search') && document.querySelectorAll('.search-open')) {

            document.querySelector('.search-menu').classList.remove('_active');
            document.documentElement.classList.remove('search-open');

        }

        // кнопка контактов
        const btnContacts = document.querySelector('.button-contacts-header');
        const numberContacts = document.querySelector('.contacts-block__call')
        const contacts = document.querySelector('.contacts');

        if (btnContacts.contains(e.target) || numberContacts.contains(e.target)) {
            const windowWidth = document.documentElement.clientWidth;
            const btnRight = btnContacts.getBoundingClientRect().right;
            const btnBottom = btnContacts.getBoundingClientRect().bottom;
            const right = windowWidth - btnRight;
            if (window.innerWidth > 767.98 && window.innerWidth < 1023.98) {
                contacts.style.top = btnBottom + 20 + "px";
                contacts.style.right = right + "px"
            } else if (window.innerWidth > 1023.98) {
                contacts.style.top = btnBottom + 35 + "px";
                contacts.style.right = right + "px"
            }

            document.documentElement.classList.toggle("contacts-open");
            if (window.innerWidth < 767.98) {
                if (document.querySelector(".menu-open")) {
                    document.documentElement.classList.remove("menu-open");
                    document.querySelector('.menu__body').onmouseleave = closeAllSubMenu;
                }
            }

        } else if (!targetElement.closest('.contacts') && document.querySelectorAll('.contacts-open') || targetElement.closest('.call-back')) {
            document.documentElement.classList.remove("contacts-open");
        }
    }
}
//language
let buttons = document.querySelectorAll(".language-header__item");
for (let button of buttons) {
    button.addEventListener('click', function () {
        buttons.forEach(i => {
            i.classList.remove('language-header__item_active')
        });
        this.classList.toggle('language-header__item_active');
        console.log(this.dataset.language);
    });
};


// активный пункт меню по ссылке
let menuRoot = document.querySelectorAll('.menu__list>li>a');
Array.from(menuRoot).forEach(function (item, i, menuRoot) {
    const items = item.parentNode.querySelectorAll('.menu__item');

    let rLoc = document.location.pathname;
    let lLoc = item.attributes.href.nodeValue;

    Array.from(items).forEach(function (subitem, i, items) {
        let lLoc = subitem.firstElementChild.attributes.href.nodeValue;
        if (rLoc.match(lLoc)) {
            return item.parentNode.classList.add('_active');
        }
    })

    if (rLoc.match(lLoc)) {
        item.parentNode.classList.add('_active');
    }
});
