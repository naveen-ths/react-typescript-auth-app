import { useNavigate } from 'react-router-dom';
import { getTodos, deleteTodo } from '../../api/services/todos.service';


export default function Todo() {

  const { data: todos, isLoading, isError } = getTodos();
  const navigate = useNavigate();
  const { mutate: doDeleteTodo } = deleteTodo();

  return (
    <div className="w-full mt-2 items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Todo List</h1>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 ml-2 rounded mb-4" onClick={() => navigate('/todos/add-todo')}>New Todo</button>
      <hr className="mb-2" />
      {
        isLoading ? <h1>Loading...</h1> : isError ? <h1>Error fetching todos</h1> : (
          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-left">Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos?.map(todo => {
                return (
                  <tr key={todo.id}>
                    <td className={`${todo.complete ? 'line-through' : ''}`}>{todo.title}</td>
                    <td className='px-4 py-2'>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 rounded" onClick={() => navigate(`/todos/edit-todo/${todo.id}`)}>Edit</button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded" onClick={() => doDeleteTodo(todo.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        )
      }
    </div>
  )
}
