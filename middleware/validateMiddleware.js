module.exports = (req, res, next) =>{
    if(req.files == null || req.body.title == null || req.body.message == null){
        res.redirect('/posts/new')
    }
    next()
}