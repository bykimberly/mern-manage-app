import React, {useState} from "react";
const API_BASE= 'http://localhost:5000/api';


function UserItem(props){
    const {id, name, email, setUsers, onSelect} = props

    const deleteUser = async() => {
    try{
        const response = await fetch(API_BASE +
            "/users/" + id, {
            method: "DELETE",
        });
        if(!response.ok){
            throw new Error("Failed to delete user")
        }
        const data = await response.json()
        setUsers(users=> users.filter(user=>user._id !== data._id))
    }catch (error) {
        console.error("Error deleting user:", error);
    }
}

    return(
        <div className="user" onClick={onSelect} style={{ cursor: "pointer" }}>
            <div className="user-name">{name}</div>
            <div className="user-email">{email}</div>
            <button type="button" onClick={(e) => {
                e.stopPropagation();
                deleteUser();
            }}>
                <span>X</span>
            </button>
        </div>
    )
}
export default UserItem;