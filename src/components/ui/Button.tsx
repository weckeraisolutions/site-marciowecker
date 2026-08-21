import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "link" | "solid"

interface BaseProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined }

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

/* Estilo de link de texto com sublinhado dourado no hover (padrão do site, ex.: "ENVIAR ↳").
   Regra do dourado: linha fina, nunca preenchendo o elemento inteiro. */
const linkStyle = cn(
  "group inline-flex w-fit items-center gap-2 font-eyebrow text-[length:var(--text-eyebrow)]",
  "font-medium uppercase tracking-[var(--tracking-eyebrow)] text-champagne transition-colors",
  "after:mt-1 after:block after:h-px after:w-0 after:bg-champagne after:transition-all",
  "after:duration-300 hover:after:w-full focus-visible:after:w-full",
)

/* Variante sólida discreta: borda dourada fina, fundo translúcido. O dourado nunca
   preenche o botão inteiro. */
const solidStyle = cn(
  "inline-flex w-fit items-center gap-2 rounded-sm border border-champagne/40 px-5 py-2.5",
  "font-eyebrow text-[length:var(--text-eyebrow)] font-medium uppercase",
  "tracking-[var(--tracking-eyebrow)] text-champagne transition-colors",
  "hover:border-champagne hover:bg-champagne/5",
)

/** CTA do site. Renderiza <a> quando recebe href, senão <button>. */
export function Button({ children, variant = "link", className, ...props }: ButtonProps) {
  const classes = cn(variant === "link" ? linkStyle : solidStyle, className)

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
