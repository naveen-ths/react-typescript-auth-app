import { useParams } from 'react-router-dom';
import TodoItemForm from '../TodoItemForm';
import { getTodo, editTodo } from '../../api/services/todos.service';

export default function EditTodo() {
  const { id } = useParams();
  const { data: todoItem, isLoading } = getTodo(id ? parseInt(id) : 0);

  const { mutate: updateTodo } = editTodo(id ? parseInt(id) : 0);
  return (
    <div className="w-full mt-2 items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Edit Todo</h1>
      {isLoading ? <h1>Fetching todo...</h1> : <TodoItemForm todoItem={todoItem} handleSubmit={updateTodo} action="Edit Todo" />}
    </div>
  );
}