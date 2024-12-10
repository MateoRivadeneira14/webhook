from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)

# Ruta para servir el archivo HTML desde la raíz
@app.route('/')
def serve_html():
    return send_from_directory(os.getcwd(), 'index.html')

# Ruta para servir el archivo JavaScript desde la raíz
@app.route('/app.js')
def serve_js():
    return send_from_directory(os.getcwd(), 'app.js')

# Simularemos una cola de eventos para enviar datos al frontend
event_data = []

# Ruta para recibir el webhook
@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    print("Webhook recibido:", data)

    # Guardar el evento recibido
    event_data.append(data)

    # Responder inmediatamente
    return 'Webhook recibido exitosamente', 200

# Ruta para obtener los eventos almacenados
@app.route('/events', methods=['GET'])
def get_events():
    # Devolver los datos del webhook recibidos
    return jsonify(event_data)

if __name__ == '__main__':
    app.run(debug=True)
