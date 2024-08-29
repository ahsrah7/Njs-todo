import { ChangeEventHandler } from "react"

export function Card({id,title,description,isDone,onClick}:{id:number,title:string,description:string,isDone:boolean,onClick: (id:number)=>void}){

    return <div className="w-12/12 md:w-3/12 max-w-xs md:max-w-md m-4 p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 truncate">{description}</p>
        {isDone?"" :<button onClick={()=>onClick(id)} type="button" className="mt-8 w-auto md:w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Mark as done</button>}
    </div>
    

}