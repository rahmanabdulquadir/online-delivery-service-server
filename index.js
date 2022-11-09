const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());



const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rl1a5mc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
  try{
    const serviceCollection = client.db('deliverService').collection('services')
    const reviewCollection = client.db('deliverService').collection('reviews')

    app.get('/services', async(req, res) => {
      const query = {}
      const cursor = serviceCollection.find(query)
      const services = await cursor.toArray()
      res.send(services)
    })
    app.get('/services3', async(req, res) => {
      const query = {}
      const cursor = serviceCollection.find(query)
      const services = await cursor.limit(3).toArray()
      res.send(services)
    })

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
  });

    // reviews api
    app.post('/reviews', async(req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review)
      res.send(result)
    })
  }
  finally{

  }

}
run().catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("online delivery service server is running");
});

app.listen(port, () => {
  console.log(`server running succesfully ${port}`);
});
