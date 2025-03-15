import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<Auth0Provider
    domain= {import.meta.env.VITE_AUTH0_DOMAIN}
    clientId= {import.meta.env.VITE_AUTH0_CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
<BrowserRouter>
    <App />
</BrowserRouter>
</Auth0Provider>
)
