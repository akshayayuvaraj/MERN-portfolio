import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, slideLeft, slideRight } from '../animations/variants'
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { sendContactMessage } from '../services/api'
import toast from 'react-hot-toast'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      await sendContactMessage(form)
      toast.success('Message sent! I\'ll get back to you soon 🙌')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-white dark:bg-[#0f172a]">
      <div className="section-container" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Contact
            </span>
            <h2 className="section-title mt-2">Let's connect</h2>
            <p className="section-subtitle max-w-md mx-auto">
              Open to internship and full-time opportunities. Drop me a message.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div variants={slideLeft} className="lg:col-span-2 space-y-6">
              <div className="card p-6 space-y-5">
                <ContactInfo
                  icon={HiMail}
                  label="Email"
                  value="ibmakshaya@gmail.com"
                  href="ibmakshaya@gmail.com"
                />
                <ContactInfo
                  icon={HiLocationMarker}
                  label="Location"
                  value="Tamil Nadu, India"
                />
              </div>

              {/* Social */}
              <div className="card p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Find me on</p>
                <div className="flex gap-4">
                  <SocialLink
                    icon={FaGithub}
                    label="GitHub"
                    href="https://github.com/akshayayuvaraj"
                  />
                  <SocialLink
                    icon={FaLinkedin}
                    label="LinkedIn"
                    href="https://www.linkedin.com/in/akshaya-y"
                    color="text-blue-600 dark:text-blue-400"
                  />
                  <SocialLink
                    label="LC"
                    href="https://leetcode.com/u/akshaya_yuvaraj/"
                    color="text-yellow-500"
                    text="LeetCode"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="card p-5 border border-green-100 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-sm font-medium text-green-700 dark:text-green-400">
                    Available for opportunities
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-5">
                  Actively looking for SDE internships and entry-level roles.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={slideRight} className="lg:col-span-3">
              <div className="card p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      label="Name *"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                    <FormField
                      label="Email *"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>
                  <FormField
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Internship opportunity, collaboration..."
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about the role, project, or just say hi..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FormField({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
      />
    </div>
  )
}

function ContactInfo({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
        <Icon className="text-blue-600 dark:text-blue-400" size={18} />
      </div>
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </a>
    )
  }
  return content
}

function SocialLink({ icon: Icon, label, href, color = 'text-gray-700 dark:text-gray-300', text }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${color}`}
    >
      {Icon && <Icon size={16} />}
      {text && <span className="text-sm font-mono font-bold">{text}</span>}
      <span className="text-sm font-medium">{label}</span>
    </a>
  )
}