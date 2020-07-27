import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React from 'react'
import {gql, useQuery} from '@apollo/client'
import queryString from 'query-string'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0, 0, 4),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(0, 0, 0),
  },
  copyright: {
    position: 'fixed',
    padding: theme.spacing(0, 0, 3),
    bottom: 0,
    left: 0,
    width: '100%',
  },
}))

const GET_SIGN_IN_OPTIONS = gql`
  query {
    getSignInOptions {
      clientId
      authorizeUri
      responseType
      redirectUri
      scope
      identityProvider
    }
  }
`

type SignInOption = {
  clientId: string
  authorizeUri: string
  responseType: string
  redirectUri: string
  scope: string
  identityProvider: string
}

const constructAuthorizeUrl = (option: SignInOption): string => {
  return queryString.stringifyUrl({
    url: option.authorizeUri,
    query: {
      authorize_uri: option.authorizeUri,
      client_id: option.clientId,
      response_type: option.responseType,
      redirect_uri: option.redirectUri,
      scope: option.scope,
      identity_provider: option.identityProvider,
    },
  })
}

export default function SignIn() {
  const classes = useStyles()
  const {data} = useQuery(GET_SIGN_IN_OPTIONS)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        {data &&
          data.getSignInOptions.map((option: SignInOption) => {
            return (
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                href={constructAuthorizeUrl(option)}
                key={option.identityProvider}
              >
                Sign in with Google
              </Button>
            )
          })}
      </div>

      <Box className={classes.copyright}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'© '}
          <Link color="inherit" href="https://habitualizer.com">
            LyfApp
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  )
}
