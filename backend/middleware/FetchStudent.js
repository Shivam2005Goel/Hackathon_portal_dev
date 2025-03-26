var jwt = require('jsonwebtoken');
const JWT_SECRET = "studentSecret";

const fetchStudent = (req,res,next)=>{
     const authToken = req.header('auth-token');
     if(!authToken){
        return res.status(400).send({error : "Please enter the token"});
     }
     
     try {
        const data = jwt.verify(authToken,JWT_SECRET);
        req.user = data.user;
        next();
     } catch (error) {
        return res.status(400).send({error : "Please enter a valid token"});
     }
}

module.exports = fetchStudent;