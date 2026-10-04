import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import FirstTimer from './pages/FirstTimer'
import Classes from './pages/Classes'
import ClassDetail from './pages/ClassDetail'
import Instructors from './pages/Instructors'
import Schedule from './pages/Schedule'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="our-story" element={<OurStory />} />
        <Route path="first-timer" element={<FirstTimer />} />
        <Route path="classes" element={<Classes />} />
        <Route path="classes/:slug" element={<ClassDetail />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
