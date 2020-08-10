import React, {useEffect, useState} from 'react'
import {gql, useMutation} from '@apollo/client'
import queryString from 'query-string'
import {getStateFromStateValue} from '../../utils/oauthState'

const CODE_SWAP = gql`
  mutation CodeSwap($code: String!, $clientId: String!) {
    swapCodeForTokensCookie(payload: {code: $code, clientId: $clientId})
  }
`

const OAuthCallback = () => {
  const [codeSwap, {data}] = useMutation(CODE_SWAP)
  const [pageState, setPageState] = useState('LOADING')

  useEffect(() => {
    const query = queryString.parse(window.location.search)
    const code = query.code
    const stateUUID = query.state

    if (!code || Array.isArray(code) || !stateUUID || Array.isArray(stateUUID)) {
      return setPageState('ERROR')
    }

    const state = getStateFromStateValue(stateUUID)

    if (!state) {
      return setPageState('ERROR')
    }

    codeSwap({
      variables: {
        code,
        clientId: state.clientId,
      },
    })
  }, [codeSwap])

  useEffect(() => {
    console.log('data', data)

    if (data) {
      window.location.href = '/'
    }
  }, [data])

  return <div />
}

export default OAuthCallback
