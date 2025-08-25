import { ErrorMessage, Field, Form, Formik } from 'formik';
import type { TodoInput, TodoItem } from '../api/types/todo.types';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';


type Props = {
  action: string;
  todoItem: TodoItem | undefined;
  handleSubmit: (values: TodoInput) => void;
}

export default function TodoItemForm({ action, todoItem, handleSubmit }: Props) {
  return (
    <Formik
      initialValues={{
        id: Math.floor(Math.random() * 10000).toString(),
        title: todoItem?.title || '',
        complete: todoItem ? todoItem?.complete : false
      }}
      validationSchema={toFormikValidationSchema(z.object({
        title: z.string().min(2).max(100).nonempty(),
      }))}
      onSubmit={(values: TodoInput) => handleSubmit(values)}
    >
      <Form>
        <div className="mb-2">
          <label htmlFor="title" className="mr-2">
            Title
          </label>
          <Field
            name="title"
            type="text"
            id="title"
            className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage name="title" component="span" className="text-red-500" />
        </div>
        <div>
          <label htmlFor="complete" className="mr-2">
            Complete
          </label>
          <Field name="complete" type="checkbox" id="complete" />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mt-2 px-2 rounded">
          {action}
        </button>
      </Form>
    </Formik>
  );
}
