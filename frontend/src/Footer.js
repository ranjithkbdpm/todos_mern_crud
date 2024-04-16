import './App.css';
import {useState, useEffect} from 'react';


function Footer({items, length, deleteAll}) { 

  //pending list state 
  const  [pendingLength, setPendingLength] = useState(length);

   //this updates the pending todo_list items once the app is loaded
   useEffect(() => {
    const pendingList = items.filter((item) => item.checked !== true);
    setPendingLength(pendingList.length);
  }, [items]);
  
  return (
       
    <div className = 'App-footer'>  
        <footer className = 'footer-tags'>
           <span>{length === 1 ? 'Todo-List item' : 'Todo-List items'}:{length}</span>  
           <span>{length === 1 ? 'Pending item' : 'Pending items'}:{pendingLength}</span>         
           {/* <span onDoubleClick = {() => deleteAll()} style ={{cursor:'pointer'}} id='color'>Delete All</span> */}
        </footer>        
    </div>    
   
  );
}

export default Footer;