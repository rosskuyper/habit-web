import React, {useEffect} from 'react'
import {gql, useMutation} from '@apollo/client'
import queryString from 'query-string'

const CODE_SWAP = gql`
  mutation CodeSwap($code: String!, $clientId: String!) {
    swapCodeForTokensCookie(payload: {code: $code, clientId: $clientId})
  }
`

const OAuthCallback = () => {
  const [codeSwap, {data}] = useMutation(CODE_SWAP)

  useEffect(() => {
    const code = queryString.parse(window.location.search)?.code

    codeSwap({
      variables: {
        code,
        clientId: '2n9u3j4luccqdk1h351bvsvti2',
      },
    })
  }, [codeSwap])

  console.log('data', data)

  return <div />
}

export default OAuthCallback
