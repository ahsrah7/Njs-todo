"use client"

import { listTodo,markTodoAsDone } from "@/app/actions/todo"
import { Card } from "./Card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const todos = listTodo;

interface Todo { id: number; title: string; description: string; isDone: boolean; }

export const Todos =  ()=>{
    const router = useRouter();
    const [todoList,setTodoList] = useState<Todo[]>([])
    const getTodos = async ()=>{
        const result = await todos();
        if(result)
        {
        setTodoList(result);
        }
        else{
            toast.error("something went wrong!")
        }
    }

    useEffect(()=>{
        getTodos();
    },[])
    const onClickHandler = async (id:number) =>{
        try{
            const updatedTodo = await markTodoAsDone(id);
            if(updatedTodo){
                setTodoList(currState=>{
                    const newTodoList = currState.map(todo=>{
                        if(todo.id === updatedTodo.id){
                            let obj = {...todo};
                            obj.isDone = updatedTodo.isDone;
                            return obj
                        }
                        return todo;
                    });
                    return newTodoList
                })
                toast.success(`${updatedTodo.title} is marked done.` )
            }
        }catch(e){
            console.log(e);
            toast.error("something went wrong")
            
        }

        
    }
    return <div className="flex flex-col">
        <div className="w-full  border-b border-slate-400">
        <div>
                <p className="pl-8 font-bold text-2xl">In progress</p>
            </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
        {
            todoList?.filter(todo=>todo.isDone == false).map(todo=><Card key={todo.id} id={todo.id} isDone={todo.isDone} title={todo.title} description={todo.description} onClick={onClickHandler} />)
        }
    </div>
        </div>
        <div className="w-full  mt-10">
            <div>
                <p className="pl-8 font-bold text-2xl">Completed</p>
            </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
        {
            todoList?.filter(todo=>todo.isDone == true).map(todo=><Card key={todo.id} id={todo.id} isDone={todo.isDone} title={todo.title} description={todo.description} onClick={onClickHandler} />)
        }
    </div>
        </div>
  
    </div>
}
