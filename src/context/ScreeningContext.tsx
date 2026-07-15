import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  ChildProfile,
  CharRecognitionData,
  RapidNamingData,
  PhonemeData,
  ScreeningResult,
  PartResult,
} from '../types/screening'
import { calculateOverallScore, determineRiskLevel } from '../utils/scoring'
import { ScreeningContext } from './ScreeningContextBase'

export function ScreeningProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<ChildProfile | null>(null)
  const [currentPart, setCurrentPart] = useState(1)
  const [charData, setCharData] = useState<CharRecognitionData | null>(null)
  const [rapidNamingData, setRapidNamingData] =
    useState<RapidNamingData | null>(null)
  const [phonemeData, setPhonemeData] = useState<PhonemeData | null>(null)

  const setProfile = useCallback((p: ChildProfile) => {
    setProfileState(p)
  }, [])

  const savePart1 = useCallback((data: CharRecognitionData) => {
    setCharData(data)
  }, [])

  const savePart2 = useCallback((data: RapidNamingData) => {
    setRapidNamingData(data)
  }, [])

  const savePart3 = useCallback((data: PhonemeData) => {
    setPhonemeData(data)
  }, [])

  const nextPart = useCallback(() => {
    setCurrentPart((p) => Math.min(p + 1, 3))
  }, [])

  const reset = useCallback(() => {
    setProfileState(null)
    setCurrentPart(1)
    setCharData(null)
    setRapidNamingData(null)
    setPhonemeData(null)
  }, [])

  const getResult = useCallback((): ScreeningResult | null => {
    if (!profile) return null

    const partResults: PartResult[] = []

    // Part 1
    if (charData) {
      partResults.push({
        part: 1,
        name: '汉字识别',
        score: charData.totalScore,
        maxScore: charData.maxScore,
        timeSeconds: charData.timeSeconds,
      })
    }

    // Part 2
    if (rapidNamingData) {
      partResults.push({
        part: 2,
        name: '快速自动命名',
        score: 0, // Part 2 is time-based, no score
        maxScore: 0,
        timeSeconds:
          rapidNamingData.digit.timeSeconds +
          rapidNamingData.picture.timeSeconds,
      })
    }

    // Part 3
    if (phonemeData) {
      partResults.push({
        part: 3,
        name: '声韵母重组',
        score: phonemeData.totalScore,
        maxScore: phonemeData.maxScore,
      })
    }

    const overallScore = calculateOverallScore(partResults.filter(p => p.maxScore > 0))
    const riskLevel = determineRiskLevel(overallScore)

    return {
      profile,
      part1: charData!,
      part2: rapidNamingData!,
      part3: phonemeData!,
      partResults,
      overallScore,
      riskLevel,
      completedAt: new Date().toISOString(),
    }
  }, [profile, charData, rapidNamingData, phonemeData])

  const value = useMemo(
    () => ({
      profile,
      currentPart,
      charData,
      rapidNamingData,
      phonemeData,
      setProfile,
      savePart1,
      savePart2,
      savePart3,
      nextPart,
      reset,
      getResult,
    }),
    [
      profile,
      currentPart,
      charData,
      rapidNamingData,
      phonemeData,
      setProfile,
      savePart1,
      savePart2,
      savePart3,
      nextPart,
      reset,
      getResult,
    ],
  )

  return (
    <ScreeningContext.Provider value={value}>
      {children}
    </ScreeningContext.Provider>
  )
}
