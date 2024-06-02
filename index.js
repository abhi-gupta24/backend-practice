// const express = require('express')   //common type

import express from 'express'   // module type
const app = express()

const port = 3000

app.use(express.json())

// app.get('/', (req, res) => {             //  htttp://127.0.0.1:3000
//   res.send('Hello from Abhishek from express!')
// })

// app.get('/ice-tea', (req, res) => {             //  htttp://127.0.0.1:3000
//     res.send('What you prefer')
//   })

// app.get('/twitter', (req, res) => {             //  htttp://127.0.0.1:3000
//     res.send('Thjjis is your twitter!')
//   })


let teaData = []
let nextId = 1


// to add a new tea
//to save a data coming from frontend in database
app.post('/teas',(req,res)=>{

  const{name,price} = req.body
  const newTea = {id : nextId++,name,price}
  teaData.push(newTea)
  res.status(201).send(newTea)
})


//get all tea
app.get('/teas',(req,res)=>{

  res.status(200).send(teaData)
})


// get a tea with id
app.get('/teas/:id',(req,res)=>{

  const tea = teaData.find(t => t.id ===  parseInt(req.params.id))    //req.params.id 

  if(!tea)
  {
    return res.status(404).send("Tea not found while get id")
  }

  res.status(200).send(tea)

})


//update a tea
app.put('/teas/:id',(req,res)=>{
  const tea = teaData.find(t => t.id ===  parseInt(req.params.id))    //req.params.id 

  if(!tea)
  {
    return res.status(404).send("Tea not found while update")
  }
   const{name,price}=req.body
   tea.name = name
   tea.price = price

  res.status(200).send(tea)

})


//delete tea
app.delete('/teas/:id',(req,res)=>{

  const index = teaData.findIndex(t => t.id ===  parseInt(req.params.id))    //req.params.id 

  if(index === -1)
  {
    return res.status(404).send("Tea not found while delete")
  }

  teaData.splice(index,1)
  res.status(200).send('deleted')

})



app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
}) 