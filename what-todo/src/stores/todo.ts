import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface Todo {
    userId : number
    id : number
    title : string
    completed: boolean
}

export const useTodoStore = defineStore('todos', () => {
    const loading  = ref<boolean>(false)
    const todos = ref<Todo[]>([])
    const error = ref<string|null>(null)

    async function fetchTodos (): Promise<void> {
        error.value = null
        loading.value = true

        try{
            const response = await axios.get<Todo[]>(
                'https://jsonplaceholder.typicode.com/todos'
            )
            todos.value = response.data
        }catch (e){
            error.value = 'Error fetching todos'
            console.error(e)
        }finally {
            loading.value = false
        }
    }
    return{
        todos,
        error,
        loading,
        fetchTodos,
    }
})