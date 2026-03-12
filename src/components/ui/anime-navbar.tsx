"use client"

import React, { useEffect, useState, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import Icon from "../../components/AppIcon"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface NavItem {
  name: string
  url: string
  icon: string
}

interface AnimeNavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
  extraLeft?: ReactNode
  extraRight?: ReactNode
}

export function AnimeNavBar({ items, className, defaultActive = "Dashboard", extraLeft, extraRight }: AnimeNavBarProps) {
  const location = useLocation()
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  
  const currentItem = items.find(i => i.url === location.pathname)
  const [activeTab, setActiveTab] = useState(currentItem ? currentItem.name : defaultActive)

  useEffect(() => {
    const current = items.find(i => i.url === location.pathname)
    if (current) setActiveTab(current.name)
  }, [location.pathname, items])

  return (
    <div className={cn("fixed top-4 left-0 right-0 z-[9999] pointer-events-none px-4", className)}>
      <div className="flex justify-center pt-1.5">
        <motion.div 
          className="flex items-center gap-1 sm:gap-2 bg-black/70 border border-white/10 backdrop-blur-2xl py-1.5 px-2 rounded-full shadow-2xl relative pointer-events-auto"
        >
          {extraLeft && (
            <div className="flex items-center pr-2 sm:pr-4 pl-1 sm:pl-2 border-r border-white/10 mr-1">
              {extraLeft}
            </div>
          )}

          {items.map((item) => {
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 lg:px-6 py-2.5 rounded-full transition-all duration-300",
                  "text-white/70 hover:text-white",
                  isActive && "text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                    <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />
                    
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      style={{
                        animation: "shine 3s ease-in-out infinite"
                      }}
                    />
                  </motion.div>
                )}

                <motion.span
                  className="hidden md:inline relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span 
                  className="md:hidden relative z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon name={item.icon} size={18} strokeWidth={2.5} />
                </motion.span>
          
                <AnimatePresence>
                {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>
              </Link>
            )
          })}

          {extraRight && (
            <div className="flex items-center pl-2 sm:pl-4 pr-1 sm:pr-2 border-l border-white/10 ml-1">
              {extraRight}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
