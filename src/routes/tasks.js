const express = require('express');
const db = require('../db/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao obter tarefas existentes' });
        } else {
            res.json(results);
        }
    });
});

router.post('/new', (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO tasks (title, content) VALUES (?, ?)', [title, content], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao adicionar nova tarefa' });
        } else {
            const newTaskID = results.insertId;
            res.status(201).json({ id: newTaskID, title, content });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    const taskId = req.params.id;
    console.log('ID da tarefa a ser excluída:', taskId);
    db.query('DELETE FROM tasks WHERE id = ?', [taskId], (error) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao excluir tarefa do banco de dados' });
        } else {
            res.sendStatus(204);
        }
    });
});


module.exports = router;