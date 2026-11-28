// =========================
// МОДУЛЬ ДИАЛОГОВ
// Обёртка над Tauri Dialog API с фолбэком на
// стандартный window.confirm для запуска в браузере
// =========================

export async function confirmDialog(message, title) {
    // Внутри Tauri (tauri dev) доступен глобальный API
    if (window.__TAURI__?.dialog) {
        return window.__TAURI__.dialog.confirm(message, {
            title: title,
            kind: "warning"
        });
    }

    // В обычном браузере
    return window.confirm(message);
}
