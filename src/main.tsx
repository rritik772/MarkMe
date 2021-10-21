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
  domain: "mark-me.jp.auth0.com",
  clientId: "YeEJDkwKk7DYeEJDkwKk7DQRY2sxg9mpX3IcI5C9lGiQRY2sxg9mpX3IcI5C9lGi",
  redirectUri: `${window.location.origin}/dashboard`
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
