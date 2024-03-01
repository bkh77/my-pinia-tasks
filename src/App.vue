<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue'
import TaskDetailes from '@/components/TaskDetailes.vue'
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'
import type { filterType } from '@/types/task'

const store = useTaskStore()
const filter = ref<filterType>('all')
store.getTasks()
</script>

<template>
  <!-- heading -->
  <header class="bg-base-200 py-4 text-center">
    <div class="flex justify-center items-center space-x-6">
      <img
        class="w-16 -rotate-6"
        src="./assets//pinia-logo.svg"
        alt="pinia logo"
      />
      <h1 class="text-4xl font-bold rotate-3">Pinia tasks</h1>
    </div>
    <!-- add task form  -->
    <TaskForm />
  </header>

  <main class="text-zinc-700 max-w-2xl mx-auto my-6">
    <!-- filter btns -->
    <div class="space-x-4 mb-4 flex justify-end">
      <button
        @click="filter = 'all'"
        class="btn btn-outline btn-info px-8 btn-sm ring-offset-2"
        :class="{ 'ring-2': filter === 'all' }"
      >
        All
      </button>
      <button
        @click="filter = 'fav'"
        class="btn btn-outline btn-info px-8 btn-sm ring-offset-2"
        :class="{ 'ring-2': filter === 'fav' }"
      >
        Fav
      </button>
    </div>

    <!-- loader -->
    <div v-if="store.loading" class="bg-primary/40 p-3 rounded text-center">
      Loader...
    </div>

    <!-- tasks list -->
    <section v-show="filter === 'all'">
      <p class="my-4">You have {{ store.allCount }} tasks left to do</p>
      <TransitionGroup name="list" tag="div">
        <div v-for="task in store.tasks" :key="task.id">
          <TaskDetailes :task="task" />
        </div>
      </TransitionGroup>
    </section>

    <section v-show="filter === 'fav'">
      <p class="my-4">You have {{ store.favCount }} favs left to do</p>
      <TransitionGroup name="list" tag="div">
        <div v-for="task in store.favs" :key="task.id">
          <TaskDetailes :task="task" />
        </div>
      </TransitionGroup>
    </section>

    <Transition>
      <div
        class="text-5xl font-bold text-center my-12 text-gray-300"
        v-if="!store.tasks.length"
      >
        Empty
      </div>
    </Transition>
  </main>
</template>

<style scoped></style>
