import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
import "./main.css"

const auth0config = {
  domain: import.meta.env.VITE_APP_DOMAIN,
  clientId: import.meta.env.VITE_APP_CLIENT_ID,
  redirectUri: `${window.location.origin}/dashboard`
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...auth0config}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
