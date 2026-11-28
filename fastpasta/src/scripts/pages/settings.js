export function initSettings() {
    const pageContent = document.getElementById("pageContent");

    const title = document.createElement("h1");
    title.textContent = "Версия 1.0.0-alpha.1";

    pageContent.appendChild(title);
}