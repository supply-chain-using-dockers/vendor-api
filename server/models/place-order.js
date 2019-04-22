var mongoose = require('mongoose')
var data = new Date()
var place_order = mongoose.model('place_order',{
    amount : {
        type : Number , 
        default : null
    },
    batches : {
        type : Number ,
        default : null
    },
    component : {
        type : Number,
        required : true ,
        trim : true
    },

    componentType : {
        type : String,
        required : true ,
        trim : true
    },
    expectedDate : {
        type : String,
        required : true ,
    },
    price : {
        type : Number , 
        default : null
    },
    quantity : {
        type : Number , 
        default : null
    },
    supplier : {
        type : String,
        required : true ,
        trim : true
    },
    deliveryMode :{
        type : String,
        required : true,
        trim: true ,

    },
    orderDate : {
        type: String,
        default : data.getDate()+'-'+data.getMonth()+'-'+data.getFullYear() ,
        trim :true,
    },
    dispatchStatus : {
        type : String,
        trim : true 
    }
})

module.exports = { place_order }





// amount
// batches
// component  str
// componentType  str
// expectedDate date
// price
// quantity
// supplier str