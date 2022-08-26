import React from 'react'

const CheckList = ({ inputData, removeAll, todo, setInputData, isToggle, lineItem, editMe, addItem, removeMe}) => {
  return (
    <div className="child-div">
          <figure>
            <div><img src={todo} alt="icon"/></div>
            <div>Add your list here</div>
          </figure>
          <input 
            type="text" 
            placeholder="Add items..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value) }
            />
            {
              isToggle ?  
              <i className="fa fa-plus add-item-icon" title="Add Item" onClick={addItem} /> :
              <i className="fa fa-edit edit-update-icon" title="Update Item" onClick={addItem}/>  
            }
         <div style={{marginTop:'10px'}}>
            {
                (lineItem || []).map((elem) => {
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
            </div>
          {lineItem?.length > 0 &&<button onClick={removeAll}>checklist</button>}
          </div>
  )
}

export default CheckList;