
module.exports = {
    getAllStats: async (req,res) => {
        const db = req.app.get('db')
        const stats = await db.cancer.get_cancer_all()
        return res.status(200).send(stats)
    },

    addToDatabase: async (req,res) => {

    }
}