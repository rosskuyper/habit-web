import React from 'react'
import Loading from './components/Loading/Loading'
import {useAuth} from './hooks/useAuth'
import PublicSection from './sections/PublicSection'
import UserSection from './sections/UserSection'
import {useFriendStatus} from '@rosskuyper/ts-package-boilerplate'

const App = () => {
  const {user} = useAuth()
  useFriendStatus()

  // If we're still loading
  if (user === undefined) {
    return <Loading />
  }

  console.log('*****************RENDERING MAIN APP****************', user)

  return user ? <UserSection /> : <PublicSection />
}

export default App
