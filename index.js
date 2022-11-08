const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

// middle wares 
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://<username>:<password>@cluster0.rl1a5mc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
  res.send('online delivery service server is running')
})


app.listen(port, () => {
  console.log(`server running succesfully ${port}`)
})