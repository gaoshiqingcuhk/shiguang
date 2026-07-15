import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScreeningProvider } from './context/ScreeningContext'
import { HomePage } from './pages/HomePage'
import { ConsentPage } from './pages/ConsentPage'
import { StartPage } from './pages/StartPage'
import { CharRecognitionPage } from './pages/CharRecognitionPage'
import { RapidNamingPage } from './pages/RapidNamingPage'
import { PhonemePage } from './pages/PhonemePage'
import { ResultPage } from './pages/ResultPage'
import { InterventionPage } from './pages/InterventionPage'
import { LearnPage } from './pages/LearnPage'
import { AboutPage } from './pages/AboutPage'

export default function App() {
  return (
    <ScreeningProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/consent" element={<ConsentPage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/screening/char-recognition" element={<CharRecognitionPage />} />
          <Route path="/screening/rapid-naming" element={<RapidNamingPage />} />
          <Route path="/screening/phoneme" element={<PhonemePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/intervention" element={<InterventionPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </ScreeningProvider>
  )
}
