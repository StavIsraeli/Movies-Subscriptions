const Member = require('./memberModel');
const Subscription = require('../Subscription/subscriptionModel');

const getAllMembers = function()
{
    return new Promise((resolve,reject) =>
    {
        Member.find({}, function(err, data)
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


const getMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Member.findById(id, function(err, data)
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



const addMember = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        
        let member = new Member({

            name : obj.name,
            email : obj.email,
            city : obj.city
            
        });
        

        member.save(function(err)
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


const updateMember = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {

        Member.findByIdAndUpdate(id,{

            name : obj.name,
            email : obj.email,
            city : obj.city

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


const deleteMember= function(id)
{
    return new Promise((resolve,reject) =>
    {

        Member.findByIdAndDelete(id, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                Subscription.deleteMany({memberId : id }, function(err)
                {
                    if(err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve('Deleted!');
                    }
                })

                
            }
        });
    })
}




module.exports = {getAllMembers, getMember, addMember, updateMember, deleteMember};