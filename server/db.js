const mongoose = require('mongoose');

const connectedDb = (connectionUrl) =>{
   return mongoose.connect(connectionUrl)
}

module.exports = connectedDb