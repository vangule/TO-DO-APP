import { useEffect} from 'react';
import todo from "./images/note.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckList from './CheckList';
import useCheckList from './hook/useCheckList';

const Todo = () => {

const {  
    inputData,
    removeAll,
    setInputData,
    isToggle,
    lineItem,
    editMe,
    addItem,
    removeMe
} = useCheckList();

useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lineItem))
}, [lineItem]);

    return(
        <>
        <div className="main-div">
         <CheckList 
         inputData={inputData}
         removeAll={removeAll} 
         todo={todo} 
         setInputData={setInputData} 
         isToggle={isToggle} 
         lineItem={lineItem} 
         editMe={editMe} 
         addItem={addItem} 
         removeMe={removeMe}
         />
        </div>
        <ToastContainer />
        </>
    );
}

export default Todo;