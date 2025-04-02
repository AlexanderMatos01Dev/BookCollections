import type { Book } from "@/types/book"

const STORAGE_KEY = "book-collection"

export const saveBooks = (books: Book[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  } catch (error) {
    console.error("Error saving books to localStorage:", error)
  }
}

export const loadBooks = (): Book[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error loading books from localStorage:", error)
    return []
  }
}

