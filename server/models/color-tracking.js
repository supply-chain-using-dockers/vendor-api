var mongoose = require('mongoose')
var ColorTracking=mongoose.model('ColorTracking',{
    compno :{
        type : Number,
    },
    compname : {
        type : String,
    },
    comptype : {
        type: String,
    },
    quantity:{
        type: Number, 
    },
    supplyname:{
        type : String,
    },
    rt:{
        type: Number,
    },
    frequency : {
        type: Number
    },
    cssinvent:{
        type: Number
    }
})

module.exports={ColorTracking}