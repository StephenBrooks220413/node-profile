const flash = require("connect-flash/lib/flash")

module.exports = (req, res) => {
    // res.render('register', {
    //     errors: flash('validationErrors')
    // })
    var username = ""
    var password = ""
    const data = req.flash('data')[0]

    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render('register', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
}