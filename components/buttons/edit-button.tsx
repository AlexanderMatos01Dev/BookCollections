"use client"

import { Pencil } from "lucide-react"
import { ActionButton } from "./action-button"

interface EditButtonProps {
  onEdit: () => void
  size?: "default" | "sm" | "lg" | "icon"
}

export function EditButton({ onEdit, size = "default" }: EditButtonProps) {
  return (
    <ActionButton
      variant="outline"
      size={size}
      icon={<Pencil className="h-4 w-4" />}
      label={size === "icon" ? "" : "Edit"}
      onClick={onEdit}
      aria-label="Edit"
    />
  )
}

