const cryptKeys = require('../middleware/cryptKeys')

module.exports = {
    newMemo: async (req,res) => {
        const db = req.app.get('db')
        const { title,category } = req.body
        var body = cryptKeys.encrypt(req.body.body)
        const memo = await db.docs.new_memo([body,title,category])
        return res.status(200).send(memo[0])
    },

    getDocs: async (req,res) => {
        const db = req.app.get('db')
        const docs = await db.docs.get_all_memos()
        cryptKeys.decrypt(docs)
        return res.status(200).send(docs)
    },

    editMemo: async (req,res) => {
        const { memo_id,title,category } = req.body
        const db = req.app.get('db')
        var body = cryptKeys.encrypt(req.body.body)
        const memo = await db.docs.edit_memo([body,title,category,memo_id])
        return res.status(200).send(memo)
    },

    deleteMemo: async (req,res) => {
        const { memo_id } = req.params
        const db = req.app.get('db')
        const memo = await db.docs.delete_memo([memo_id])
        return res.status(200).send(memo)
    },

    // --- Encrypt all items - this is not a toy --- //
    encryptAll: async (req,res) => {
        const db = req.app.get('db')
        const docs = await db.docs.get_all_memos()
        var newDocs = cryptKeys.encryptAllText(docs)

        const addToDb = async (input) => {
            const { body,title,category,memo_id } = input
            const memo = await db.docs.edit_memo([body,title,category,memo_id])
            return
        }

        newDocs.forEach(element => {
            addToDb(element)
        });

        return
    },

    getSpecDocs: async (req,res) => {
        const db = req.app.get('db')
        const doc = await db.docs.get_spec_docs()
        return res.status(200).send(doc)
    },

    writeSpecDoc: async (req,res) => {
        const { memo_id,body,category,num_mark,title } = req.body
        const db = req.app.get('db')
        const doc = db.docs.update_spec_doc([memo_id,body,category,num_mark,title])
        return res.status(200).send(doc)
    }
}