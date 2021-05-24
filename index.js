
const express= require('express')
const mongodb= requiere('mongodb')
const MongoClient =mongodb.MongoClient
const app=express()

let db

app.use(express.static("public"))
app.use(express.urlencoded({ extended:false}))
app.use(express.json())

MongoClient.conect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true, useUnifiedTopology: true }, function(err,client){
    if(err!==null){
        console.log(err)
    }else{
        db= client.db("mesas")
    }

})//esto es para conectanos al server del cliente

app.get("/api/mesas", function (req,res){
    db.collection("mesas").find().toArray(function(error,datos){
        if(error!==null){//si se gera un error en la recepcion de datos nos muestra el error
            res.send({error:true, mensaje: "error" + err})
        }else{
            res.send({error:false, contenido: datos})//el obejto datos es elq ue luego recorreremos
        }
    })
})

app.post("/api/anyadir", function (req, res) {

    let tamaño = req.body.tamaño;  //el dato que llega ppor el body
    let color = req.body.color;  
    let material = req.body.material;
    let patas = req.body.patas
  
    let paquete = { tamoño:tamaño, color:color, material:material, patas:patas };// asi es como llamamamos 
  
  
    //mesas.push(paquete);
  
  
    //res.send("<h1>Nuevo producto añadido<h1/>");//dar feedback al usuario

    db.collection("mesas").insertOne(paquete, function(error, respuesta){//grabamoms los datos que hemos recibido
      if(error!==null){//mandamos respuesta por si va bien o mal
        console.log(error)
        res.send({error:true, mensaje: error})
      }else{
        res.send({error:false, mensaje:respuesta})
      }

    })

  })

  app.put("/api/modificar/:color", function(res,req){
    db.collection("mesas").updateMany({color: req.params.color}, {$set: {color:"Granate"}},function(error, respuesta){
      if(error!==null){//mandamos respuesta por si va bien o mal
        console.log(error)
        res.send({error:true, mensaje: error})
      }else{
        res.send({error:false, mensaje:respuesta})
      }
    })

    let found=false
  
    for (let i = 0; i < paquete.color.length &&!found; i++) {
      if(paquete[i].color === req.body.color){
        found=true
        paquete[i].color = granate 
      }
      
    }
    found //si found is true
    ?  res.send({mensaje: "Modificado correctamente"})
    :  res.send({mensaje:"No se ha encontrado"})
  
  })

  app.delete("/api/borrar/:patas", function(res,req){
  db.collection("mesas").deleteMany({patas:parseInt(req.params.patas)}, function(error, respuesta){//cuidado si buscas nunmeros tienes que hacer que se recoja como numero en el servidor
    if(error!==null){//mandamos respuesta por si va bien o mal
      console.log(error)
      res.send({error:true, mensaje: error})
    }else{
      res.send({error:false, mensaje:respuesta})
    }
  })

 
  })


app.listen(3000)