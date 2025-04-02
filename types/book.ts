export interface Book {
  id: string
  title: string
  author: string
  genre: string
  pages: number
  isRead: boolean
  coverColor: string
  dateAdded: string
}

export type BookFormData = Omit<Book, "id" | "dateAdded">

