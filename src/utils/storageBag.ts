/**
 * Wraps a Map<string, T> with a max size that can be safely stringified into JSON
 */

type Bag<T> = Map<string, T>

type Entry<T> = [string, T]

export type StorageBag<T> = {
  set: (key: string, value: T) => void
  get: (key: string) => T | undefined
  toJSON: () => void
}

export const createBag = <T>(maxSize: number, entries: Entry<T>[] = []): StorageBag<T> => {
  const bag = new Map<string, T>(entries.slice(-maxSize))

  const set = (key: string, value: T) => {
    bag.set(key, value)

    if (bag.size > maxSize) {
      const keyToDelete = Array.from(bag.keys()).shift()

      if (keyToDelete) {
        bag.delete(keyToDelete)
      }
    }
  }

  const get = (key: string) => {
    return bag.get(key)
  }

  const toJSON = (): Entry<T>[] => {
    return Array.from(bag.entries())
  }

  return {
    set,
    get,
    toJSON,
  }
}
