"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function DataThemeSync() {
  const { theme, resolvedTheme } = useTheme()
  React.useEffect(() => {
    const current = theme === "system" ? resolvedTheme : theme
    if (current) {
      document.documentElement.setAttribute("data-theme", current)
    }
  }, [theme, resolvedTheme])
  return null
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark"
    >
      <DataThemeSync />
      {children}
    </NextThemesProvider>
  )
}
