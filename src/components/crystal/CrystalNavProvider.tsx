import { useCallback, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SITE_SECTIONS, type SiteSection } from "@/content/sections"
import { CrystalNavContext, type CrystalNav, type CrystalState } from "@/hooks/useCrystalNav"

function matchSection(pathname: string): SiteSection | null {
  return SITE_SECTIONS.find((section) => section.route === pathname) ?? null
}

/** Provê o estado do cristal (A/B/C) derivado da rota + expansão local. */
export function CrystalNavProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)

  const activeSection = matchSection(location.pathname)

  const expand = useCallback(() => setIsExpanded(true), [])
  const collapse = useCallback(() => setIsExpanded(false), [])

  const goToSection = useCallback(
    (id: string) => {
      const section = SITE_SECTIONS.find((s) => s.id === id)
      if (!section) return
      setIsExpanded(false)
      navigate(section.route)
    },
    [navigate],
  )

  const goHome = useCallback(() => {
    setIsExpanded(false)
    navigate("/")
  }, [navigate])

  const state: CrystalState = activeSection ? "section" : isExpanded ? "expanded" : "hero"

  const value = useMemo<CrystalNav>(
    () => ({ state, activeSection, expand, collapse, goToSection, goHome }),
    [state, activeSection, expand, collapse, goToSection, goHome],
  )

  return <CrystalNavContext.Provider value={value}>{children}</CrystalNavContext.Provider>
}
