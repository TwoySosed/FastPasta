import { createUUID } from "./utils.js";

export function getNotes() {
    // получаем строку по ключу из localStorage
    const rawData = localStorage.getItem('fastpasta_notes');

    // преобразуем JSON-строку в массив
    const notes = rawData ? JSON.parse(rawData) : [];
    return notes;
}

export function addNote(title, content) {
    let date = new Date().toISOString();
    const notes = getNotes();
    const newNote =
        {
            title: title,
            content: content,
            id: createUUID(),
            type: "Без категории",
            tags: [],
            createdAt: date,
            updatedAt: date,
            isFavorite: false,
            isPinned: false
        }
        notes.push(newNote)
    localStorage.setItem('fastpasta_notes', JSON.stringify(notes));
}

export function deleteNote(noteId) {
    const notes = getNotes();

    const updatedNotes = notes.filter(function (note) {
        return note.id !== noteId;
    });

    localStorage.setItem("fastpasta_notes", JSON.stringify(updatedNotes));
}

export function editNote(id, newTitle, newContent) {
    const notes = getNotes();
    const noteToEdit = notes.find((note) => note.id === id);

    if (noteToEdit) {
        noteToEdit.title = newTitle;
        noteToEdit.content = newContent;
        noteToEdit.updatedAt = new Date().toISOString();

        localStorage.setItem('fastpasta_notes', JSON.stringify(notes));
    }
}