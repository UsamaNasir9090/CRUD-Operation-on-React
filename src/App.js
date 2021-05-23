import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [User, setUser] = useState([])
  const [flag, setFlag] = useState(false)
  const [buttonName, setButtonName] = useState('Submit')
  const [id, setId] = useState()
  let handler = (e) => {
    e.preventDefault()
    if (name && email && !flag) {
      const person = { name: name, email: email, id: Date.now() }
      setUser((User) => {
        return [...User, person]
      })
      clear()
    } else if (name && email) {
      const temp = User
      let index = temp.findIndex((v) => {
        return v.id == id
      })
      temp[index].name = name
      temp[index].email = email
      setUser(temp)
      clear()
    }
  }
  const clear = () => {
    setFlag(false)
    setId(null)
    setName('')
    setEmail('')
    setButtonName('Submit')
  }
  let cancelData = (id, name) => {
    console.log(name)
    const cancelData = User.filter((v, i) => {
      return v.id !== id
    })
    setUser(cancelData)
  }

  let edit = (tid, name, email) => {
    setFlag(true)
    setButtonName('Update')
    setId(tid)
    setName(name)
    setEmail(email)
  }

  return (
    <>
      <article>
        <form onSubmit={handler}>
          <div className='form-group'>
            <label className='mr-sm-2'>Name:</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Your Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
          <div className='form-group'>
            <label className='mr-sm-2'>Email:</label>
            <input
              type='email'
              id='email'
              placeholder='Enter Your email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <button type='submit' className='btn-success ml-2'>
            {buttonName}
          </button>
        </form>
        {User.map((peoples) => {
          const { id, name, email } = peoples
          return (
            <div key={id}>
              <div className='card m-2 '>
                <div className='card-body '>
                  <h6 className='card-title '>{name}</h6>
                  <h6 className='card-title '>{email}</h6>
                </div>
              </div>
              <button
                type='button'
                onClick={() => {
                  edit(id, name, email)
                }}
                className='btn-info ml-3'
              >
                Edit
              </button>
              <button
                type='button'
                onClick={() => cancelData(id)}
                className='btn-danger ml-2'
              >
                Delete
              </button>
            </div>
          )
        })}
      </article>
    </>
  )
}

export default App
