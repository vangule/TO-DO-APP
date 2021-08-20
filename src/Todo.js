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
    const [isToggle, setIsToggle] = useState(true);
    const [isEditItem, setIsEditItem] =useState(null);

    const addItem = () => {
        const allInputData = { id : new Date().getTime().toString(), name: inputData}
        console.log(allInputData)
        if(!inputData){
            // alert("add item");
            toast.warn("Please add input first", {
                position: "top-center",
                autoClose: 8000,
                closeOnClick: true
            });
        }else if(inputData && !isToggle){   
         setItems(
             items.map((elem) => {
                 if(elem.id === isEditItem){
                     return { ...elem, name: inputData};
                 }
                 return elem;
             })
         )
         setIsToggle(true);
         setInputData('');
         setIsEditItem(null);
        }else{
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    const removeMe = (index) => {
        const myNewArray = items.filter((ele) => {
            return index !== ele.id;
        })
        setItems(myNewArray);
    }

    const removeAll = () => {
        setItems([]);
    }

    const editMe = (id) => {
        const newEditArr = items.find((ele) => {
            return id === ele.id
        })
        console.log(newEditArr);
       setIsToggle(false);
       setInputData(newEditArr.name);
       setIsEditItem(id);
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
             <div>Add your list here</div>
           </figure>
           <input type="text" placeholder="Add items..."
           value={inputData}
            onChange={(e) => setInputData(e.target.value) }
            />

            {
                isToggle ?   <i className="fa fa-plus add-item-icon" title="Add Item" onClick={addItem} ></i> :
                             <i className="fa fa-edit edit-update-icon" title="Update Item" onClick={addItem}></i>   
            }

         
           <br/><br/>

           {/* All item displays here.. */}
            {
                items.map((elem) => {
                    return(
                        <div className="all-items" key={elem.id}> 
                        <div className="single-item">
                             <div>{elem.name}</div>
                             <div className="e-d-container"> 
                             <i className="fa fa-edit edit-icon" title="Edit Item" onClick={() => editMe(elem.id)}></i>
                             <i className="fa fa-trash delete-icon" title="Remove Item" onClick={() => removeMe(elem.id)}></i>
                             </div>
                        </div>     
                    </div>
                    );
                })
            }
           <button onClick={removeAll}>checklist</button>
          </div>
        </div>
        <ToastContainer />
        </>
    );
}

export default Todo;