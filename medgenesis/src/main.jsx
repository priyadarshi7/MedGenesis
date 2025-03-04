import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<Auth0Provider
    domain="dev-udqndn3ec1rcacr4.us.auth0.com"
    clientId="Ec5IjK7lcSn2ypcgnVtjeouOsafeeDWk"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
<BrowserRouter>
    <App />
</BrowserRouter>
</Auth0Provider>
)
