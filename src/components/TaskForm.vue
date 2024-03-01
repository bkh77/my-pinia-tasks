<template>
  <form @submit.prevent="handleSubmit" class="join my-6">
    <input
      required
      v-model.trim="newTask"
      type="text"
      class="input input-primary w-[330px] join-item"
      placeholder="I need to..."
    />
    <button class="btn btn-primary join-item px-8">Add</button>
  </form>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'

const { addTask } = useTaskStore()
const newTask = ref('')

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    addTask({
      title: newTask.value,
      isFav: false,
      id: String(Math.floor(Math.random() * 10000)),
    })
    newTask.value = ''
  }
}
</script>

<style scoped></style>
