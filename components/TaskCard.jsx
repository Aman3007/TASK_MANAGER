import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, CheckCircle, Circle } from 'lucide-react'

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const isPending = task.status === 'Pending'

  const formatDate = (date) =>
    new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <Card
      className={`
        relative overflow-hidden transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        ${isPending ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-green-500 opacity-80'}
      `}
    >
      {/* STATUS BADGE */}
      <span
        className={`
          absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full
          ${isPending
            ? 'bg-blue-100 text-blue-700'
            : 'bg-green-100 text-green-700'}
        `}
      >
        {task.status}
      </span>

      <CardHeader className="pb-2">
        <CardTitle
          className={`text-lg font-semibold ${
            !isPending ? 'line-through text-gray-400' : 'text-gray-900'
          }`}
        >
          {task.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p
          className={`text-sm leading-relaxed ${
            !isPending ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {task.content}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Created: {formatDate(task.createdAt)}</span>
          {task.updatedAt !== task.createdAt && (
            <span>Updated: {formatDate(task.updatedAt)}</span>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onToggleStatus(task._id, task.status)}
            className="hover:bg-blue-50"
            title="Toggle status"
          >
            {isPending ? (
              <Circle className="h-5 w-5 text-blue-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(task)}
            className="hover:bg-yellow-50"
            title="Edit task"
          >
            <Edit className="h-4 w-4 text-yellow-600" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(task._id)}
            className="hover:bg-red-50"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
