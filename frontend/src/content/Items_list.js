import '../App.css'
import { FaTrashAlt } from "react-icons/fa";   


const ItemList = ({items, updateCheck, deleteItem}) => {
   return (
        <ul>                
            {items.map((item) => (
                <li key={item.id}> 
                    <div> 
                        
                        {/* checkbox */}
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={()=>updateCheck(item.id)}
                        /> 

                        {/* to-do list */}                        
                        <span 
                            style = {(item.checked) ?{textDecoration:"line-through"}:null}
                        >{item.title}</span>
                        {/* <span onDocubleClick = {()=>updateCheck(item.id)}>{item.title}</span> */}

                        {/* delete-icon to delete the list */}
                        <FaTrashAlt
                            role = "button"
                            tabIndex = '0'
                            onClick = {() => deleteItem(item.id) }
                        />
                    </div>                          
                </li>)
            )}                
        </ul>
    )  

}
     
export default ItemList;
            