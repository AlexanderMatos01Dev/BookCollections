"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Book, BookFormData } from "@/types/book"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ActionButton } from "@/components/buttons/action-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookPlus, Save } from "lucide-react"

interface BookFormProps {
  initialData?: Book
  onSubmit: (data: BookFormData) => void
  onCancel?: () => void
}

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Biography",
  "History",
  "Self-Help",
]

const COVER_COLORS = ["red", "green", "blue", "purple", "yellow", "orange", "pink", "teal"]

export function BookForm({ initialData, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    genre: "Fiction",
    pages: 0,
    isRead: false,
    coverColor: "blue",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        genre: initialData.genre,
        pages: initialData.pages,
        isRead: initialData.isRead,
        coverColor: initialData.coverColor,
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isRead: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Título del formulario que cambia según si es edición o creación */}
      <h2 className="text-xl font-bold form-title" data-testid="form-title">
        {initialData ? "Editar Libro" : "Add Book"}
      </h2>
      
      <div className="space-y-2">
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="genre">Genre</Label>
        <Select value={formData.genre} onValueChange={(value) => handleSelectChange("genre", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {GENRES.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pages">Number of Pages</Label>
        <Input id="pages" name="pages" type="number" value={formData.pages} onChange={handleChange} min={1} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverColor">Cover Color</Label>
        <Select value={formData.coverColor} onValueChange={(value) => handleSelectChange("coverColor", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select cover color" />
          </SelectTrigger>
          <SelectContent>
            {COVER_COLORS.map((color) => (
              <SelectItem key={color} value={color}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="isRead" checked={formData.isRead} onCheckedChange={handleCheckboxChange} />
        <Label htmlFor="isRead">I've read this book</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && <ActionButton type="button" variant="outline" label="Cancel" onClick={onCancel} />}
        <ActionButton
          type="submit"
          icon={initialData ? <Save className="h-4 w-4" /> : <BookPlus className="h-4 w-4" />}
          label={initialData ? "Save Changes" : "Add Book"}
        />
      </div>
    </form>
  )
}

