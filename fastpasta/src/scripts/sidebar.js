// =========================
// ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ
// =========================
const sidebar = document.querySelector("#sidebar");
const collapseBtn = document.querySelector("#collapseBtn");
const menuItems = document.querySelectorAll(".menu-item");
const lightThemeBtn = document.querySelector("#lightTheme");
const darkThemeBtn = document.querySelector("#darkTheme");
// =========================
// СВОРАЧИВАНИЕ САЙДБАРА
// =========================
collapseBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
});
// =========================
// ПЕРЕКЛЮЧЕНИЕ АКТИВНОГО ПУНКТА
// =========================
menuItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
        event.preventDefault();
        menuItems.forEach(function (menuItem) {
            menuItem.classList.remove("active");
        });
        item.classList.add("active");
    });
});
// =========================
// ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
// =========================
function setTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light-theme");
        lightThemeBtn.classList.add("selected");
        darkThemeBtn.classList.remove("selected");
    } else {
        document.body.classList.remove("light-theme");
        darkThemeBtn.classList.add("selected");
        lightThemeBtn.classList.remove("selected");
    }
}
// Светлая тема
lightThemeBtn.addEventListener("click", function () {
    setTheme("light");
});
// Тёмная тема
darkThemeBtn.addEventListener("click", function () {
    setTheme("dark");
});
// =========================
// НАЧАЛЬНАЯ ТЕМА
// =========================
setTheme("dark");