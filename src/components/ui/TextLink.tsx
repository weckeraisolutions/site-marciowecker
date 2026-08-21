import type { AnchorHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

/**
 * Link inline no corpo do texto. Sublinhado dourado fino que cresce no hover,
 * mantendo a legibilidade do parágrafo.
 */
export function TextLink({ children, className, ...props }: TextLinkProps) {
  return (
    <a
      className={cn(
        "group relative inline-block text-current transition-colors hover:text-champagne",
        "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left",
        "after:scale-x-0 after:bg-champagne after:transition-transform after:duration-300",
        "hover:after:scale-x-100 focus-visible:after:scale-x-100",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
