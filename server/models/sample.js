var mongoose = require('mongoose')

var demand_estimation = mongoose.model('demand_estimation',{
    qty : {
        type : String,
        required : true ,
        trim : true
    },
    comp_name : {
        type : Boolean,
        default : false
    },
    comp_type : {
        type : Number , 
        default : null
    }
})

module.exports = { Sample }

