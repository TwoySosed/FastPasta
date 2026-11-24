import { navigateTo } from "./pages/router.js";
import { initSidebar } from "./modules/sidebar.js";
import { initTheme } from "./modules/theme.js";

export function initApp() {
    initTheme();
    initSidebar();

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            navigateTo(item.dataset.page);
        });
    });

    navigateTo("home");
}
