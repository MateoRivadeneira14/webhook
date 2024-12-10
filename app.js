// Enviar el evento cuando se envíe el formulario
document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe de forma predeterminada

    // Obtener los valores del formulario
    const evento = document.getElementById('evento').value;
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    // Crear el objeto de evento
    const eventData = {
        evento: evento,
        nombre: nombre,
        email: email
    };

    // Enviar la solicitud POST al servidor para agregar el evento
    fetch('/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
    .then(response => response.text())
    .then(data => {
        alert('Evento creado: ' + data);  // Muestra un mensaje confirmando el evento creado
    })
    .catch(error => {
        console.error('Error al enviar el evento:', error);
    });
});

// Obtener los eventos al hacer clic en el botón
document.getElementById('get-events').addEventListener('click', () => {
    fetch('/events')
        .then(response => response.json())  // Convertir la respuesta en formato JSON
        .then(data => {
            const eventList = document.getElementById('event-list');
            eventList.innerHTML = '';  // Limpiar la lista antes de mostrar los nuevos eventos

            if (data.length > 0) {
                data.forEach(event => {
                    const listItem = document.createElement('li');
                    listItem.textContent = JSON.stringify(event);
                    eventList.appendChild(listItem);
                });
                alert('Eventos obtenidos exitosamente.');  // Notificación de éxito
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = "No hay eventos disponibles.";
                eventList.appendChild(listItem);
                alert('No hay eventos disponibles.');  // Notificación si no hay eventos
            }
        })
        .catch(error => console.error('Error al obtener eventos:', error));  // Manejo de errores
});
