import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
import "./main.css"

interface auth0config{
  domain: string,
  clientId: string,
  redirectUri: string
}

const config: auth0config = {
  domain: import.meta.env.VITE_APP_DOMAIN as string,
  clientId: import.meta.env.VITE_APP_CLIENT_ID as string,
  redirectUri: `${window.location.origin}/dashboard` as string
}

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...config}
      /* domain={import.meta.env.VITE_APP_DOMAIN} */
      /* clientId={import.meta.env.VITE_APP_CLIENT_ID} */
      /* redirectUri={`${window.location.origin}/dashboard`} */
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
