module.exports = {
    newMemo: async (req,res) => {},

    getDocs: async (req,res) => {
        const db = req.app.get('db')
        const docs = await db.docs.get_all_memos()
        return res.status(200).send(docs)
    },

    editMemo: async (req,res) => {
        const { memo_id,body,title } = req.body
        const db = req.app.get('db')
        const memo = await db.docs.edit_memo([body,title,memo_id])
        return res.status(200).send(memo)
    },

    deleteMemo: async (req,res) => {}
}