
module.exports = {
    getAllEmployees: async (req,res) => {
        const db = req.app.get('db')
        const employees = await db.employee.get_employees_all()
        return res.status(200).send(employees)
    }
}