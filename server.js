const express = require('express');
const { projectrouter } = require('./Routes/projectRoutes');

const app = express()

app.use(express.json())
app.use('/project',projectrouter)


app.use((err, req, res, next)=>{
    res.json({error:err})
})


app.listen('4200',()=>{
    console.log('server running on port 4200');
})