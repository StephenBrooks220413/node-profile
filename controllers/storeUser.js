const User = require('../models/User');
const path = require("path");

module.exports = (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..' ,'public/uploads', image.name),async(error, user)=>{
        await User.create({
            if(error){
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                return res.redirect('/auth/register')
            },
            ...req.body,
            image: '/uploads/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/auth/login')
    })
    // User.create(req.body, (error, user) => {
    //     if(error){
    //         const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
    //         req.flash('validationErrors', validationErrors)
    //         req.flash('data', req.body)
    //         return res.redirect('/auth/register')
    //     }
    //     res.redirect('/auth/login')
    // })
}
