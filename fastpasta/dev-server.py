"""Dev-сервер с отключённым кэшем.

Запуск: python3 dev-server.py [порт]
Отличие от `python3 -m http.server`: всегда шлёт Cache-Control: no-store,
браузер не кэширует файлы и после правок достаточно обычной перезагрузки.
"""
import http.server
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    server = http.server.ThreadingHTTPServer(
        ("", port), NoCacheHandler
    )
    print(f"Serving on http://localhost:{port} (cache disabled)")
    server.serve_forever()
