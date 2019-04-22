require('./config/config')


const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const _ =require('lodash')

var { place_order } = require('./models/place-order')
var {mongoose} = require('./db/mongoose');
var { Demand } =require('./models/skf-demand')
var { Delay } =require ('./models/delay')
var {ColorTracking}=require('./models/color-tracking');
var {Inventory} = require ('./models/inventory')
var { RawOrders } =require('./models/raw-material-order')

var app=express();
app.use(bodyParser.json());


/// DATE FUNCTIONS
    function transportdate(date){
        var today = new Date()
        return today.setDate(date-10)
    }
    function productiondate(date){
        var today = new Date()
        return today.setDate(date.getDate()-70)
    }
    function vendordate(date){
        var today = new Date()
        return today.setDate(date.getDate()-80)
    }
    function rawmaterialorderDate(date){
        var today = new Date()
        return today.setDate(date.getDate()-80)
    }

  var a =  transportdate("12/02/2019");
  console.log(a)

/// DATE FUNCTIONS

///                         PLACEORDER

app.post('/place-order',(req,res)=>{
    // console.log(req.body);
    var body = _.pick(req.body , ['amount','batches','component','componentType','expectedDate','price','quantity','supplier', 'deliveryMode' ])
    
    // console.log("hi")
    var data1=new place_order(body) 

    data1.save().then((d)=>{
        // console.log(d)
        res.send(d)
    },(error)=>{
        console.log(error)
        res.status(400).send(e)
    })
})

app.get('/place-order',(req,res)=>{
     console.log('working')
    place_order.find().then((data)=>{
        res.send({data});
    },(e)=>{
        res.status(400).send(e);
    })
})

app.delete('/place-order',(req,res)=>{
    place_order.deleteMany({}).then((data)=>{
        res.send('delete successful')
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})

app.get('/place-order/:supplier',(req,res)=>{
    var name = req.params.supplier

    place_order.find({supplier: name}).then((data)=>{
        res.send(data)
    },(e)=>{
        res.sendStatus(400).send(e)
    })

})

/////     PLACEORDER


/////   DEMAND

app.get('/demand', (req,res)=>{
    Demand.find().then((data)=>{
        res.send({data});
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})


app.get('/demand/:component', (req,res)=>{
    var component = req.params.component;

    Demand.find({Component:component}).then((data)=>{
        res.send(data)
    },(e)=>{
        res.sendStatus(400).send(e)
    })
} )
app.post('/demand',(req, res)=>{
    var body = _.pick(req.body , ['Supplier','Component', 'yvolume','frequency','Mode','placeorderdate','replleadtime','callofidt','date'])

    var demand =new Demand(body)

    demand.save().then((d)=>{
        // console.log(d)
        // res.send(d)
        var delay=Delay({
            supplier: d.supplier,
            component : d.component,
            expectedDate : d.date,
            placeOrderToRawMaterial:{
                date : rawmaterialorderDate(d.date),
            }, 
            startSubvendor : {
                date : vendordate(d.date),
            } ,
            startProduction : {
                date : productiondate(d.date),
            },
            startTransport : {
                date : transportdate(d.date)
            }

            
        })
        delay.save().then((d)=>{
            console.log(d)
            res.send(d)
        },(e)=>{
            res.sendStatus(400).send(e)
        })

        res.send(d)

        // res.send()
    },(e)=>{
        res.sendStatus(400).send(e)
    })

    
})
app.delete('/demand',(req,res)=>{
    Demand.deleteMany({}).then((d)=>{
        console.log(d)
        res.send("delete successful!!!!")   
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})

/// DEMAND


/////   DELAY

app.get('/delay' ,(req,res)=>{
      Delay.find().then((d)=>{
          console.log(d)
          res.send(d)
      })  
    },(e)=>{
        res.sendStatus(400).send(e)
    })
app.post('/delay' , (req,res)=>{
    var body = _.pick(req.body,["supplier","component","formDate","expectedDate"])

    var delay = new Delay(body)

    delay.save().then((d)=>{
        console.log(d)
        res.send(d)
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})


////// DELAY

///// COLOR TRACKING

app.post('/color-track',(req,res)=>{
    var body = _.pick(req.body,['compno','compname','comptype','quantity','supplyname','rt','frequency','cssinvent'])

    var color = new ColorTracking(body)

    color.save().then((d)=>{
        res.send(d)
    },(e)=>{
        
        res.sendStatus(400).send(e)
    })
})
app.get('/color-track',(req,res)=>{
    ColorTracking.find().then((d)=>{
        res.send(d)
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})

app.delete('/color-track',(req,res)=>{
    ColorTracking.deleteMany().then((d)=>{
        res.send(d)
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})
app.get('/color-track/:componentName' , (req,res)=>{
    var name =  req.params.componentName
    // var type =  req.params.componentType

    ColorTracking.find({compno : name }).then((d)=>{
        res.send(d)
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})

///// COLOR TRACKING

///// INVENTORY


app.post('/inventory',(req,res)=>{
    var body=_.pick(req.body,[ 'Component', 'ComponentType','quantity'])

    var inventory = new Inventory(body)

    inventory.save().then((d)=>{
        res.send(d)
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})

app.get('/inventory',(req,res)=>{
    Inventory.find().then((d)=>{
        res.send(d)
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})

app.get('/inventory/:component/:type',(req,res)=>{
    var c=req.params.component
    var t=req.params.type
    Inventory.find({Component : c ,ComponentType: t }).then((d)=>{
        res.send(d)

    },(e)=>{
        res.sendStatus(400).send(e)
    })
})
///// INVENTORY


//// RAW MATERIAL
app.post('/raw-material-order',(req,res)=>{
    var body = _.pick(req.body,['componentType','quantity','price' ,'totalamount' , 'expectedDate'])

    var order = new RawOrders(body)
    order.save().then((d)=>{
        res.send(d)
    },(e)=>{
        res.sendStatus(400).send(e)
    })
})

app.get('/raw-material-order',(req,res)=>{
    RawOrders.find().then((d)=>{
        res.send(d)
    },(e)=>{
        res.sendStatus.send(e)
    })
})
//// RAW MATERIAL
const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})