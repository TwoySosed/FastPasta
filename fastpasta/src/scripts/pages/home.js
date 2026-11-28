import { tags } from "../modules/utils.js";
import { getNotes, addNote, deleteNote, editNote } from "../modules/notes.js";
import { confirmDialog } from "../modules/dialogs.js";

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

    const devInfo = document.createElement("p");    // ОТЛАДКА !!!!!!!!!!!
    devInfo.textContent = note.id;

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
    editButton.addEventListener("click", async function (event) {
        event.stopPropagation();

        renderEditNoteForm(note); // передаем объект заметки в функцию renderNoteForm
        renderNotes(getNotes());
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("note-action");
    deleteButton.textContent = "×";
    deleteButton.title = "Удалить";
    deleteButton.addEventListener("click", async function (event) {
    event.stopPropagation();

    const confirmed = await confirmDialog(
        "Вы действительно хотите удалить заметку?",
        "Удаление заметки"
    );

    if (!confirmed) return;

    deleteNote(note.id);
    renderNotes(getNotes());
});

    toolbar.append(editButton, deleteButton);

    noteCard.append(title, content, devInfo, footer, toolbar);

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
    addNoteButton.textContent = "+"; // карточка добавления заметки

    addNoteButton.addEventListener("click", function () {
        renderNoteForm();
    });

    notesGrid.appendChild(addNoteButton);

    notes.forEach(function (note) {
        const noteCard = renderNoteCard(note);
        notesGrid.appendChild(noteCard);
    });

    notesContainer.appendChild(notesGrid);
}

function renderNoteForm() { // рендер формы добавления заметки простой
    // контейнер модального окна
    const modal = document.createElement("div");
    modal.classList.add("note-modal");

    // форма
    const form = document.createElement("div");
    form.classList.add("note-form");

    // заголовок
    const title = document.createElement("h2");
    title.textContent = "Новая заметка (простое тестовое окно)";

    // поле названия
    const titleInput = document.createElement("input");
    titleInput.classList.add("note-input");
    titleInput.type = "text";
    titleInput.placeholder = "Название заметки";
    titleInput.required = true;

    // поле содержания
    const contentInput = document.createElement("textarea");
    contentInput.classList.add("note-textarea");
    contentInput.placeholder = "Содержание заметки";

    // контейнер кнопок
    const buttons = document.createElement("div");
    buttons.classList.add("note-form-buttons");

    // кнопка отмены
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("note-cancel-button");
    cancelButton.textContent = "Отмена";

    // кнопка создания
    const createButton = document.createElement("button");
    createButton.classList.add("note-create-button");
    createButton.textContent = "Создать";

    // добавляем кнопки
    buttons.append(cancelButton, createButton);

    // собираем форму
    form.append(title, titleInput, contentInput, buttons);
    modal.appendChild(form);

    // добавляем модальное окно на страницу
    document.body.appendChild(modal);

    // отмена
    cancelButton.addEventListener("click", function () {
        modal.remove();
    });

    // создание заметки
    createButton.addEventListener("click", function () {
        const noteTitle = titleInput.value.trim();
        const noteContent = contentInput.value.trim();

        if (!noteTitle) {
            titleInput.focus();
            return;
        }

        addNote(noteTitle, noteContent);

        modal.remove();

        renderNotes(getNotes());
    });

    titleInput.focus();
}

function renderEditNoteForm(note) { // рендер формы редактирования заметки простой
    // контейнер модального окна
    const modal = document.createElement("div");
    modal.classList.add("note-modal");

    // форма
    const form = document.createElement("div");
    form.classList.add("note-form");

    // заголовок
    const title = document.createElement("h2");
    title.textContent = "Редактирование заметки (простое тестовое окно)";

    // поле названия
    const titleInput = document.createElement("input");
    titleInput.classList.add("note-input");
    titleInput.value = note.title; // устанавливаем текущее название заметки
    titleInput.type = "text";
    titleInput.placeholder = "Название заметки";
    titleInput.required = true;

    // поле содержания
    const contentInput = document.createElement("textarea");
    contentInput.value = note.content; // устанавливаем текущее содержание заметки
    contentInput.classList.add("note-textarea");
    contentInput.placeholder = "Содержание заметки";

    // контейнер кнопок
    const buttons = document.createElement("div");
    buttons.classList.add("note-form-buttons");

    // кнопка отмены
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("note-cancel-button");
    cancelButton.textContent = "Отмена";

    // кнопка создания
    const editButton = document.createElement("button");
    editButton.classList.add("note-create-button");
    editButton.textContent = "Редактировать";

    // добавляем кнопки
    buttons.append(cancelButton, editButton);

    // собираем форму
    form.append(title, titleInput, contentInput, buttons);
    modal.appendChild(form);

    // добавляем модальное окно на страницу
    document.body.appendChild(modal);

    // отмена
    cancelButton.addEventListener("click", function () {
        modal.remove();
    });

    // редактирование заметки
    editButton.addEventListener("click", function () {
        const noteTitle = titleInput.value.trim();
        const noteContent = contentInput.value.trim();

        if (!noteTitle) {
            titleInput.focus();
            return;
        }

        editNote(note.id, noteTitle, noteContent);

        modal.remove();

        renderNotes(getNotes());
    });

    titleInput.focus();
}

 export function initHome() {
    const notes = getNotes();
    renderNotes(notes)
}