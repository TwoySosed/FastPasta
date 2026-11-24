// =========================
// МОДУЛЬ ТЕМЫ
// =========================
const STORAGE_KEY = "theme";

// Получение текущей темы
export function getTheme() {
    return document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
}

// Установка темы
export function setTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
    }

    localStorage.setItem(STORAGE_KEY, getTheme());
    updateSelectedOption();
}

// Подсветка выбранного кружка
function updateSelectedOption() {
    const currentTheme = getTheme();

    document.querySelectorAll(".theme-option").forEach(function (option) {
        option.classList.toggle(
            "selected",
            option.dataset.theme === currentTheme
        );
    });
}
// =========================
// ИНИЦИАЛИЗАЦИЯ
// =========================
export function initTheme() {
    // Восстанавливаем сохранённую тему (по умолчанию — тёмная)
    setTheme(localStorage.getItem(STORAGE_KEY) || "dark");

    document.querySelectorAll(".theme-option").forEach(function (option) {
        option.addEventListener("click", function () {
            setTheme(option.dataset.theme);
        });
    });
}
