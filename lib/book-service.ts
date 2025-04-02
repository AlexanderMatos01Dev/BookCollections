import type { Book, BookFormData } from "@/types/book"
import { loadBooks, saveBooks } from "./storage"

export const getBooks = (): Book[] => {
  return loadBooks()
}

export const addBook = (bookData: BookFormData): Book => {
  const books = loadBooks()

  const newBook: Book = {
    ...bookData,
    id: crypto.randomUUID(),
    dateAdded: new Date().toISOString(),
  }

  const updatedBooks = [newBook, ...books]
  saveBooks(updatedBooks)

  return newBook
}

export const updateBook = (id: string, bookData: BookFormData): Book | null => {
  const books = loadBooks()
  const bookIndex = books.findIndex((book) => book.id === id)

  if (bookIndex === -1) return null

  const updatedBook: Book = {
    ...books[bookIndex],
    ...bookData,
  }

  books[bookIndex] = updatedBook
  saveBooks(books)

  return updatedBook
}

export const deleteBook = (id: string): boolean => {
  const books = loadBooks()
  const updatedBooks = books.filter((book) => book.id !== id)

  if (updatedBooks.length === books.length) return false

  saveBooks(updatedBooks)
  return true
}

