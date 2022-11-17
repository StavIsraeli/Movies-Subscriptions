const express = require('express')
const router = express.Router();
const UserBL = require('../models/User/userBL')
const jwt = require('jsonwebtoken');
require('dotenv').config()



router.route('/:id')
    .get(async function(req, resp)
    {
       let id =  req.params.id;
       let data =  await UserBL.getUser(id);
       return resp.json(data)
    })

router.route('/')
    .post(async function(req, res)
    {
       //let obj =  req.body;
       //let data =  await UserBL.authentication(obj);
       //return resp.json(data)

       const obj =  req.body;
       const data =  await UserBL.authentication(obj);
       if(data)
       {
        const accessToken = jwt.sign(
            { id: data._id },
            process.env.ACCESS_SECRET_TOKEN
          );

        return res.json({ accessToken , data });
       }
       
       return res.status(401);
    })

module.exports = router;