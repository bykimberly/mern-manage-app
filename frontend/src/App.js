import React from 'react';
import { useEffect, useState } from "react";
import UserForm from './components/UserForm';
import UserItem from './components/UserItem';

const API_BASE= 'http://localhost:5000/api';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lookupEmail, setLookupEmail] = useState('');
  const [foundUser, setFoundUser] = useState(null);


  const GetUsers = () => {
    fetch(API_BASE + '/users')
    .then(res => res.json())
    .then((data) => setUsers(data))
    .catch(err => console.log(err))
  }

  const GetUserByEmail = () => {
    if (!lookupEmail) {
      console.warn('No email entered to search');
      return;
    }

    fetch(API_BASE +'/users/email/' + lookupEmail)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        console.log("Found user:", data);
        setSelectedUser(data);
        setFoundUser(data);
      })
      .catch((err) => {
        console.error(err);
        setFoundUser(null);
      });
  };


  return (
    <div className="App">
      <h1>User Management System</h1>
      <UserForm
        onUserAdded={GetUsers}
        onUserUpdated={GetUsers}
        selectedUser={selectedUser}
      />

      <div className='usersearch'>
        <input
          type="text"
          placeholder="Enter email"
          value={lookupEmail}
          onChange={(e) => setLookupEmail(e.target.value)}
        />
        <button onClick={GetUserByEmail}>Search</button>
      </div>

      {foundUser && (
        <div id='founduser'>
          <p><strong>Name:</strong> {foundUser.name}</p>
          <p><strong>Email:</strong> {foundUser.email}</p>
        </div>
      )}

      <button onClick={GetUsers}>Show All Users</button>

      <div className="userlist">
        {users.map((user)=> {
          const {_id, name, email} = user;
          return <UserItem
            id={_id}
            name={name}
            email={email}
            setUsers={setUsers}
            onSelect={() => setSelectedUser(user)}
          />
        })}
      </div>
    </div>
  );
}

export default App;