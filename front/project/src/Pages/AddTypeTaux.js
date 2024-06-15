import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import Button from '../Components/Button'; // Assurez-vous d'importer le composant Button depuis le bon chemin

const AddTypeTaux = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [type, setType] = useState('');
    const [taux, setTaux] = useState('');
    const [typeError, setTypeError] = useState('');
    const [tauxError, setTauxError] = useState('');

    const schema = z.object({
        type: z.string().nonempty(),
        taux: z.string().regex(/^\d+(\.\d{1,2})?$/).nonempty(),
    });

    useEffect(() => {
        if (id) {
            fetchTypeTaux();
        }
    }, [id]);

    const fetchTypeTaux = async () => {
        try {
            const response = await fetch(`/typetaux/${id}`);
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération du type de taux avec l'ID ${id}`);
            }
            const data = await response.json();
            setType(data.type);
            setTaux(data.taux);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            schema.parse({ type, taux });

            const url = id ? `/typetaux/${id}` : '/typetaux/add';
            const method = id ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, taux })
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de ${id ? 'la modification' : 'l\'ajout'} du type de taux`);
            }

            const responseData = await response.json();
            console.log(responseData.message);
            setType('');
            setTaux('');
            navigate('/typetaux');
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleTypeChange = (value) => {
        setType(value);
        validateType(value);
    };

    const handleTauxChange = (value) => {
        setTaux(value);
        validateTaux(value);
    };

    const validateType = (value) => {
        try {
            schema.pick({ type: true }).parse({ type: value });
            setTypeError('');
        } catch (error) {
            setTypeError(error.errors[0]?.message || 'Erreur de validation');
        }
    };

    const validateTaux = (value) => {
        try {
            schema.pick({ taux: true }).parse({ taux: value });
            setTauxError('');
        } catch (error) {
            setTauxError(error.errors[0]?.message || 'Erreur de validation');
        }
    };

    return (
        <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-4">
                    <label className="block text-white-700 text-sm font-bold mb-2">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => handleTypeChange(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {typeError && <p className="text-red-500 text-xs italic">{typeError}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-white-700 text-sm font-bold mb-2">Taux (format numérique)</label>
                    <input
                        type="text"
                        value={taux}
                        onChange={(e) => handleTauxChange(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {tauxError && <p className="text-red-500 text-xs italic">{tauxError}</p>}
                </div>
                <Button
                    type="submit"
                    label={id ? 'Modifier' : 'Ajouter'}
                    className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
            </form>
            <Button
                onClick={() => navigate('/typetaux')}
                label="Annuler"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
        </div>
    );
};

export default AddTypeTaux;
