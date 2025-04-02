"use client"

import { Trash2 } from "lucide-react"
import { ActionButton } from "./action-button"

interface DeleteButtonProps {
  onDelete: () => void
  size?: "default" | "sm" | "lg" | "icon"
}

export function DeleteButton({ onDelete, size = "default" }: DeleteButtonProps) {
  return (
    <ActionButton
      variant="destructive"
      size={size}
      icon={<Trash2 className="h-4 w-4" />}
      label={size === "icon" ? "" : "Delete"}
      onClick={onDelete}
      aria-label="Delete"
    />
  )
}

