import '../App.css'
import AddItems from './AddItems';
import SearchItems from './SearchItems';
import ItemList from './Items_list';
//import { FaTrashAlt } from "react-icons/fa"; 
  

function Content({items,updateCheck,deleteItem, errorMessage, addNewItem, search, setSearch}) {     
  
  return (
    <>
    <AddItems addNewItem={addNewItem} /> 

    <SearchItems
      style = {{marginTop:'10px'}}
            search = {search}
            setSearch = {setSearch}
    />  
    
    <div className = 'App-content'>  
        <div className = 'main'>
          {errorMessage 
              ?(<h1 style = {{textAlign: "center"}}>{errorMessage}</h1>)
              :( items.length > 0
                
                ? <ItemList
                  items = {items}               
                  updateCheck = {updateCheck}
                  deleteItem = {deleteItem}
                  /> 
                  // example of prop drilling App.js(parent) props (such as items,updateCheck,deleteItem) drilled into content.js then to Item_list.js      

                : <h1 style = {{textAlign: "center"}}>List is Empty</h1>               
              )
          }   
        </div>        
    </div>

    </>   
  );
}

export default Content;