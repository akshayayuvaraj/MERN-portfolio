import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../animations/variants'
import {
  adminLogin, getMessages, deleteMessage, markMessageRead, getStats
} from '../services/api'
import toast from 'react-hot-toast'
import { HiTrash, HiMail, HiMailOpen, HiDownload, HiLogout, HiChartBar } from 'react-icons/hi'

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'))
  const [messages, setMessages] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [creds, setCreds] = useState({ username: '', password: '' })
  const [activeTab, setActiveTab] = useState('messages')

  useEffect(() => {
    if (isLoggedIn) {
      fetchData()
    }
  }, [isLoggedIn])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [msgsRes, statsRes] = await Promise.all([getMessages(), getStats()])
      setMessages(msgsRes.data.data || [])
      setStats(statsRes.data.data || {})
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await adminLogin(creds)
      localStorage.setItem('adminToken', res.data.token)
      setIsLoggedIn(true)
      toast.success('Welcome back!')
    } catch {
      toast.error('Invalid credentials')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    setMessages([])
    setStats(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await deleteMessage(id)
      setMessages(prev => prev.filter(m => m._id !== id))
      toast.success('Deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id)
      setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m))
    } catch {
      toast.error('Failed to update')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl font-mono">A</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Akshaya Portfolio Dashboard</p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={creds.username}
                  onChange={e => setCreds(p => ({ ...p, username: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={creds.password}
                  onChange={e => setCreds(p => ({ ...p, password: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center mt-2">
                Login
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
          <HiLogout size={16} /> Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Messages" value={stats.totalMessages || 0} icon={HiMail} />
            <StatCard label="Unread" value={stats.unreadMessages || 0} icon={HiMail} color="text-blue-500" />
            <StatCard label="Resume Downloads" value={stats.resumeDownloads || 0} icon={HiDownload} color="text-green-500" />
            <StatCard label="Today's Visits" value={stats.todayVisits || 0} icon={HiChartBar} color="text-purple-500" />
          </div>
        )}

        {/* Messages */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Messages ({messages.length})
            </h2>
            <button onClick={fetchData} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No messages yet.</div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-5 ${!msg.isRead ? 'bg-blue-50/50 dark:bg-blue-500/5' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{msg.name}</p>
                        {!msg.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{msg.email} · {new Date(msg.createdAt).toLocaleDateString()}</p>
                      {msg.subject && (
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{msg.subject}</p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400">{msg.message}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {!msg.isRead && (
                        <button
                          onClick={() => handleMarkRead(msg._id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
                          title="Mark as read"
                        >
                          <HiMailOpen size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        title="Delete"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color = 'text-gray-500' }) {
  return (
    <div className="card p-5">
      <div className={`${color} mb-2`}>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
    </div>
  )
}