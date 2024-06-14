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
module.exports = {
    createTypeTaux,
    getTypeTauxList

};