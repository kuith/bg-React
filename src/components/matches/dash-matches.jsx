import React, { useState } from 'react';
import CreateMatchModal from './CreateMatchModal';

const DashMatches = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSaveMatch = (matchData) => {
        // Logic to save match data
        console.log('Match saved:', matchData);
    };

    return (
        <div>
            <h1>Partidas</h1>
            <CreateMatchModal 
                open={modalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSaveMatch} 
            />
            {/* Add your table here */}
        </div>
    );
};

export default DashMatches;