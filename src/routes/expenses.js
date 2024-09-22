const express = require('express');
const Expense = require('../models/Expense');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken)

// Crear gasto mensual
router.post('/', async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los gastos mensuales
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un gasto mensual
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, amount, date } = req.body;

    try {
        const [updated] = await Expense.update(
            { name, amount, date },
            { where: { id } }
        );

        if (updated) {
            const updatedExpense = await Expense.findOne({ where: { id } });
            return res.status(200).json({ expense: updatedExpense });
        }
        throw new Error('Gasto no encontrado');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Eliminar un gasto mensual
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Expense.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error('Gasto no encontrado');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
