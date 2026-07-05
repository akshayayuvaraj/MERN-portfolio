import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Experience from '../sections/Experience'
import Certifications from '../sections/Certifications'
import FunZone from '../sections/FunZone'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0e1a]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <FunZone />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}