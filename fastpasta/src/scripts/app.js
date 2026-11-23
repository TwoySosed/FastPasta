import { navigateTo } from "./pages/router.js";

export function initApp() {
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            navigateTo(item.dataset.page);
        });
    });

    navigateTo("home");
}