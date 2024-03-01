import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/types/task'

export const useTaskStore = defineStore('taskStore', () => {
  // state
  const tasks = ref<Task[]>([])
  const loading = ref(false)

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
      loading.value = true
      const res = await fetch('http://localhost:3000/tasks')
      const data = await res.json()

      tasks.value = data
      loading.value = false
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = async (task: Task) => {
    try {
      tasks.value.push(task)
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.log(error)
    }
  }
  const deleteTask = async (id: string) => {
    try {
      tasks.value = tasks.value.filter((t) => t.id !== id)

      await fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
      })
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

      await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task?.isFav }),
        headers: { 'Content-Type': 'application/json' },
      })
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
