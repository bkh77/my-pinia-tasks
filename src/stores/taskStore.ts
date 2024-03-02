import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/types/task'

export const useTaskStore = defineStore('taskStore', () => {
  // state
  const tasks = ref<Task[]>([])
  const loading = ref(false)

  const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  // getters
  const favs = computed(() => {
    return tasks.value.filter((t) => t.isFav)
  })

  const allCount = computed(() => {
    return tasks.value.length
  })

  const favCount = computed(() => {
    return tasks.value.filter((t) => t.isFav).length
  })

  // actions
  const getTasks = async () => {
    try {
      const savedTasks = await JSON.parse(localStorage.getItem('tasks') || '')

      if (savedTasks) {
        tasks.value = savedTasks
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = async (task: Task) => {
    try {
      tasks.value.push(task)
      saveToLocalStorage()
    } catch (error) {
      console.log(error)
    }
  }
  const deleteTask = async (id: string) => {
    try {
      tasks.value = tasks.value.filter((t) => t.id !== id)
      saveToLocalStorage()
    } catch (error) {
      console.log(error)
    }
  }

  const toggleFav = async (id: string) => {
    try {
      const task = tasks.value.find((t) => {
        if (t.id === id) {
          t.isFav = !t.isFav
          return true
        }
        return false
      })
      saveToLocalStorage()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    tasks,
    favs,
    allCount,
    favCount,
    loading,
    addTask,
    toggleFav,
    deleteTask,
    getTasks,
  }
})
