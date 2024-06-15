const pool = require('../Config/db');

const createTypeTaux = async (type, taux) => {
    try {
        const res = await pool.query(
            'INSERT INTO typetaux (type, taux) VALUES ($1, $2) RETURNING *',
            [type, taux]
        );
        console.log('Insertion réussie :', res.rows[0]);
        return res.rows[0];
    } catch (error) {
        console.error('Erreur lors de l\'insertion dans la base de données :', error);
        throw error;
    }
};

const getTypeTauxList = async () => {
    try {
        const res = await pool.query(
            'SELECT * FROM typetaux'
        );
        return res.rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des taux :', error);
        throw error;
    }
};

const deleteTypeTaux = async (id) => {
    try {
        const res = await pool.query(
            'DELETE FROM typetaux WHERE id = $1 RETURNING *',
            [id]
        );
        if (res.rowCount === 0) {
            throw new Error(`Aucun type de taux trouvé avec l'ID ${id}`);
        }
        console.log(`Suppression réussie du type de taux avec l'ID ${id}`);
        return res.rows[0];
    } catch (error) {
        console.error(`Erreur lors de la suppression du type de taux avec l'ID ${id} :`, error);
        throw error;
    }
};
const updateTypeTaux = async (id, type, taux) => {
    try {
        const res = await pool.query(
            'UPDATE typetaux SET type = $1, taux = $2 WHERE id = $3 RETURNING *',
            [type, taux, id]
        );
        if (res.rowCount === 0) {
            throw new Error(`Aucun type de taux trouvé avec l'ID ${id}`);
        }
        console.log(`Mise à jour réussie du type de taux avec l'ID ${id}`);
        return res.rows[0];
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du type de taux avec l'ID ${id} :`, error);
        throw error;
    }
};
const getTypeTauxById = async (id) => {
    try {
        const res = await pool.query(
            'SELECT * FROM typetaux WHERE id = $1',
            [id]
        );
        if (res.rows.length === 0) {
            throw new Error(`Aucun type de taux trouvé avec l'ID ${id}`);
        }
        return res.rows[0];
    } catch (error) {
        console.error(`Erreur lors de la récupération du type de taux avec l'ID ${id} :`, error);
        throw error;
    }
};
module.exports = {
    createTypeTaux,
    getTypeTauxList,
    deleteTypeTaux,
    getTypeTauxById,
    updateTypeTaux
};
