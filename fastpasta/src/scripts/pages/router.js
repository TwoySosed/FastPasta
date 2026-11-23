import { initHome } from "./home.js";
import { initSearch } from "./search.js";
import { initStats } from "./stats.js";
import { initNotes } from "./notes.js";
import { initSettings } from "./settings.js";

const routes = {
    home: initHome,
    search: initSearch,
    stats: initStats,
    notes: initNotes,
    settings: initSettings
};

export function navigateTo(page) {
    const route = routes[page];

    if (!route) return;

    const pageContent = document.getElementById("pageContent");
    pageContent.replaceChildren();

    route();

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(function (item) {
        item.classList.remove("active");

        if (item.dataset.page === page) {
            item.classList.add("active");
        }
    });
}