var mongoose = require('mongoose')

var RawOrders = mongoose.model('RawOrders',{
    componentType:{
        type: String
    },
    quantity:{
        type : Number
    },
    price:{
        type : Number
    },
    totalamount :{
        type : Number 
    },
    expectedDate : {
        type : Date
    }

})

module.exports={
    RawOrders
}