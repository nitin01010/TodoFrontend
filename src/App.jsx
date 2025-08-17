import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { handleCreateTodo, handleDeleteTodo, handleEditTodo, handleTodo } from "./api/api";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";

const App = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['todo'],
    queryFn: handleTodo,
    refetchInterval: 30000,
  });
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
    task: '',
  });

  const HandleInput = (e) => {
    let { name, value } = e.target;
    setInput(values => ({ ...values, [name]: value }))
    setError(false);
  }

  const mutation = useMutation({
    mutationFn: (task) => handleCreateTodo(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  });

  const handleClick = () => {
    const { task } = input;
    if (!task) {
      setError(true);
    }

    if (task) {
      mutation.mutate(task);
      toast.success("Todo created");
    }

    setInput({ task: '' });
  }

  const mutation2 = useMutation({
    mutationFn: (id) => handleDeleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  });

  const handleDelete = (id) => {
    mutation2.mutate(id);
    toast.error("Todo deleted");
  }

  const mutation3 = useMutation({
    mutationFn: (updates) => handleEditTodo(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  });

  const handleEdit = (id) => {
    const update = prompt('Update task');
    if (!update) return;
    const updates = { id, update }
    mutation3.mutate(updates);
    toast.success("Todo updated");
  }

  return (
    <div className=' bg-gray-100 shadow-2xl  mt-10  rounded p-5 w-full  md:w-[70%] m-auto '>
      <h1 className=' text-center text-xl font-bold'>Todo Appliction</h1>
      <div className=" flex flex-col mt-10">
        {error ? <p className=" py-2 px-1 text-red-600">Please enter a valid task</p> : null}
        <div className=" bg-white rounded-md flex  shadow-2xl  w-full">
          <input className=" w-full p-3  h-[50px] outline-none border-none px-4" type="text" placeholder="Enter your task" name="task" value={input.task} onChange={(e) => HandleInput(e)} />
          <button onClick={handleClick} className=" bg-black text-white cursor-pointer rounded w-[100px]">submit</button>
        </div>
      </div>
      <div className="mt-5 p-1">
        {
          data?.data?.reverse()?.map((item) => {
            return (
              <div key={item._id} className="mt-2 py-2 flex justify-between items-center hover:shadow-2xl transition-all ease-linear px-2 rounded">
                <p>{item.task}</p>
                <div className=" flex items-center justify-center gap-4">
                  <span onClick={() => handleDelete(item._id)} className="material-symbols-outlined cursor-pointer">
                    delete
                  </span>
                  <Pencil onClick={() => handleEdit(item._id)} size={20} />
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default App