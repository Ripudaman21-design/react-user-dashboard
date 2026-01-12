import { useState } from 'react'
import './App.css'
import UserForm from './User-Form'
import UserList from './UserList'

function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  const usersPerPage = 5

  const addUser = (newUser) => {
    setUsers([...users, newUser])
  }

  // Search & Pagination Logic
  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  return (
    <div className="app-container">
    
      <header className="app-header">
        <h1>User Management Dashboard</h1>
       
      </header>

      
      <div className="content-grid">
        
        {/* LEFT COLUMN: User Form */}
        <div className="card form-card">
          <div className="card-header">
            <h2>Add New User</h2>
            <p>Create a new user by filling the form below</p>
          </div>
          <UserForm onAddUser={addUser} />
        </div>

        {/* RIGHT COLUMN: Search & List */}
        <div className="card list-card">
          <div className="card-header">
            <h2>Users List</h2>
            <p>Manage all your users</p>
          </div>

          <div className="search-section">
            <label className="input-label">Search</label>
            <input 
              className="modern-input"
              type="text" 
              placeholder="Search by name or email..." 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>

          <UserList users={currentUsers} />

          {/* Pagination (Only show if needed) */}
          {filteredUsers.length > usersPerPage && (
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
              <span>{currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App