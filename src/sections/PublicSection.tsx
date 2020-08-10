import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import OAuthCallback from '../pages/OAuth/Callback'
import SignIn from '../pages/SignIn/SignIn'

const PublicSection = () => {
  return (
    <Router>
      <Switch>
        <Route path="/oauth/callback">
          <OAuthCallback />
        </Route>

        <Route path="/signin">
          <SignIn />
        </Route>

        <Route path="/" exact>
          <SignIn />
        </Route>
      </Switch>
    </Router>
  )
}

export default PublicSection
