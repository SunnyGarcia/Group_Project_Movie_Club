module.exports = (app) =>{
    app.get("/api/healthcheck",(req, res) => {
        res.json({msg:"Route is good."})
    });
}