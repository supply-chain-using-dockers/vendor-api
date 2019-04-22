var mongoose = require('mongoose')
var today = new Date()
var transportdate=new Date()
transportdate.toISOString(transportdate.setDate(today.getDate()-10));
 console.log(transportdate)
var productiondate=new Date()
productiondate.setDate(today.getDate()-70);
console.log(productiondate)
var vendordate=new Date()
vendordate.setDate(today.getDate()-80);
var rawmaterialorderDate= new Date()
rawmaterialorderDate.setDate(today.getDate()-140)


var Delay = mongoose.model('Delay',{

    supplier:{
        type : String,
        trim : true,
        required : true, 
    },
    component : {
        type : String,
        trim: true,
        required : true
    },
    formDate : {
        type : Date,
        trim : true,
        required: true,
        default : today

    },
    expectedDate : {
        type : Date,
        trim : true,
        required: true,
        // default :date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()

    },
    placeOrderToRawMaterial:{
        id : {
            type: String ,
            trim : true,
            required : true,
            default : "1"

        },
        date : {
            type : Date,
            trim : true,
            required : true,
            default :rawmaterialorderDate
        },
        TotalDelay : {
            type: Number, 
            trim : true,
            required : true,
            default:0
        }

    },
    startSubvendor : {
        id : {
            type: String ,
            trim : true,
            required : true,
            default : "2"

        },
        date : {
            type : Date,
            trim : true,
            required : true,
            default :vendordate
        },
        TotalDelay : {
            type: Number, 
            trim : true,
            required : true,
            default:0
        }

    },
    startProduction : {
        id : {
            type: String ,
            trim : true,
            required : true,
            default : "3"

        },
        date : {
            type : Date,
            trim : true,
            required : true,
            default : productiondate
        },
        TotalDelay : {
            type: Number, 
            trim : true,
            required : true,
            default:0
        }

    },
    startTransport : {
        id : {
            type: String ,
            trim : true,
            required : true,
            default : "4"

        },
        date : {
            type : Date,
            trim : true,
            required : true,
            default : transportdate
        },
        TotalDelay : {
            type: Number, 
            trim : true,
            required : true,
            default:0
        }

    }
    // amount : {
    //     type : Number , 
    //     default : null
    // },
    // batches : {
    //     type : Number ,
    //     default : null
    // },
    // component : {
    //     type : String,
    //     required : true ,
    //     trim : true
    // },

    // componentType : {
    //     type : String,
    //     required : true ,
    //     trim : true
    // },
    // expectedDate : {
    //     type : String,
    //     required : true ,
    // },
    // price : {
    //     type : Number , 
    //     default : null
    // },
    // quantity : {
    //     type : Number , 
    //     default : null
    // },
    // supplier : {
    //     type : String,
    //     required : true ,
    //     trim : true
    // },
    // deliveryMode :{
    //     type : String,
    //     required : true,
    //     trim: true ,

    // },
    // orderDate : {
    //     type: String,
    //     default : data.getDate()+'-'+data.getMonth()+'-'+data.getFullYear() ,
    //     trim :true,
    // },
    // dispatchStatus : {
    //     type : String,
    //     trim : true 
    // }
})

module.exports = { Delay }


