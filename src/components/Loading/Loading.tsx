import React from 'react'
import {Backdrop, CircularProgress} from '@material-ui/core'

const Loading = () => (
  <Backdrop open invisible>
    <CircularProgress color="primary" />
  </Backdrop>
)

export default Loading
