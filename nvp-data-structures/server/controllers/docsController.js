module.exports = {
    getDocs: async (req,res) => {
        const db = req.app.get('db')
        const docs = await db.docs.getAll()
        return res.status(200).send(docs)
    }
}