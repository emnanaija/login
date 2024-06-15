const express = require('express');
const router = express.Router();
const TypeTaux = require('../Models/TypeTaux');

// Route pour ajouter un nouveau type de taux
router.post('/add', async (req, res) => {
    const { type, taux } = req.body;
    console.log('Type de taux ajouté avec succès:', type, taux);

    try {
        // Utilisez la fonction createTypeTaux du modèle pour insérer les données dans la base de données
        const newTypeTaux = await TypeTaux.createTypeTaux(type, taux);
        
        // Envoyez l'objet créé en réponse
        res.status(200).json({ message: 'Type et taux ajoutés avec succès', typeTaux: newTypeTaux });
    } catch (error) {
        // En cas d'erreur, envoyez une réponse d'erreur au client
        console.error('Erreur lors de l\'insertion dans la base de données:', error);
        res.status(500).json({ message: 'Erreur lors de l\'insertion dans la base de données' });
    }
});

// Route pour récupérer la liste des taux
router.get('/', async (req, res) => {
    try {
        console.log("Fetching type taux list...");
        const typeTauxList = await TypeTaux.getTypeTauxList();
        console.log("Type taux list retrieved:", typeTauxList);
        res.json(typeTauxList);
    } catch (error) {
        console.error('Erreur lors de la récupération des taux:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des taux' });
    }
});


// Route pour supprimer un type de taux spécifique
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Utilisez la fonction deleteTypeTaux du modèle pour supprimer le type de taux
        const deletedTypeTaux = await TypeTaux.deleteTypeTaux(id);
        
        // Envoyez l'objet supprimé en réponse
        res.status(200).json({ message: `Type de taux avec l'ID ${id} supprimé avec succès`, typeTaux: deletedTypeTaux });
    } catch (error) {
        // En cas d'erreur, envoyez une réponse d'erreur au client
        console.error(`Erreur lors de la suppression du type de taux avec l'ID ${id}:`, error);
        res.status(500).json({ message: `Erreur lors de la suppression du type de taux avec l'ID ${id}` });
    }
});

// Récupérer un type de taux spécifique par son ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const typeTaux = await TypeTaux.getTypeTauxById(id);
        res.json(typeTaux);
    } catch (error) {
        console.error(`Erreur lors de la récupération du type de taux avec l'ID ${id}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération du type de taux avec l'ID ${id}` });
    }
});

// Modifier un type de taux spécifique par son ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { type, taux } = req.body;
    try {
        const updatedTypeTaux = await TypeTaux.updateTypeTaux(id, type, taux);
        res.json({ message: `Type de taux avec l'ID ${id} mis à jour`, updatedTypeTaux });
    } catch (error) {
        console.error(`Erreur lors de la modification du type de taux avec l'ID ${id}:`, error);
        res.status(500).json({ message: `Erreur lors de la modification du type de taux avec l'ID ${id}` });
    }
});
// Récupérer un type de taux spécifique par son ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const typeTaux = await TypeTaux.getTypeTauxById(id);
        res.json(typeTaux);
    } catch (error) {
        console.error(`Erreur lors de la récupération du type de taux avec l'ID ${id}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération du type de taux avec l'ID ${id}` });
    }
});
module.exports = router;
