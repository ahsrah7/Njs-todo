"use client"
import { useState } from "react";
import { createTodo } from "../app/actions/todo";
import { toast } from "react-toastify";

const todo = createTodo;

export function CreateTodo(){
    const [title,setTitle] = useState<string>("")
    const [description,setDescription] = useState<string>("")


    async function createTodoHandler(){
        const response = await todo(title,description);
        if(response){
            toast.success("Todo created!")
            setTitle("");
            setDescription("");
        }else{
            console.log(response);
            
            toast.error("Something went wrong!")
        }
    }
  return <div className="h-screen flex mt-10 flex-col items-center ">
  {/* <div className="flex justify-center"> */}
  <div className="block w-8/12 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div>
              <div className="px-10">
                  <div className=" text-xl md:text-3xl text-center text-black font-bold">
                      Create Todo
                  </div>
              </div>
              <div className="flex flex-col">
                  <div>
                  <LabelledInput label="Title" placeholder="Go to gym" onChange={(e)=>{setTitle(e.target.value)}} value={title} name="title" />
                  <LabelledInput label="Description" placeholder="Set alarm for 6:00 am, fresh up and start for gym." onChange={(e)=>{setDescription(e.target.value)}} value={description} name="description" />
                  </div>
                  <div>
                  <button onClick={createTodoHandler} type="button" className="mt-8 w-full float-none lg:float-right lg:w-3/12 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add a todo</button>
                  </div>
              </div>
          </div>
      </div>
  {/* </div> */}
</div>
}

interface LabelledInputType {
label: string;
placeholder: string;
type?: string;
onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void;
value?: string;
name:string;
}

function LabelledInput({ label, placeholder, type, onChange, value, name}: LabelledInputType) {
return <div>
  <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
  <input  type={type || "text"} onChange={onChange} value={value} name={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div>
}


