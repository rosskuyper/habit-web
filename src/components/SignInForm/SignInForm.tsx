import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, {MouseEventHandler} from 'react'

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

export type SignInButtonOpts = {
  buttonText: string
  href: string
  onClick: MouseEventHandler
}

const SignInForm = ({signInButtons}: {signInButtons: SignInButtonOpts[]}): JSX.Element => {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        {signInButtons.map((option) => {
          return (
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              href={option.href}
              key={option.href}
              onClick={option.onClick}
            >
              {option.buttonText}
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

export default SignInForm
