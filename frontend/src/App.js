import './App.css';
import {useState, useEffect} from 'react';
import Header from './Header.js';
import Content from './content/Content.js';
import Footer from './Footer.js';
import axios from 'axios'



  function App() { 

    //state of the todo-list
    const [items, setItem] = useState([]);

    //search state to filter on change
    const [search, setSearch] = useState('');    

    //Error message state 
    const [errorMessage, setErrorMessage] = useState("");

    //loading Status to show when waiting for data
    const [loading, setLoading] = useState(true);

    //url where your json-server send data
    const DATA_URL = "http://localhost:3500/items";

    //fetching data from server 
    useEffect( () => {
      const getToDoItems = async () => {        
        try{
          const response = await axios.get(DATA_URL);
          if (response.status < 200 || response.status >= 300) {
            throw new Error("HTTP error " + response.status);          
        }          
          //console.log("Response from 3500:", response)

          let listItems = await response.data;
          console.log(listItems);
          setErrorMessage(null);
          return setItem(listItems);
        }
        catch(err) {
          console.log(err.message);
          setErrorMessage(err.message);
          console.log(err.stack);
        } 
        finally{
          setLoading(false); 
      }   
    }  
    //simulating loading delay
    setTimeout( ()=>{
     (async () => getToDoItems())()},500)
    }, [])    



    //AddItem function to set the input value as setItem
    const addNewItem = async (itemName) => {
      const id = items.length ? items[items.length-1].id + 1 : 1;
      //const id = items.length + 1;  
      let newListItem =  {id, checked:false, title:itemName} 
      const listItems = [...items, newListItem]
      setItem(listItems);    
      //backend axios.post the data  
      try{
        const response = await axios.post(DATA_URL, newListItem);
        console.log(response);        
      }catch(err){
        console.log(err.message);
        setErrorMessage(err.message);
        console.log(err.stack);
      }
    }

    
  
    //update the checkbox state object
    const updateCheck = async (id) => {        
      const newItems = items.map((item) => 
      item.id === id ?{...item, checked :!item.checked} :item);
      setItem(newItems);
      //item to be updated
      //const updatedItem = newItems.filter(item => item.id === id);
      const updatedItemIndex = newItems.findIndex(item => item.id === id); 
      const updatedItem = newItems[updatedItemIndex];

       //backend axios.post the data  
       try{
        const response = await axios.patch(`${DATA_URL}/${id}`, updatedItem);
        console.log(response);        
      }catch(err){
        console.log(err.message);
        setErrorMessage(err.message);
        console.log(err.stack);
      }
    }

    //delete the items 
    const deleteItem = async (id) => {        
      const listItems = items.filter( 
          (item) => item.id !== id
      );
      console.log('list item filtered',listItems);
      //delete an object that matches the id selected
      const deleteItemIndex = items.findIndex(item => item.id === id); 
      const deleteItem = items[deleteItemIndex];
      console.log('item to delete',deleteItem);         
      try{
        const response = await axios.delete(`${DATA_URL}/delete/${id}`, deleteItem);
        console.log(response); 
        setItem(listItems);       
      }catch(err){
        console.log(err.message);
        setErrorMessage(err.message);
        console.log(err.stack);
      }
    }

   
  //    const deleteAll = async () => {
  //     const itemsList = []
  //     setItem(itemsList);     
  //    try{
  //     const response = await axios.delete(`${DATA_URL}/deleteall`);
  //     console.log(response);        
  //    }catch(err){
  //     console.log(err.message);
  //     setErrorMessage(err.message);
  //     console.log(err.stack);
  //   }
  //  }

    

    
    
    return (
      <div className="App">
        <div className = 'containerBox'> 
        {/* props are always used on the parent component (here its APP) because sibiling cannot exchange props */}

          <Header/> 

          <>
            {/* set loading message when the data takes time to load from server */}
            {loading 
                ? <h1 className = "App-content" style ={{textAlign:'center'}}>Loading...</h1> 
                :<Content
                items = {items.filter(item => ((item.title).toLowerCase()).includes(search.toLowerCase()))}
                setItem = {setItem}
                updateCheck = {updateCheck}
                deleteItem = {deleteItem}
                length = {items.length}
                errorMessage = {errorMessage}
                addNewItem={addNewItem}
                search = {search}
                setSearch = {setSearch}
              />  
            }  
          </>                

          <Footer
            items = {items}
            length = {items.length}           
            // deleteAll = {deleteAll}
          />
        
        </div>
      </div>
    );
  }

export default App;
