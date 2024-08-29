"use client"

import { deleteTodo, listTodo,markTodoAsDone } from "@/app/actions/todo"
import { Card } from "./Card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const todos = listTodo;

interface Todo { id: number; title: string; description: string; isDone: boolean; }

export const Todos =  ()=>{
    const router = useRouter();
    const [todoList,setTodoList] = useState<Todo[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const getTodos = async ()=>{
        setLoading(true);
        const result = await todos();
        if(result)
        {
        setLoading(false);
        setTodoList(result);
        }
        else{
            setLoading(false);
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

    const onDeleteHandler = async (id:number) =>{
        try{
            const deletedTodo = await deleteTodo(id);
            if(deletedTodo){
                setTodoList(currState=>{
                    const newTodoList = currState.filter(i=>i.id !== deletedTodo.id)
                    return newTodoList
                })
                toast.success(`${deletedTodo.title} is deleted.` )
            }
        }catch(e){
            console.log(e);
            toast.error("something went wrong")
            
        }

        
    }


   
    return <div className="flex flex-col">
        <div className="w-full  border-b border-slate-400">
        <div>
                <p className="pl-8 font-bold text-2xl mb-10">In progress</p>
            </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
        {
          loading ? 
          <div className="flex w-full justify-center items-center">
          <p>Loading.......................</p> 
       </div>
        : 
 todoList?.filter(todo=>todo.isDone == false).map(todo=><Card  onDelete={onDeleteHandler} key={todo.id} id={todo.id} isDone={todo.isDone} title={todo.title} description={todo.description} onClick={onClickHandler} />) 
        }
    </div>
        </div>
        <div className="w-full  mt-10">
            <div>
                <p className="pl-8 font-bold text-2xl">Completed</p>
            </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
        {
           loading ? 
           <div className="flex w-full justify-center items-center">
           <p>Loading.......................</p> 
        </div>
         :
          todoList?.filter(todo=>todo.isDone == true).map(todo=><Card onDelete={onDeleteHandler} key={todo.id} id={todo.id} isDone={todo.isDone} title={todo.title} description={todo.description} onClick={onClickHandler} />)
        }
    </div>
        </div>
  
    </div>
}
