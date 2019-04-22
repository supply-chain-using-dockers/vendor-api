var mongoose = require('mongoose')

var Inventory = mongoose.model('Inventory',{
    Component:{
        type :  String
    },
    ComponentType:{
        type :  String
    },
    quantity:{
        type  : Number
    }
})

module.exports={
    Inventory
}