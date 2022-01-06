import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [showRead, setShowRead] = useState (false)
  const [currentTab, setCurrentTab] = useState('inbox')

  function showStarred(myEmails) {
    let emailsToShow = myEmails.filter(email => email.starred)
    return emailsToShow
  }
  function showInbox(){
    setEmails(initialEmails)
  }

  function readEmail(emailID){
    for( const email of emails){
      if(email.id === emailID){
        email.read = !email.read
      } 
    }
    setEmails([...emails])
  }

  function starEmail(emailID){
    for( const email of emails){
      if(email.id === emailID){
        email.starred = !email.starred
      } 
    }
    setEmails([...emails])
  }


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={currentTab === 'inbox' ? "item active" : "item"}
            onClick={() => {
              setCurrentTab('inbox')
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className={currentTab === 'starred' ? "item active" : "item"}
            onClick={() => {
              setCurrentTab('starred')
            }}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={showRead}
              onChange={() => {
                setShowRead(!showRead)
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emails.map(email => (
            <li className={email.read ? 'email read' : 'email unread'}>
              <input 
                type="checkbox" 
                name="read-checkbox" 
                id="read-checkbox"
                onClick={()=>{
                  readEmail(email.id)
                }}
                checked={email.read} />
              <input 
                className='star-checkbox' 
                type="checkbox" 
                name="star-checkbox"  
                id="star-checkbox"
                checked = {email.starred}
                onClick={()=>{
                  starEmail(email.id)
                }}
                />  
              <p className='sender'>
                {email.sender}
              </p>
              <p className='title'>
                {email.title}
              </p>
              
            </li>
            
            ))}
        </ul>
      </main>
    </div>
  )
}

export default App
