const Movie = require('./movieModel');
const Subscription = require('../Subscription/subscriptionModel');

const getAllMovies = function()
{
    return new Promise((resolve,reject) =>
    {
        Movie.find({}, function(err, data)
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

const getMovieByName = (name) =>
{
    return new Promise((resolve, reject) =>
    {
    
        // Select * from products where name == name
        Movie.find({ "name" : {$regex : "^" + name }} , function(err, data)
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



const getMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findById(id, function(err, data)
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



const addMovie = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        
        let movie = new Movie({

            name : obj.name,
            premiered : obj.premiered,
            genres : obj.genres,
            image : obj.image
            
        });
        

       movie.save(function(err)
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


const updateMovie = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {

        Movie.findByIdAndUpdate(id,{

            name : obj.name,
            premiered : obj.premiered,
            genres : obj.genres,
            image : obj.image

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


const deleteMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {

        Movie.findByIdAndDelete(id, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                Subscription.deleteMany({movieId : id }, function(err)
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




module.exports = {getMovieByName,getAllMovies, getMovie, addMovie, updateMovie, deleteMovie};