import React from 'react'
import {gql, useQuery} from '@apollo/client'
import queryString from 'query-string'
import SignInForm, {SignInButtonOpts} from '../../components/SignInForm/SignInForm'
import Loading from '../../components/Loading/Loading'
import {generateStateForClientId} from '../../utils/oauthState'

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
  const state = generateStateForClientId(option.clientId)

  return queryString.stringifyUrl({
    url: option.authorizeUri,
    query: {
      authorize_uri: option.authorizeUri,
      client_id: option.clientId,
      response_type: option.responseType,
      redirect_uri: option.redirectUri,
      scope: option.scope,
      identity_provider: option.identityProvider,
      state,
    },
  })
}

const SignIn = () => {
  const {data, loading} = useQuery(GET_SIGN_IN_OPTIONS)

  if (loading) {
    return <Loading />
  }

  const signInButtons: SignInButtonOpts[] = data.getSignInOptions.map((option: SignInOption) => {
    return {
      buttonText: `Sign in with ${option.identityProvider}`,
      href: constructAuthorizeUrl(option),
    }
  })

  return <SignInForm signInButtons={signInButtons} />
}

export default SignIn
