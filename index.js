import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json()); //Used to parse body data to json

const port = 3000;

app.get('/', (req, res)=> {
    res.send("Hey");
})

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});