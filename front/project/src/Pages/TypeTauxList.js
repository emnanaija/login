import React, { useState, useEffect } from 'react';

const TypeTauxList = () => {
    const [typeTauxList, setTypeTauxList] = useState([]);

    useEffect(() => {
        fetchTypeTauxList();
    }, []);

    const fetchTypeTauxList = async () => {
        try {
            console.log("Fetching type taux list...");
            const response = await fetch('/typetaux');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des taux');
            }
            const data = await response.json();
            console.log("Type taux list retrieved:", data);
                    setTypeTauxList(data); // Assurez-vous que cette fonction met à jour correctement typeTauxList

            setTypeTauxList(data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/typetaux/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Erreur lors de la suppression du type de taux avec l'ID ${id}`);
            }
            // Refresh the list after deletion
            fetchTypeTauxList();
        } catch (error) {
            console.error('Erreur:', error);
            // Handle error, maybe show a notification to the user
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-xl font-bold mb-4">Liste des taux</h1>
            <table className="table-auto border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-400">Types</th>
                        <th className="px-4 py-2 border border-gray-400">Taux</th>
                        <th className="px-4 py-2 border border-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {typeTauxList.map((typeTaux) => (
                        <tr key={typeTaux.id}>
                            <td className="px-4 py-2 border border-gray-400">{typeTaux.type}</td>
                            <td className="px-4 py-2 border border-gray-400">{typeTaux.taux}</td>
                            <td className="px-4 py-2 border border-gray-400">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(typeTaux.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TypeTauxList;
