import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
const Todolist = (props) => {

    return (
        <>
        <div className="todo-style">
        <IoIosCloseCircleOutline onClick= {() => {
         props.onSelect(props.id);
    }}
    />
    <li>{props.text}</li> 
    </div>
    </>
    );
};

export default Todolist;
