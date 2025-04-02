import type { Book } from "@/types/book"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookIcon, CheckCircle2 } from "lucide-react"
import { DeleteButton } from "./buttons/delete-button"
import { EditButton } from "./buttons/edit-button"

interface BookCardProps {
  book: Book
  onEdit: (book: Book) => void
  onDelete: (id: string) => void
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const formattedDate = new Date(book.dateAdded).toLocaleDateString()

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div
          className="w-full h-24 rounded-md flex items-center justify-center mb-2"
          style={{ backgroundColor: book.coverColor }}
        >
          <BookIcon className="h-12 w-12 text-white" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground">by {book.author}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Badge variant="outline">{book.genre}</Badge>
            {book.isRead && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Read
              </Badge>
            )}
          </div>
          <p className="text-sm">
            <span className="text-muted-foreground">Pages:</span> {book.pages}
          </p>
          <p className="text-xs text-muted-foreground">Added on {formattedDate}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <EditButton onEdit={() => onEdit(book)} size="sm" />
        <DeleteButton onDelete={() => onDelete(book.id)} size="sm" />
      </CardFooter>
    </Card>
  )
}

