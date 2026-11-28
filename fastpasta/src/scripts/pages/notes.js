export function initNotes() {
    const pageContent = document.getElementById("pageContent");

    const title = document.createElement("h1");
    title.textContent = "Заметки";

    pageContent.appendChild(title);
}