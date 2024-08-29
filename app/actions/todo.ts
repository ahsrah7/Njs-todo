"use server"

import client from "../db";

export async function createTodo(title: string, description: string) {
    try{
        const todo = await client.todo.create({
            data: {
                title: title,
                description: description
            }
        });
    
        console.log(todo.id);
    
        return todo; 
    }catch(e){
        console.log(e);

        return null;
    }
    
}



export async function listTodo() {
    try{
        
        const todos = await client.todo.findMany()
    
        return todos; 
    }catch(e){
        console.log(e);

        return null;
    }
    
}

export async function markTodoAsDone(id:number){
    try{
        const todo = await client.todo.update({
            where:{
                id:id
            },
            data:{
                isDone: true
            }
        })
    
        return todo; 
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function deleteTodo(id:number) {
    try{
        const todo = await client.todo.delete({
            where:{
                id:id
            }
        })
    
        return todo; 
    }catch(e){
        console.log(e);
        return null;
    }
}