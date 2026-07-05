import { useState } from 'react'
import { sendContactMessage } from '../services/api'
import toast from 'react-hot-toast'

const INITIAL = { name: '', email: '', subject: '', message: '' }

/**
 * useContact
 * Encapsulates contact form state, validation, and submission.
 * Makes Contact.jsx easy to explain in interviews — logic lives here,
 * the component only handles rendering.
 */
export function useContact() {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await sendContactMessage(form)
      toast.success("Message sent! I'll get back to you soon 🙌")
      setForm(INITIAL)
      setErrors({})
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return { form, errors, loading, handleChange, handleSubmit }
}