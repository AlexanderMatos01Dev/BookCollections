"use client"

import { useState, useEffect } from "react"
import type { Book, BookFormData } from "@/types/book"
import { BookForm } from "@/components/forms/book-form"
import { BookList } from "@/components/book-list"
import { addBook, deleteBook, getBooks, updateBook } from "@/lib/book-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Library } from "lucide-react"

export default function BookCollection() {
  const [books, setBooks] = useState<Book[]>([])
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load books from local storage on component mount
  useEffect(() => {
    setBooks(getBooks())
  }, [])

  const handleAddBook = (bookData: BookFormData) => {
    const newBook = addBook(bookData)
    setBooks((prevBooks) => [newBook, ...prevBooks])
  }

  const handleUpdateBook = (bookData: BookFormData) => {
    if (!editingBook) return

    const updatedBook = updateBook(editingBook.id, bookData)
    if (updatedBook) {
      setBooks((prevBooks) => prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
    }

    setEditingBook(null)
    setIsDialogOpen(false)
  }

  const handleDeleteBook = (id: string) => {
    const success = deleteBook(id)
    if (success) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
    }
  }

  const handleEditBook = (book: Book) => {
    setEditingBook(book)
    setIsDialogOpen(true)
  }

  const readBooks = books.filter((book) => book.isRead)
  const unreadBooks = books.filter((book) => !book.isRead)

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Library className="h-8 w-8" />
          Book Collection Manager
        </h1>
        <p className="text-muted-foreground mt-2">Keep track of your personal library</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add New Book</CardTitle>
            <CardDescription>Fill in the details to add a book to your collection</CardDescription>
          </CardHeader>
          <CardContent>
            <BookForm onSubmit={handleAddBook} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Books ({books.length})</TabsTrigger>
              <TabsTrigger value="read">Read ({readBooks.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadBooks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <BookList books={books} onEditBook={handleEditBook} onDeleteBook={handleDeleteBook} />
            </TabsContent>

            <TabsContent value="read">
              <BookList books={readBooks} onEditBook={handleEditBook} onDeleteBook={handleDeleteBook} />
            </TabsContent>

            <TabsContent value="unread">
              <BookList books={unreadBooks} onEditBook={handleEditBook} onDeleteBook={handleDeleteBook} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {editingBook && (
            <BookForm initialData={editingBook} onSubmit={handleUpdateBook} onCancel={() => setIsDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

