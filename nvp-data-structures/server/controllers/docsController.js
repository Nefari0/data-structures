module.exports = {
    newMemo: async (req,res) => {
        const db = req.app.get('db')
        const { body,title } = req.body
        const memo = await db.docs.new_memo([body,title])
        return res.status(200).send(memo[0])
    },

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

    deleteMemo: async (req,res) => {
        const { memo_id } = req.params
        const db = req.app.get('db')
        const memo = await db.docs.delete_memo([memo_id])
        return res.status(200).send(memo)
    }
}