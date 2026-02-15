import { defineStore } from 'pinia'
import { ref, watch,computed } from 'vue'
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
    const filter = ref<'all' | 'completed' | 'uncompleted'>('all')


    //filter todos according to selected filter option (all/completed/uncompleted)
    //computed - list changes if the original task list changes
    const selectedTodos = computed(() => {
        if (filter.value === 'completed') {
            return todos.value.filter(t => t.completed)
        } else if (filter.value === 'uncompleted') {
            return todos.value.filter(t => !t.completed)
        } else {
            return todos.value
        }
    })

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

    //delete selected task from task list if found
    //in-place modification instead of rewriting the whole array
    function deleteTodo(id:number):void {
        const index = todos.value.findIndex(t => t.id === id)
        if(index !== -1){
            todos.value.splice(index, 1)
        }
    }

    //rename task, called by double-clicking title or pressing the edit button
    //in-place modification instead of rewriting the whole array
    function updateTodo(id:number, newTitle: string):void {
        const todo = todos.value.find(t => t.id === id)
        if(todo){
            todo.title = newTitle
        }
    }

    return{
        todos,
        error,
        loading,
        loadTodos,
        toggleCompleted,
        filter,
        selectedTodos,
        deleteTodo,
        updateTodo,
    }
})