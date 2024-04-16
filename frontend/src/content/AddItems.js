import React from 'react';
import { FaPlus } from "react-icons/fa"; 
import {useState, useRef} from "react";
import '../App.css';

//rafce is shortcut to bring the component template

const AddItems = ({setItems, addNewItem}) => {

//useRef accessing input element directly in the DOM. Here it is to focus the input when button is clicked to submit form
const inputRef = useRef();

//input state used to set todo items from input form into  items in the useState      
 const [newItem, setNewItem] = useState('');
 
//form handling and controlling  
//input state newItem is passed to addNewItem function which will set the item state 
 const handleSubmit = (e) => {
  e.preventDefault();
  console.log('value submitted');
  if(!newItem){return};
  console.log(newItem);
  addNewItem(newItem);
  setNewItem('');      
} 

  return (
    <form className = "listForm" onSubmit = {handleSubmit}>
        <label htmlFor="listItem">Add Item:</label>
        <input 
            type="text"
            placeholder='Add Item'
            id='listItem'
            autoFocus
            required 
            ref = {inputRef}
            value = {newItem} 
            // controlling the input
            onChange = {(e)=>setNewItem(e.target.value)}       
        />
        <button 
        onClick = {()=>inputRef.current.focus()} 
        type='submit'
        ><FaPlus/>
        </button>

    </form>
    
  )
}

export default AddItems



