const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByProperty, createNewUser } = require('./user.service');
const error = require('../utils/error');

const registrationService = async({name, email, password}) =>{
    let user = await findUserByProperty('email', email)

    if(user){
        throw error('user already registered', 400)
        
    }

    const salt  = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)

    return createNewUser({name, email, password:hash})


}

const loginService = async({email, password}) =>{
    const user = await findUserByProperty('email', email)

    if(!user){
        throw error('invalid credentials', 400)
    }

    const isValidPassword = await bcrypt.compare(password,user.password)
    if(!isValidPassword){
        throw error('invalid credentials', 400)
    }
    const payload = {
        _id: user._id,
        name: user.name,
        email:user.email
    }

    return jwt.sign(payload, 'secret-key', {expiresIn: '2h'})
}

module.exports = {registrationService, loginService};