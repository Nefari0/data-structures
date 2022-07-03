
module.exports = {
    getLinks: async (req,res) => {
        const db = req.app.get('db')
        const links = await db.links.get_links()
        return res.status(200).send(links)
    },

    newLink: async (req,res) => {
        const { link_name,url,description } = req.body
        console.log('hit endpoint',link_name,url,description)
        const db = req.app.get('db')
        const link = await db.links.add_link([link_name,url,description])
        return res.status(200).send(link)
    },

    editLink: async (req,res) => {
        const { link_name,url,description,link_id } = req.body
        const db = req.app.get('db')
        console.log('hit backend',link_name)
        const link = await db.links.edit_link([link_name,url,description,link_id])
        return res.status(200).send(link)
    },

    deleteLink: async (req,res) => {
        const { link_id } = req.params
        console.log('hit backend',link_id)
        const db = req.app.get('db')
        const link = await db.links.delete_link([link_id])
        return res.status(200).send(link)
    }
}