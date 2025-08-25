import { Link } from 'react-router-dom';
import TodoItemForm from '../TodoItemForm';
import { createTodo } from '../../api/services/todos.service';

export default function AddTodo() {
  const { mutate: addTodo } = createTodo();

  return (
    <div className="w-full mt-2 items-center bg-gray-100 p-4">
      <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mt-2 px-2 rounded' to={'/todos'}>Back</Link>
      <h1 className="text-4xl font-bold mb-4">New Todo</h1>
      <TodoItemForm todoItem={undefined} handleSubmit={addTodo} action="Add Todo" />
    </div>
  );
}