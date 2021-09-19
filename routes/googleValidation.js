const {OAuth2Client} = require('google-auth-library');

var express = require('express');
var router = express.Router();

/* GET Google Validation */
router.get("/", function(req,res){
    const token = req.headers.authorization;

    const client = new OAuth2Client("473959572420-7btdb25kjla5sh3dpl4c48gamt0vqmk9.apps.googleusercontent.com");

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "473959572420-7btdb25kjla5sh3dpl4c48gamt0vqmk9.apps.googleusercontent.com"
        });
        const payload = ticket.getPayload();
        // console.log('payload',JSON.stringify({"data": payload}));
        res.send(JSON.stringify({"data": payload}))
    }
    
    verify().catch((err)=>{
        return res.send({error: "Verification failed!"})
    });
    
})

module.exports = router;