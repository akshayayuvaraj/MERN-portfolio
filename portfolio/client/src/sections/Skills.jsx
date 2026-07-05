import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { staggerContainer, fadeUp } from '../animations/variants'
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPython
} from 'react-icons/si'

import { FaJava, FaCss3Alt } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'

const skillGroups = [
  {
    category: 'Frontend',
    color: 'from-orange-400 to-red-500',
    skills: [
      { name: 'HTML', icon: SiHtml5, level: 90, color: '#E34F26' },
      { name: 'CSS', icon: FaCss3Alt, level: 85, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, level: 80, color: '#F7DF1E' },
      { name: 'React', icon: SiReact, level: 78, color: '#61DAFB' },
      { name: 'Tailwind', icon: SiTailwindcss, level: 82, color: '#06B6D4' },
    ],
  },
  {
    category: 'Backend',
    color: 'from-green-400 to-emerald-500',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 75, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, level: 72, color: '#000000' },
      { name: 'MongoDB', icon: SiMongodb, level: 70, color: '#47A248' },
    ],
  },
  {
    category: 'Programming',
    color: 'from-blue-400 to-indigo-500',
    skills: [
      { name: 'Java', icon: FaJava, level: 85, color: '#007396' },
      { name: 'Python', icon: SiPython, level: 65, color: '#3776AB' },
    ],
  },
  {
    category: 'Tools',
    color: 'from-purple-400 to-violet-500',
    skills: [
      { name: 'Git', icon: SiGit, level: 80, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, level: 82, color: '#181717' },
      { name: 'VS Code', icon: VscVscode, level: 90, color: '#007ACC' },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="bg-white dark:bg-[#0f172a]">
      <div className="section-container" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-sm font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Skills
            </span>
            <h2 className="section-title mt-2">My Tech Stack</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Tools and technologies I use to build reliable, scalable software.
            </p>
          </motion.div>

          {/* Skill Groups */}
          <div className="grid sm:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <motion.div key={group.category} variants={fadeUp}>
                <div className="card p-6 h-full">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${group.color}`} />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-4">
                    {group.skills.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        isInView={isInView}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skill Icons grid */}
          <motion.div variants={fadeUp} className="mt-12">
            <div className="card p-8">
              <h3 className="text-center text-sm font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">
                All Technologies
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {skillGroups.flatMap(g => g.skills).map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="flex flex-col items-center gap-2 group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
                      <skill.icon size={24} color={skill.color} />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillBar({ skill, isInView }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <skill.icon size={16} color={skill.color} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {skill.name}
          </span>
        </div>
        <span className="text-xs text-gray-400 font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}