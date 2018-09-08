module.exports = {
    //typical controller
    //can be async if await inside
    getController(req, res) {
        res.send({
            message: 'Get Controller'
        })
    }

}