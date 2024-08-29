"use client"
import { useRouter } from "next/navigation";

export function Appbar(){
    const router = useRouter()
    return <div className="flex flex-col md:flex-row justify-between md:justify-center">
            <button onClick={async () => {router.push("/")}} type="button" className="mt-8 w-full md:w-3/12 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Create Todo</button>
            <button onClick={async () => {router.push("/todo")}} type="button" className="mt-8 w-full md:w-3/12 text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">All Todos</button>
    </div>
}