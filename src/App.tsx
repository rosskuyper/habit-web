import React from 'react'
import {gql, useQuery} from '@apollo/client'
import Loading from './components/Loading/Loading'
import UserSection from './sections/UserSection'
import PublicSection from './sections/PublicSection'

const SIGNED_IN = gql`
  query {
    signedIn
  }
`

const App = () => {
  const {data, loading} = useQuery(SIGNED_IN)

  if (loading) {
    return <Loading />
  }

  console.log('*****************RENDERING MAIN APP****************', data.signedIn)

  return data.signedIn ? <UserSection /> : <PublicSection />
}

export default App
