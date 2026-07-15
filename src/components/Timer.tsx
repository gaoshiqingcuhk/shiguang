import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'

interface TimerProps {
  onStop: (elapsedSeconds: number) => void
  label?: string
}

export function Timer({ onStop, label }: TimerProps) {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [stopped, setStopped] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => e + 1)
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const handleStart = () => {
    setRunning(true)
    setElapsed(0)
  }

  const handleStop = () => {
    setRunning(false)
    setStopped(true)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleConfirmStop = () => {
    onStop(elapsed)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50/60 p-4">
      {label && (
        <span className="font-medium text-slate-600">{label}</span>
      )}
      <div className="flex items-center gap-3">
        {!running && !stopped && (
          <Button onClick={handleStart} size="lg">
            ▶ 开始计时
          </Button>
        )}
        {running && (
          <>
            <span className="text-3xl font-bold tabular-nums text-book-blue">
              {formatTime(elapsed)}
            </span>
            <Button variant="secondary" onClick={handleStop}>
              ⏹ 结束计时
            </Button>
          </>
        )}
        {stopped && (
          <>
            <span className="text-2xl font-bold tabular-nums text-leaf-green">
              ✅ 用时 {formatTime(elapsed)}
            </span>
            <Button variant="primary" size="md" onClick={handleConfirmStop}>
              确认并录入成绩
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                setStopped(false)
                setElapsed(0)
              }}
            >
              🔄 重新计时
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
