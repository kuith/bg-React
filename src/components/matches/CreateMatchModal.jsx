import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';

const CreateMatchModal = ({ open, onClose, onSave, players, games }) => {
    const [matchData, setMatchData] = useState({ player: '', game: '', date: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMatchData({ ...matchData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(matchData);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ padding: '20px' }}>
                <h2>Crear Partida</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="player"
                        label="Jugador"
                        value={matchData.player}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="game"
                        label="Juego"
                        value={matchData.game}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="date"
                        label="Fecha"
                        type="date"
                        value={matchData.date}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </form>
            </div>
        </Modal>
    );
};

export default CreateMatchModal;