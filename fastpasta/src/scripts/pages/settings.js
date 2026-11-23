export function initSettings() {
    const pageContent = document.getElementById("pageContent");

    const title = document.createElement("h1");
    title.textContent = "Настройки";

    pageContent.appendChild(title);
}