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
    //sorted from the newest task (on top) to the oldest
    const selectedTodos = computed(() => {
        let filtered = todos.value

        if (filter.value === 'completed') {
            filtered = todos.value.filter(t => t.completed)
        } else if (filter.value === 'uncompleted') {
            filtered = todos.value.filter(t => !t.completed)
        }

        return filtered.slice()
            .sort((a, b) => b.id - a.id)
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

    //adding new task to task list
    function addTodo( newTitle: string):void {

        const usersId = 1

        //find the highest id so the values stay unique
        //if there are no tasks, use id equal to 0
        const maxId = todos.value.length ? Math.max(...todos.value.map(t => t.id)) : 0

        const newTodo: Todo = {
            userId: usersId,
            id: maxId + 1,
            title: newTitle,
            completed: false
        }

        todos.value.push(newTodo)
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
        addTodo,
    }
})