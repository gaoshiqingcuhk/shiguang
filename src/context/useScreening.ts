import { useContext } from 'react'
import { ScreeningContext } from './ScreeningContextBase'

export function useScreening() {
  const ctx = useContext(ScreeningContext)
  if (!ctx) {
    throw new Error('useScreening must be used within ScreeningProvider')
  }
  return ctx
}
