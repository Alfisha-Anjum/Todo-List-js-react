import React, { useState } from 'react';
import './App.css';
import Todolist from './Todolist';
// import { IoIosCloseCircleOutline } from "react-icons/io";

const App = () => {
  const [inputList, setInputList] = useState("");
  const [Items, setItems] = useState([]);
  const itemEvent = (event) => {
    setInputList(event.target.value);
  };
  const listofItems = () => {
    setItems((Item) => {
      return[...Items, inputList]
    });
    setInputList(""); 
  };
  const deleteItem = (id) => {

    setItems((Items) => {
      return Items.filter((arrElem, index) => {
        return index !== id;
      })
})
  };
  console.log(inputList); 

  return (
    <div className="main-div">
    <div className='center-div'>
      <br />
      <h1>Todo-List</h1>
      <br />
      <input type='text' placeholder='Add a Items' value={inputList} onChange={itemEvent}/>
      <button style = {{borderRadius: 9}} onClick={listofItems}>+</button>
      <ol>
        {Items.map((itemval, index) => {
         return <Todolist
          // key = {index}
          id = {index}
         text={itemval}
         onSelect = {deleteItem} />;
          })}
      </ol>
    </div>
    </div>
  );
};

export default App;
