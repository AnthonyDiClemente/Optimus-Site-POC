from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import ssl


def main() -> None:
    project_root = Path(__file__).resolve().parent
    cert_dir = project_root / "certs"
    cert_file = cert_dir / "localhost-cert.pem"
    key_file = cert_dir / "localhost-key.pem"
    port = 8443

    handler = SimpleHTTPRequestHandler
    server = ThreadingHTTPServer(("localhost", port), handler)
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=str(cert_file), keyfile=str(key_file))
    server.socket = context.wrap_socket(server.socket, server_side=True)

    print(f"Local HTTPS site running at https://localhost:{port}")
    print(f"Serving files from {project_root}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
