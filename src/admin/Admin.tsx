import React, {useEffect, useState} from 'react'

export type User = {
  id: number,
  email: string,
  isAdmin: boolean
}

const Admin: React.FunctionComponent = () => {
  const [Admins, setAdmins] = useState<User[] | []>([])
  useEffect(() => {
    fetch('/api/users/admin').then((res) => res.json()).then((data) => {
      setAdmins(data)
    })
  },[])

  const onSubmit = (evt: any) => {
    fetch('/api/users/admin', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({        
        password: evt.target[1].value,
        email: evt.target[0].value,
        username: evt.target[0].value,
      })
    }).then((res) => res.json()).then((data) => {
      setAdmins([...Admins, data])
    })
  }

  const onDelete = (id: number) => {
    fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(() => {
      setAdmins(Admins.filter(a => a.id !== id))
    })
  }

  return (
    <div className='outline'>
      {Admins[0] && <div className="admin-panel">
        <h3>Admin Panel</h3>
        <div className='admin-user'>
          {Admins.map(user => (
            <div key={user.id} className='admin-user-box'>
              <p>{user.email}</p>
              {user.id > 4 ? (
                <button onClick={() => onDelete(user.id)}>delete</button>
              ) : (
                <p>Permanent Admin</p>
              )}
            </div>
          ))}
        </div>
        <h3>Create Admin</h3>
        <form className="admin-create" onSubmit={onSubmit} >
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" required={true} />
            <label htmlFor="password">Password</label>
            <input name="password" type="text" required={true} />
          </div>
          <div className="sign-in-submit">
            <button type="submit" >Submit</button>
          </div>
        </form>
      </div>}
    </div>
  )
}

export default Admin
