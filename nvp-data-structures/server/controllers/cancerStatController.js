
module.exports = {
    getAllStats: async (req,res) => {
        const db = req.app.get('db')
        const stats = await db.cancer.get_cancer_all()
        let totalNumber = stats.length
        console.log('total number',totalNumber)
        return res.status(200).send(stats)
    },

    addToDatabase: async (req,res) => {
        const { id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithelial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses } = req.body
        console.log('from controller',id)
        const db = req.app.get('db')
        newStat = await db.cancer.add_cancer([id,clump_thickness,uniformity_of_cell_size,uniformity_of_cell_shape,marginal_adhesion,single_epithelial_cell_size,bare_nuclei,bland_chromatin,normal_nuceoli,mitoses])
        return res.status(200).send(newStat)
    },

    oneResult: async (req,res) => {
        const db = req.app.get('db')
        result = await db.cancer.get_one()
        return res.status(200).send(result)
    }
}