const express = require('express')
const router = express.Router();
const MemberBL = require('../models/Member/memberBL')
const jwt = require('jsonwebtoken');
require('dotenv').config()



router.route('/')
    .get(async function(req, resp)
    {
        const token = req.headers['x-access-token'];
        if (!token) 
         {
            return resp.status(401).json('No Token Provided');
          }


          jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, async (err, data) => {
            if (err) {
              return resp.status(500).json('Failed to authenticate token');
            }
            data =  await MemberBL.getAllMembers();
            return resp.json(data)
            })
    })

router.route('/:id')
    .get( async function(req,resp)
    {
        let id = req.params.id;
        let data = await MemberBL.getMember(id);
        return resp.json(data);    
    })

router.route('/')
    .post( async function(req,resp)
    {
        let obj = req.body;
        let status = await MemberBL.addMember(obj);
        return resp.json(status);    
    })

router.route('/:id')
    .put( async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;

        let status = await MemberBL.updateMember(id,obj);
        return resp.json(status);    
    })

router.route('/:id')
    .delete( async function(req,resp)
    {
        let id = req.params.id;

        let status = await MemberBL.deleteMember(id);
        return resp.json(status);    
    })


module.exports = router;
