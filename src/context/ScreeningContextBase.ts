import { createContext } from 'react'
import type {
  ChildProfile,
  CharRecognitionData,
  RapidNamingData,
  PhonemeData,
  ScreeningResult,
} from '../types/screening'

export interface ScreeningContextValue {
  profile: ChildProfile | null
  currentPart: number
  charData: CharRecognitionData | null
  rapidNamingData: RapidNamingData | null
  phonemeData: PhonemeData | null
  setProfile: (profile: ChildProfile) => void
  savePart1: (data: CharRecognitionData) => void
  savePart2: (data: RapidNamingData) => void
  savePart3: (data: PhonemeData) => void
  nextPart: () => void
  reset: () => void
  getResult: () => ScreeningResult | null
}

export const ScreeningContext = createContext<ScreeningContextValue | null>(null)
