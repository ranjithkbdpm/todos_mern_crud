import express from 'express';
import {openDBConnection} from './db_con.js';

const router = express.Router();

router.get('/items', async (req,res)=>{
    try {
        const dbo = await openDBConnection(); // Await the result of openDBConnection
        const cursor = dbo.collection('items').find();
        // Access the 'items' collection using dbo.collection('items')
        const data = await cursor.toArray();
        res.send(data);  
        console.log(data);
        //res.status(200).send("Items retrieved successfully");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error retrieving items");
    }
});


router.post('/items', async (req,res)=>{
    try{
        const dbo = await openDBConnection();
        const result = await dbo.collection('items').insertOne(req.body); 
        console.log('inserted item', result); 
        res.status(200).send("Item inserted successfully");      
    }catch(err) {
        console.log(err)
    }
});


router.patch('/items/:id', async (req,res)=>{
    try {
        const dbo = await openDBConnection();
        //console.log(req.body);
        const item_id = req.body.id;
        const item = req.body.checked;
        console.log(req.body);
        console.log(item);
        console.log('datatype of param',typeof item);
        const updatedItem = await dbo.collection('items').updateOne({id:item_id},{$set:{checked:item}});
        console.log('update',updatedItem);
        res.status(200).send("Item updated successfully");
    }catch(err) {
        console.log(err);
        res.status(500).send("Error updating item");
    }
});


router.delete('/items/delete/:id', async(req,res)=>{
    try {
        const dbo = await openDBConnection();
        //const id = req.params.id;
        const paramID = parseInt(req.params.id);
        console.log('id from params',paramID);
        // console.log('datatype of param',typeof paramID);
        const deleteItem = await dbo.collection('items').deleteOne({id:paramID});
        console.log('Delete', deleteItem);
        res.status(200).send("Item deleted successfully");
    }catch(err) {
        console.log(err)
        res.status(500).send("Error deleting item");
    }
});


export default router;



