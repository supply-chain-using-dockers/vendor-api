var mongoose = require('mongoose')
var data = new Date()


var Demand = mongoose.model('Demand',{
   
    Supplier: {
        type : String,
        required : true ,
       },
    Component : { 
        type: String,
        required : true,
        trim : true,
    },
    comptype : { 
        type: String,
        required : true,
        trim : true,
    },
    yvolume : {
        type : Number,
        required : true ,
        // trim:true   
    },
    frequency:{
        type : Number,
        required : true ,
        // trim:true,
    },
    
    Mode:{
        type : String,
        required : true ,
        trim:true,
    },
    placeorderdate : {
        type: String,
        default : data.getDate()+'-'+data.getMonth()+'-'+data.getFullYear() ,
        trim :true,
        required : true
    },
    replleadtime : {
        type : Number,
        required : true ,
    },
    callofidt : {
        type : Number,
        required : true ,
    },
    date : {
        type : String,
        required : true ,
    },
    


    
})

module.exports = { Demand }

// demand_estimation : {

//     qty : Number,
//     comp_name : String ,
//     comp_type : String,
//     mode_of_delivery: String,
//     month:String,
//     year:Number
// },
