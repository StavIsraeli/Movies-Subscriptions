const Subscription = require('./subscriptionModel');
const Member = require('../Member/memberModel')
const Movie = require('../Movie/movieModel')

const getAllSubscriptions = function()
{
    return new Promise((resolve,reject) =>
    {
        Subscription.find({}, function(err, data)
        {
            if(err)
            {
               reject(err)
            }
            else
            {
                 resolve(data);
            }
        })
    })
}



const getSubscription = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Subscription.findById(id, function(err, data)
        {
            if(err)
            {
               reject(err)
            }
            else
            {
                 resolve(data);
            }
        })
    })
}

const getSubByMovieId = function(movieId) 
{
    return new Promise((resolve, reject) =>
    {
        let subsWithNames= [];
        // Select * from products where name == name
        Subscription.find({ "movieId" :  movieId } , function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                let sortSubs= data;

                

                Member.find({}, function(err, data)
                    {
                        if(err)
                        {
                            reject(err);
                        }
                        else
                        {
                            let allMembers=data ;

                            sortSubs.forEach((sub)=>
                            {
                                let newSub={}
                                newSub._id = sub._id;
                                newSub.movieId = sub.movieId;
                                newSub.memberId = sub.memberId;
                                newSub.date= sub.date;
                                

                                let member = allMembers.find(x=> x._id == sub.memberId)
                            
                                
                                
                                if(member!=null)
                                {
                                    newSub.memberName= member.name;
                                }  
                                subsWithNames.push(newSub)  
                            })

                            resolve(subsWithNames)
                        }
                    })

                
                
                

                
            }
        })

        
    })
}

const getSubByMemberId = (memberId) =>
{
    return new Promise((resolve, reject) =>
    {
        let subsWithNames= [];
        // Select * from products where name == name
        Subscription.find({ "memberId" : memberId } , function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                let sortSubs= data;

                

                Movie.find({}, function(err, data)
                    {
                        if(err)
                        {
                            reject(err);
                        }
                        else
                        {
                            let allMovies=data ;

                            sortSubs.forEach((sub)=>
                            {
                                let newSub={}
                                newSub._id = sub._id;
                                newSub.movieId = sub.movieId;
                                newSub.memberId = sub.memberId;
                                newSub.date= sub.date;
                                

                                let movie = allMovies.find(x=> x._id == sub.movieId)
                            
                                
                                
                                if(movie!=null)
                                {
                                    newSub.movieName= movie.name;
                                }  
                                subsWithNames.push(newSub)  
                            })

                            resolve(subsWithNames)
                        }
                    })
            }
        })
    })
}



const addSubscription = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        
        let subscription = new Subscription({

            movieId : obj.movieId,
            memberId : obj.memberId,
            date : obj.date

        });
        

        subscription.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Created!');
            }

        })
    })
}


const updateSubscription = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {

        Subscription.findByIdAndUpdate(id,{

            movieId : obj.movieId,
            memberId : obj.memberId,
            date : obj.date

        }, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Updated!');
            }
        });
        
      
    })
}


const deleteSubscription = function(id)
{
    return new Promise((resolve,reject) =>
    {

        Subscription.findByIdAndDelete(id, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('Deleted!');
            }
        });
    })
}




module.exports = {getSubByMovieId, getSubByMemberId, getAllSubscriptions, getSubscription, addSubscription, updateSubscription, deleteSubscription};