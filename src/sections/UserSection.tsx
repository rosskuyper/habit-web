import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const PlaceHolder = () => <div>Signed In!</div>

const UserSection = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <PlaceHolder />
        </Route>
      </Switch>
    </Router>
  )
}

export default UserSection
