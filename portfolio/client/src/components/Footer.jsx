import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { SiLeetcode } from 'react-icons/si'

const socials = [
  { icon: FaGithub, href: 'https://github.com/akshayayuvaraj', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/akshaya-y', label: 'LinkedIn' },
  { icon: SiLeetcode, href: 'https://leetcode.com/u/akshaya_yuvaraj/', label: 'LeetCode' },
  { icon: HiMail, href: 'mailto:ibmakshaya@gmail.com', label: 'Email' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-[#0a1628] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs font-mono">A</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white text-sm">
              Akshaya<span className="text-blue-600 dark:text-blue-400"></span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {year} Akshaya Y — Built with React & ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}