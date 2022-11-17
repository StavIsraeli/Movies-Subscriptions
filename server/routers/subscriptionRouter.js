const express = require('express')
const router = express.Router();
const SubscriptionBL = require('../models/Subscription/subscriptionBL')


router.route('/')
    .get(async function(req, resp)
    {
      if(req.query != null && (req.query.movieId != null || req.query.memberId != null))
      {
          if(req.query.movieId != null)
          {
            let movieId = req.query.movieId;
            let data =  await SubscriptionBL.getSubByMovieId(movieId);
            return resp.json(data)
          }

          else if(req.query.memberId != null)
          {
            let memberId = req.query.memberId;
            let data =  await SubscriptionBL.getSubByMemberId(memberId);
            return resp.json(data)
          }
        
      }
      else
      {
        let data =  await SubscriptionBL.getAllSubscriptions();
        return resp.json(data)
      }
    })

router.route('/:id')
    .get( async function(req,resp)
    {
        let id = req.params.id;
        let data = await SubscriptionBL.getSubscription(id);
        return resp.json(data);    
    })

router.route('/')
    .post( async function(req,resp)
    {
        let obj = req.body;
        let status = await SubscriptionBL.addSubscription(obj);
        return resp.json(status);    
    })

router.route('/:id')
    .put( async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;

        let status = await SubscriptionBL.updateSubscription(id,obj);
        return resp.json(status);    
    })

router.route('/:id')
    .delete( async function(req,resp)
    {
        let id = req.params.id;

        let status = await SubscriptionBL.deleteSubscription(id);
        return resp.json(status);    
    })


module.exports = router;
