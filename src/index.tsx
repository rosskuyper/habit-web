import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ProvideAuth} from './hooks/useAuth'
import './index.css'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <CssBaseline />
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </ApolloProvider>,
  document.getElementById('root'),
)
