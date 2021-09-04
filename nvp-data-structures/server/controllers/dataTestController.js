
module.exports = {
    getData: async (req,res) => {
        const index = 1
        const db = req.app.get('db')
        const data = await db.testdata.get_testdata();
        console.log(data[0])
        return res.status(200).send(data)
    }
}