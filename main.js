
const express = require('express');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const { Player } = require('./players');
const { validateNewPlayer } = require('./validators/playerValidators');
const migrationhelper = require('./migrationhelper') 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/players", async (req, res) => {
    try {
        let sortCol = req.query.sortCol || 'id';
        let sortOrder = req.query.sortOrder || 'ASC';

        const players = await Player.findAll({
            order: [[sortCol, sortOrder]]
        });

        res.json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/api/players', validateNewPlayer, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { name, position, jersey, team } = req.body; 

        // Create the new player
        const player = await Player.create({ name, position, jersey, team }); 
        res.status(201).json(player);
    } catch (error) {
        console.error("Error creating player:", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "Player already exists" });
        }
        res.status(500).send("Internal Server Error");
    }
});


app.get("/api/players/:userId", async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.userId);
        if (!player) {
            return res.status(404).send("Player not found");
        }
        res.json(player);
    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/api/players/:userId', async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.userId);
        if (!player) {
            return res.status(404).send("Player not found");
        }
        await player.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting player:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.put('/api/players/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, jersey, team } = req.body; 
        const player = await Player.findByPk(id);
        if (!player) {
            return res.status(404).send("Player not found");
        }
        await player.update({ name, position, jersey, team });
        res.json(player);
    } catch (error) {
        console.error("Error updating player:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
