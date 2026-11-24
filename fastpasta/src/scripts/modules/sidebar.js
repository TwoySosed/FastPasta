// =========================
// МОДУЛЬ САЙДБАРА
// =========================
export function initSidebar() {
    const sidebar = document.querySelector("#sidebar");
    const collapseBtn = document.querySelector("#collapseBtn");

    // Сворачивание сайдбара
    collapseBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });
}
