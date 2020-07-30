import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import OAuthCallback from './pages/OAuth/Callback'
import {gql, useQuery} from '@apollo/client'

const GET_ME = gql`
  query {
    me {
      user {
        sub
        email
        first
        last
      }
    }
  }
`

const App = () => {
  const {data} = useQuery(GET_ME)

  console.log('data', data)

  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/oauth/callback">
          <OAuthCallback />
        </Route>

        <Route path="/">
          <div>
            <Link to="/signin">Sign in</Link>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
