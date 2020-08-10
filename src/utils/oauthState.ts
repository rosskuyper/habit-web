import {v4} from 'uuid'
import {StorageBag, createBag} from './storageBag'

const CURRENT_VERSION = 2
const MAX_SIZE = 50

type StateValue = {
  clientId: string
  value: string
}

type OAuthState = {
  version: 2
  stateValues: StorageBag<StateValue>
}

const STORAGE_KEY = 'oauth.state'

const getOauthState = (): OAuthState => {
  const localState = localStorage.getItem(STORAGE_KEY)

  if (localState) {
    try {
      const stateObject = JSON.parse(localState)

      if (stateObject.version === CURRENT_VERSION) {
        return {
          ...stateObject,
          stateValues: createBag<StateValue>(MAX_SIZE, stateObject.stateValues),
        }
      }
    } catch (error) {
      // malformed state found - debug info
      console.log(error)
    }
  }

  return {
    version: CURRENT_VERSION,
    stateValues: createBag<StateValue>(MAX_SIZE),
  }
}

export const generateStateForClientId = (clientId: string): string => {
  const localState = getOauthState()
  const uuid = v4()

  localState.stateValues.set(uuid, {
    clientId,
    value: uuid,
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(localState))

  return uuid
}

export const getStateFromStateValue = (stateValue: string): StateValue | undefined => {
  const localState = getOauthState()

  return localState.stateValues.get(stateValue)
}

export const clearState = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}
