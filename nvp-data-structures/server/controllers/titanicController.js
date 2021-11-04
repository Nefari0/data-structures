
module.exports = {
    getAll: async (req,res) => {
        const db = req.app.get('db')
        const passengers = await db.titanic.get_all_passengers()
        return res.status(200).send(passengers)
    }
}