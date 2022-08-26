import {useState} from 'react';
import { toast } from 'react-toastify';

const useCheckList = () => {
        const [inputData, setInputData] = useState('');
        const [isToggle, setIsToggle] = useState(true);
        const [isEditItem, setIsEditItem] =useState(null);
    
        const getLocallineItem = () => {
            let list = localStorage.getItem('lists');
            return list ? JSON.parse(localStorage.getItem('lists')): [];
        }
        const [lineItem, setLinelineItem] = useState(getLocallineItem());

        const addItem = () => {
            const allInputData = { id : new Date().getTime().toString(), name: inputData}
            console.log(allInputData)
            if(!inputData){
                toast.warn("Please add input first", {
                    position: "top-center",
                    autoClose: 8000,
                    closeOnClick: true
                });
            }else if(inputData && !isToggle){   
                setLinelineItem(
                 lineItem.map((elem) => {
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
                setLinelineItem([...lineItem, allInputData]);
                setInputData('');
            }
        }
    
        const removeMe = (index) => {
            const myNewArray = lineItem.filter((ele) => {
                return index !== ele.id;
            })
            setLinelineItem(myNewArray);
        }
    
        const removeAll = () => {
            setLinelineItem([]);
        }
    
        const editMe = (id) => {
            const newEditArr = (lineItem||[]).find((ele) => {
                return id === ele.id
            })
            console.log(newEditArr);
           setIsToggle(false);
           setInputData(newEditArr.name);
           setIsEditItem(id);
        }
  return {
    inputData,
    removeAll,
    setInputData,
    isToggle,
    lineItem,
    editMe,
    addItem,
    removeMe
  }
}

export default useCheckList;