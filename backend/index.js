import express from 'express';
import router from './router.js'
import cors from 'cors'
const port = 3500;
const app = express();


// app.get('/',(req,res)=>{
//     console.log('Server is running on port number');
//     res.send(`To Do list server running from ${port}`);
// })

//Dont set this to 3500 cors
app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","PUT","POST","PATCH","DELETE"],
    credentials:true
}));

app.use(express.json());

app.use('/',router);

app.listen(port, ()=>{
    console.log(`server listening to ${port}`)
})

