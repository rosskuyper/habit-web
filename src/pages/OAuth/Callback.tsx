import {gql, useMutation} from '@apollo/client'
import {Container, makeStyles} from '@material-ui/core'
import queryString from 'query-string'
import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import {useAuth} from '../../hooks/useAuth'
import {getStateFromStateValue} from '../../utils/oauthState'

const CODE_SWAP = gql`
  mutation CodeSwap($code: String!, $clientId: String!) {
    swapCodeForTokensCookie(payload: {code: $code, clientId: $clientId}) {
      user {
        sub
        email
        first
        last
        updatedAt
        createdAt
      }
    }
  }
`

enum PageState {
  Loading,
  MissingCodeError,
  MissingStateError,
  InvalidStateError,
  TokenSwapError,
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const ErrorPage = () => {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <h3>Sign in error</h3>
        <p>There was an error signing you in, please try again.</p>
        <p>
          <a href="/signin">Back to sign in</a>
        </p>
      </div>
    </Container>
  )
}

const OAuthCallback = () => {
  const [codeSwap] = useMutation(CODE_SWAP)
  const [pageState, setPageState] = useState(PageState.Loading)
  const {setUser} = useAuth()
  const history = useHistory()

  // Runs on first render - go swap the code for tokens
  useEffect(() => {
    const query = queryString.parse(window.location.search)
    const code = query.code
    const stateUUID = query.state

    if (!code || Array.isArray(code)) {
      return setPageState(PageState.MissingCodeError)
    }

    if (!stateUUID || Array.isArray(stateUUID)) {
      return setPageState(PageState.MissingStateError)
    }

    const state = getStateFromStateValue(stateUUID)

    if (!state) {
      return setPageState(PageState.InvalidStateError)
    }

    codeSwap({
      variables: {
        code,
        clientId: state.clientId,
      },
    })
      .then((data) => {
        setUser(data.data.swapCodeForTokensCookie.user)
        history.push('/')
      })
      .catch((error) => {
        console.error(error)
        setPageState(PageState.TokenSwapError)
      })
  }, [codeSwap, history, setUser])

  /**
   * What to actually render during this process.
   * There is a basic error page showing the user to the login page if some error occured.
   * Here is where you could show the user more details if you wanted to based on the type of error.
   * If you wanted to show an error message from the server you could simply put that into a useState variable.
   */
  switch (pageState) {
    case PageState.Loading:
      return <Loading />

    default:
      return <ErrorPage />
  }
}

export default OAuthCallback
