import type { Book } from "@/types/book"
import { BookCard } from "./book-card"

interface BookListProps {
  books: Book[]
  onEditBook: (book: Book) => void
  onDeleteBook: (id: string) => void
}

export function BookList({ books, onEditBook, onDeleteBook }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">Your collection is empty. Add your first book to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEditBook} onDelete={onDeleteBook} />
      ))}
    </div>
  )
}

