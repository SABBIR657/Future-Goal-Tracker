const express = require('express');
const connectedDb = require('./db');
const routes = require('./routes/index.routes');

const app = express();

require('dotenv').config();

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 5000
const dbUrl = process.env.MONGO_URL

app.get('/', (_req, res)=>{
    const browserObject = {
        developer: "sabbir",
        email: "mdsabbirrahman2025@gmail.com"
    }
    res.json(browserObject);
})
app.use((err, req, res, next)=>{
    console.log(err);

    const message = err.message ? err.message : 'server error occurred'
    const status = err.status ? err.status : 500

    res.status(status).json({
        message
    })
})

connectedDb(dbUrl).then(()=>{
    console.log('database connection established');
    app.listen(PORT, ()=>{
        console.log(`listing on port: ${PORT}`);
        
    });
    
}).catch((err)=>{
    console.log(err);
})



//atlas-password: lifegivesyousecondchance