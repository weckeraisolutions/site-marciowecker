import type { ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: ReactNode
  className?: string
  /** Elemento semântico do wrapper (default: div). */
  as?: ElementType
}

/** Largura máxima centralizada com padding lateral responsivo. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  )
}
