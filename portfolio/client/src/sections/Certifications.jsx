import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp } from '../animations/variants'
import { HiX, HiExternalLink, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

// ─── Import all your certificate images ───────────────────
// Make sure these files exist in client/src/assets/
import digiCert     from '../assets/digi cert.jpeg'
import studyComrade from '../assets/study comrade.jpeg'
import htmlCert     from '../assets/html.jpeg'
import promptCert from "../assets/propmt cert.jpeg";
import fsdCert      from '../assets/fsd cert.jpeg'
import codeCert     from '../assets/code cert.jpeg'
import aiCert       from '../assets/ai cert.jpeg'
import workshop     from '../assets/workshop.jpeg'
const CERTIFICATES = [
  {
    id: 1,
    org: 'KPR Institute',
    name: 'Digi Venture — 2nd Prize (HydroSmart Website)',
    type: 'Competition Winner Certificate',
    emoji: '🏆',
    color: '#ffd166',
    image: digiCert,
    highlight: true,
    year: '2025',
  },
  {
    id: 2,
    org: 'Study Comrade',
    name: 'Webinar Through Web Technologies',
    type: 'Webinar Participation Certificate',
    emoji: '🌐',
    color: '#00d4ff',
    image: studyComrade,
    year: '2025',
  },
  {
    id: 3,
    org: 'Sololearn',
    name: 'Introduction to HTML',
    type: 'Course Completion Certificate',
    emoji: '📄',
    color: '#ff4f6e',
    image: htmlCert,
    year: '2024',
  },
  {
    id: 4,
    org: 'Simplilearn',
    name: 'Introduction to Prompt Engineering',
    type: 'Course Completion Certificate',
    emoji: '🤖',
    color: '#b06dff',
    image: promptCert,
    year: '2025',
  },
  {
    id: 5,
    org: 'Novitech',
    name: 'Full Stack Development',
    type: 'Training Program Certificate',
    emoji: '💻',
    color: '#06ffa5',
    image: fsdCert,
    year: '2025',
  },
  {
    id: 6,
    org: 'Novitech',
    name: 'Build Your Brand, Land Your Job — Code, Create, Connect',
    type: 'Webinar Certificate',
    emoji: '🚀',
    color: '#ffd166',
    image: codeCert,
    year: '2025',
  },
  {
    id: 7,
    org: 'Kongu Engineering College',
    name: 'AI Prompting Certificate',
    type: 'Workshop Certificate',
    emoji: '🧠',
    color: '#38bdf8',
    image: aiCert,
    year: '2025',
  },
  {
    id: 8,
    org: 'KPRIET College',
    name: 'AI Workshop Certificate',
    type: 'Technical Workshop',
    emoji: '🔬',
    color: '#ff4f6e',
    image: workshop,
    year: '2025',
  },
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState(null)   // lightbox open cert
  const [lightboxIdx, setLightboxIdx] = useState(0) // lightbox nav index

  const openLightbox = (cert) => {
    setLightboxIdx(CERTIFICATES.findIndex(c => c.id === cert.id))
    setSelected(cert)
  }

  const closeLightbox = () => setSelected(null)

  const goPrev = (e) => {
    e.stopPropagation()
    const idx = (lightboxIdx - 1 + CERTIFICATES.length) % CERTIFICATES.length
    setLightboxIdx(idx)
    setSelected(CERTIFICATES[idx])
  }

  const goNext = (e) => {
    e.stopPropagation()
    const idx = (lightboxIdx + 1) % CERTIFICATES.length
    setLightboxIdx(idx)
    setSelected(CERTIFICATES[idx])
  }

  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goPrev(e)
    if (e.key === 'ArrowRight') goNext(e)
  }

  return (
    <section id="certifications" className="bg-white dark:bg-[#0a0e1a]">
      <div className="section-container" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Certifications
            </span>
            <h2 className="section-title mt-2">Verified Credentials</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              {CERTIFICATES.length} certificates earned through courses, workshops, and competitions.
              Click any card to view the certificate.
            </p>
          </motion.div>

          {/* Certificate Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTIFICATES.map((cert, i) => (
              <motion.div
                key={cert.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.22 }}
                onClick={() => openLightbox(cert)}
                className="group cursor-pointer"
              >
                <div className="card overflow-hidden h-full flex flex-col relative">
                  {/* Colored top strip */}
                  <div
                    className="h-1.5 w-full flex-shrink-0"
                    style={{ background: cert.color }}
                  />

                  {/* Certificate image thumbnail */}
                  <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0"
                    style={{ height: '140px' }}>
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <HiExternalLink size={13} /> View Certificate
                      </span>
                    </div>

                    {/* Winner badge */}
                    {cert.highlight && (
                      <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: cert.color }}>
                        🏆 Winner
                      </span>
                    )}

                    {/* Year badge */}
                    <span className="absolute top-2 right-2 text-xs font-mono px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm">
                      {cert.year}
                    </span>
                  </div>

                  {/* Text content */}
                  <div className="p-4 flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cert.emoji}</span>
                      <span
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: cert.color }}
                      >
                        {cert.org}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">
                      {cert.name}
                    </h3>

                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto">
                      {cert.type}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="mt-12">
            <div className="card p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <Stat value="8" label="Total Certificates" color="#4f46e5" />
                <Stat value="1" label="Competition Win" color="#ffd166" />
                <Stat value="3" label="Workshops" color="#06ffa5" />
                <Stat value="2025" label="Latest Year" color="#38bdf8" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-white dark:bg-[#161b2e] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div
                className="h-1.5 w-full"
                style={{ background: selected.color }}
              />

              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selected.emoji}</span>
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: selected.color }}
                    >
                      {selected.org} · {selected.year}
                    </p>
                    <h3 className="font-semibold text-gray-900 dark:text-white mt-0.5">
                      {selected.name}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {selected.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeLightbox}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex-shrink-0"
                >
                  <HiX size={20} />
                </button>
              </div>

              {/* Certificate image — full size */}
              <div className="relative bg-gray-100 dark:bg-gray-900">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full max-h-[65vh] object-contain"
                />

                {/* Prev / Next navigation */}
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  aria-label="Previous certificate"
                >
                  <HiChevronLeft size={20} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  aria-label="Next certificate"
                >
                  <HiChevronRight size={20} />
                </button>
              </div>

              {/* Footer: counter + dots */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-400 font-mono">
                  {lightboxIdx + 1} / {CERTIFICATES.length}
                </p>
                <div className="flex gap-1.5">
                  {CERTIFICATES.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation()
                        setLightboxIdx(i)
                        setSelected(CERTIFICATES[i])
                      }}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{
                        background: i === lightboxIdx ? selected.color : '#cbd5e1',
                        transform: i === lightboxIdx ? 'scale(1.4)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Press ← → or click arrows to navigate
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Stat({ value, label, color }) {
  return (
    <div>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
    </div>
  )
}