const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const app = express();
const PORT = 3000;

// Habilita CORS para permitir solicitudes desde cualquier origen
app.use(cors()); // Usar CORS como middleware

// Middleware para manejar JSON
app.use(express.json());

// Datos en memoria
let items = [
    { id: 1, name: 'Cereal' },
    { id: 2, name: 'Leche' },
    { id: 3, name: 'Queso' },
    { id: 4, name: 'Mantequilla' }
];

// **GET**: Obtener todos los elementos
app.get('/api/items', (req, res) => {
    res.json(items);
});

// **GET**: Obtener un elemento por ID
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = items.find(i => i.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Elemento no encontrado' });
    }
});

// **POST**: Crear un nuevo elemento
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1, // Generar ID
        name: req.body.name // Obtener el nombre del cuerpo de la solicitud
    };
    items.push(newItem);
    res.status(201).json(newItem); // Responder con el nuevo elemento creado
});

// **PUT**: Actualizar un elemento por ID
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex !== -1) {
        items[itemIndex] = { id, name: req.body.name }; // Actualizar el elemento
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: 'Elemento no encontrado' });
    }
});

// **DELETE**: Eliminar un elemento por ID
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1); // Eliminar el elemento
        res.json(deletedItem[0]); // Responder con el elemento eliminado
    } else {
        res.status(404).json({ message: 'Elemento no encontrado' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
