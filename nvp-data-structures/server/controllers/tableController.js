module.exports = {
    getNames: async (req,res) => {
        const { table_name } = req.body
        console.log('hit controller',req.body)
        const db = req.app.get('db')
        const names = await db.get_column_names([table_name])
        return res.status(200).send(names)
    } 
}