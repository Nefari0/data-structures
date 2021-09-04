const bcrypt = require('bcrypt')

module.exports = {
    register: async (req,res) => {
        const { first_name,last_name,email,password } = req.body
        const db = req.app.get('db')
        const result = await db.auth.get_user([email]) 
        const existingUser = result[0]
        if (existingUser) {
            return res.status(409).send('This email is being used by another user')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt)
        const registeredUser = await db.auth.register_user([first_name,last_name,email,hash])
        const user = registeredUser[0]
        // console.log('this is user',user)

        req.session.user = {
            firstName:user.first_name,
            lastName:user.last_name,
            email:user.email,
            id:user.user_id,
            isAdmin:user.is_admin,
            auth:isAuthenticated
        }
        return res.status(201).send(req.session.user)
    },

    login: async (req,res) => {
        const { email,password } = req.body
        const db = req.app.get('db')
        const foundUser = await db.auth.get_user([email])
        const user = foundUser[0];
        if (!user) {
            return res.status(401).send("user not found")
        }
        const isAuthenticated = bcrypt.compareSync(password,user.hash);
        if (!isAuthenticated) {
            return res.status(403).send("Incorrect Password")
        }

        req.session.user = {
            firstName:user.first_name,
            lastName:user.last_name,
            email:user.email,
            id:user.user_id,
            isAdmin:user.is_admin,
            auth:isAuthenticated
        }
        return res.status(200).send(req.session.user)
    },

    logout: async (req,res) => {
        req.session.destroy();
        return res.status(200)
    }
}