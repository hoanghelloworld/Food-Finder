"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"
import { LabelProvider } from '@/context/LabelContext'

function Provider({children}) {
  return (
    <LabelProvider>
    <SessionProvider>
            {children}
    </SessionProvider>
    </LabelProvider>
  )
}

export default Provider