import { useState } from 'react'
import './css/UserForm.css' 

function UserForm({ onAddUser }) {
  const initialFormState = { name: '', email: '', role: 'User' }
  const [formData, setFormData] = useState(initialFormState)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return alert("Please fill all fields")
    onAddUser(formData)
    setFormData(initialFormState) 
  }

  return (
    <div className="form-container">
    
      <div style={{ padding: '10px 0' }}> 
        
        <form onSubmit={handleSubmit}>
          
         
          <input 
            className="modern-input"
            type="text" 
            placeholder="Name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          
          <input 
            className="modern-input"
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
      
          <select 
            className="modern-input"
            value={formData.role} 
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

        
          <div className="btn-group">
            <button type="submit" className="btn save-btn">Save</button>
            <button 
              type="button" 
              className="btn reset-btn"
              onClick={() => setFormData(initialFormState)}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm