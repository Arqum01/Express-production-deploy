import express from 'express';

const app = express()
const port = 3000
app.use(express.json())

const Data= {
    Name: "Arqum",
    Age: 22
}

let teaData = []
let nextId = 1

// Post Data
app.post('/', (req, res) => {
    const { name , price } = req.body
    const newTea = {id: nextId++ , name , price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// Get All Data
app.get('/data', (req, res) => {
    res.send(JSON.stringify(teaData))
  })

// Get Specific Data
app.get('/data/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Data not found')
    }
    else{
        return res.status(200).send(tea)
    }
  })

// Update
app.put('/data/:id', (req , res) => {
  const DataId = req.params.id
  const tea = teaData.find(t => t.id === parseInt(req.params.id))
  if(!tea){
    return res.status(404).send('Data not found')
}
else{
     const {name , price} = req.body
     tea.name = name
     tea.price = price
     res.status(200).send(tea)
}
})

// Delete
app.delete('/data/:id', (req, res) => {
  const deleteId = parseInt(req.params.id); // Convert id to a number
  const teaIndex = teaData.findIndex(t => t.id === deleteId); // Find the index of the item

  if (teaIndex === -1) {
    return res.status(404).send('Data not found');
  } else {
    teaData.splice(teaIndex, 1); // Remove the item at the found index
    return res.status(200).send('Deleted successfully');
  }
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`)
  })