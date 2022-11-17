const User = require('./userModel')


const getUser = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        User.findById(id, function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
} 





const authentication = (obj) =>
{
    return new Promise((resolve, reject) =>
    {
        User.findOne({username : obj.username, password : obj.password}, function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })

    })
}




module.exports = {getUser,authentication}