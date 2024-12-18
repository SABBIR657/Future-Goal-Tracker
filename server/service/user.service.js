const User = require('../models/User.model')
const error = require('../utils/error')

const findUsers = () =>{
    return User.find();
}

const findUserByProperty = (key, value) =>{
    if(key === '_id'){
        return User.findById(value);
    }
    return User.findOne({[key]:value})
}

const createNewUser = ({name, email, password})=>{
    const user  = new User({
        name,
        email,
        password
    })

    return user.save();
}

const updateUser = async(id, data) =>{
    const user = await findUserByProperty('email', data.email)
    if(user){
        
        throw error('user already exists', 400)
    }

    return User.findOneAndUpdate(id, {...data}, {new: true})
}

module.exports = {
    findUsers,findUserByProperty, createNewUser, updateUser
}