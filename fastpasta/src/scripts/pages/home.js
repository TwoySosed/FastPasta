import { createUUID } from "../modules/utils.js";
import { tags } from "../modules/utils.js";

const notes = [
    {
        id: 1,
        title: "Идеи для приложения",
        content: "Добавить систему тегов",
        type: "Идеи",
        tags: [ tags[1].id] // Используем IDs тегов из массива tags
    },
    {
        id: 2,
        title: "Жанры музыки",
        content: "Рэп, Джаз, Металл",
        type: "Музыка",
        tags: [tags[2].id, tags[3].id] // Используем IDs тегов из массива tags
    },
    {
        id: 3,
        title: "Идеи для свиданий",
        content: "Пойти в кино, сходить на прогулку, приготовить ужин вместе",
        type: "Идеи",
        tags: [tags[4].id, tags[5].id] // Используем IDs тегов из массива tags
    }
];

function getTagById(tagId) {
    return tags.find(function (tag) {
        return tag.id === tagId;
    });
}

function renderNoteTags(note) {
    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("note-tags");

    note.tags.forEach(function (tagId) {
        const tag = getTagById(tagId);

        if (!tag) return;

        const tagElement = document.createElement("span");
        tagElement.classList.add("note-tag");
        tagElement.style.backgroundColor = tag.color;
        tagElement.title = tag.name;

        tagsContainer.appendChild(tagElement);
    });

    return tagsContainer;
}

function renderNoteCard(note) {
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");

    const title = document.createElement("h3");
    title.textContent = note.title;

    const content = document.createElement("p");
    content.textContent = note.content;

    // Нижняя панель: теги и категория
    const footer = document.createElement("div");
    footer.classList.add("note-footer");

    const noteTags = renderNoteTags(note);

    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent = note.type;

    footer.append(noteTags, category);

    // Всплывающее меню
    const toolbar = document.createElement("div");
    toolbar.classList.add("note-toolbar");

    const editButton = document.createElement("button");
    editButton.classList.add("note-action");
    editButton.textContent = "✎";
    editButton.title = "Редактировать";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("note-action");
    deleteButton.textContent = "×";
    deleteButton.title = "Удалить";

    toolbar.append(editButton, deleteButton);

    noteCard.append(title, content, footer, toolbar);

    return noteCard;
}

function renderNotes(notes) {
    const notesContainer = document.getElementById("pageContent");

    // Очищаем контейнер
    notesContainer.replaceChildren();

    const notesGrid = document.createElement("div");
    notesGrid.classList.add("notes-grid");

    const addNoteButton = document.createElement("div");
    addNoteButton.classList.add("note-card", "add-note-button");
    addNoteButton.textContent = "+";

    notesGrid.appendChild(addNoteButton);

    notes.forEach(function (note) {
        const noteCard = renderNoteCard(note);
        notesGrid.appendChild(noteCard);
    });

    notesContainer.appendChild(notesGrid);
}

 export function initHome() {
    renderNotes(notes);
}