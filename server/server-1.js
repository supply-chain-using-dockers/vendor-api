require('./config/config')


const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const _ =require('lodash')

var { place_order } =require('./models/place-order')
var {mongoose} = require('./db/mongoose');


var app=express();
app.use(bodyParser.json());

app.post('/place_order',(req,res)=>{
    console.log(req.body);

    var place_order = new place_order({
        amount : req.body.text ,
        batches : req.body.completed,
        component : req.body.completedAt,
        componentType : req.body.completedAt,
        expectedDate : req.body.completedAt,
        price : req.body.completedAt,
        quantity : req.body.completedAt,
        supplier : req.body.completedAt

    })
   // amount
    // batches
    // component  str
    // componentType  str
    // expectedDate date
    // price
    // quantity
    // supplier str
    place_order.save().then((data)=>{
        console.log(data)
        res.send(data)
    },(error)=>{
        console.log(error)
        res.status(400).send(e)
    })
})

app.get('/place_order',(req,res)=>{
    place_order.find().then((data)=>{
        res.send({data});
    },(e)=>{
        res.status(400).send(e);
    })
})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})