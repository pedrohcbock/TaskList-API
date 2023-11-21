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

router.get('/:id', (req, res) => {
    const taskId = req.params.id
    db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao obter determinada tarefa' });
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

router.put('/edit/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, content } = req.body;

    db.query('UPDATE tasks SET title = ?, content = ? WHERE id = ?', [title, content, taskId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao atualizar tarefa no banco de dados' });
        } else {
            res.json({ id: taskId, title, content });
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    const taskId = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ?', [taskId], (error) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao excluir tarefa do banco de dados' });
        } else {
            res.sendStatus(204);
        }
    });
});


module.exports = router;