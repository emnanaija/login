import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTypeTaux = () => {
    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [taux, setTaux] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/typetaux/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, taux })
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout du type');
            }
    
            const data = await response.json();
            console.log(data.message); // Affiche le message dans la console
            setType('');
            setTaux('');
            navigate('/typetaux'); // Naviguer vers la liste des taux après l'ajout
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleViewList = () => {
        navigate('/typetaux'); // Naviguer vers la liste des taux
    };
    
    return (
        <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-white-700 text-sm font-bold mb-2">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-white-700 text-sm font-bold mb-2">Taux</label>
                    <input
                        type="number"
                        step="0.01"
                        value={taux}
                        onChange={(e) => setTaux(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Ajouter
                </button>
            </form>
            <button onClick={handleViewList} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Voir la liste
            </button>
        </div>
    );
};

export default AddTypeTaux;
