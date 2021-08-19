import React,{useState, useEffect} from 'react';
import todo from "./images/note.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getLocalItems = () => {
    let list = localStorage.getItem('lists');

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());

    const addItem = () => {
        if(!inputData){
            // alert("add item");
            toast.warn("Please add input first", {
                position: "top-center",
                autoClose: 8000,
                closeOnClick: true
            });
        }else{
            setItems([...items, inputData]);
            setInputData('');
        }
    }

    const removeMe = (id) => {
        const myNewArray = items.filter((ele, ind) => {
            return id !== ind;
        })
        setItems(myNewArray);
    }

    const removeAll = () => {
        setItems([]);
    }

    const editMe = () => {

    }

     useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    return(
        <>
        <div className="main-div">
          <div className="child-div">
           <figure>
             <img src={todo} alt="icon"/><br/>
             <figurecaption>Add your list here</figurecaption>
           </figure>
           <input type="text" placeholder="Add items..."
           value={inputData}
            onChange={(e) => setInputData(e.target.value) }
            />
           <i className="fa fa-plus add-item-icon" title="Add Item" onClick={addItem} ></i>
           <br/><br/>

           {/* All item displays here.. */}
            {
                items.map((elem, ind) => {
                    return(
                        <div className="all-items">
                        <div className="single-item">
                             <div>{elem}</div>
                             <div className="e-d-container"> 
                             <i className="fa fa-edit edit-icon" title="Edit Item" onClick={() => editMe(ind)}></i>
                             <i className="fa fa-trash delete-icon" title="Remove Item" onClick={() => removeMe(ind)}></i>
                             </div>
                        </div>     
                    </div>
                    );
                })
            }
           <button onClick={removeAll}>Remove All</button>
          </div>
        </div>
        <ToastContainer />
        </>
    );
}

export default Todo;