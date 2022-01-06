import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'
import { useState } from 'react'

function App() {
  // Use initialEmails for state
  let [emails, setEmails] = useState(initialEmails)
  let [currentTab, setCurrentTab] = useState('inbox')
  let [readShown, setReadShown] = useState (false)

  function showStarred() {
    setReadShown(false)
    emails = emails.filter(email => email.starred)
    setEmails([...emails])
  }
  function showInbox(){
    setReadShown(false)
    setEmails(initialEmails)
  }

  function inboxCounter(){
    let count = 0
    for(const email of initialEmails){
      count++
    }
    return count
  }
  function starredCounter(){
    let count = 0
  
    for(const email of initialEmails){
      if(email.starred) count++  
    }
    return count
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
        setEmails([...emails])
        if(currentTab === 'starred'){
          showStarred()
        }
      } 
    }
  }

  function showRead(){
    let showReadEmails = emails.filter(email => email.read)
    setEmails(showReadEmails)
  }


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={currentTab === 'inbox' ? "item active" : "item"}
            onClick={() => {
              showInbox()
              setCurrentTab('inbox')
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{inboxCounter()}</span>
          </li>
          <li
            className={currentTab === 'starred' ? "item active" : "item"}
            onClick={() => {
              showStarred()
              setCurrentTab('starred')
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredCounter()}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={readShown}
              onChange={() => {
                setReadShown(!readShown)
                showRead()
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
