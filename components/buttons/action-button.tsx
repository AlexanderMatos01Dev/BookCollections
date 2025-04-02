"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import type { ReactNode } from "react"

interface ActionButtonProps extends ButtonProps {
  icon?: ReactNode
  label: string
  onClick?: () => void
}

export function ActionButton({
  icon,
  label,
  onClick,
  variant = "default",
  size = "default",
  className,
  ...props
}: ActionButtonProps) {
  return (
    <Button variant={variant} size={size} onClick={onClick} className={className} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Button>
  )
}

