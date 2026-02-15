import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import axios from 'axios'

export interface Todo {
    userId : number
    id : number
    title : string
    completed: boolean
}

export const useTodoStore = defineStore('todos', () => {
    const loading  = ref<boolean>(false)
    const todos = ref<Todo[]>([])
    const error = ref<string|null>(null)

    //sync the localstorage when the task list changes
    //deep: true -> nested objects are also watched
    watch(todos,(newTodos) => {
        localStorage.setItem('todos', JSON.stringify(newTodos))
    },{deep: true})


    //load task list from localStorage or fetch from api (if not available in localStorage)
    async function loadTodos(): Promise<void> {
        loading.value = true
        const storedTodos = localStorage.getItem('todos')

        // localStorage.getItem returns null if empty, then fetch the data
        if (storedTodos) {
            todos.value = JSON.parse(storedTodos)
        }else{
            await fetchTodos()
        }

        loading.value = false
    }

    //fetch todos from jsonplaceholder api
    //store errors for UI or set the task list
    async function fetchTodos (): Promise<void> {
        error.value = null

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

    //toggle task completion by inverting its value
    function toggleCompleted(id:number):void {

        const todo = todos.value.find(t=>t.id === id)
        if(todo){
            todo.completed = !todo.completed
        }
    }

    return{
        todos,
        error,
        loading,
        loadTodos,
        toggleCompleted,
    }
})