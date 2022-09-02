<script setup lang="ts">
  import Header from '@/components/Header.vue'
  import TaskList from '@/components/TaskList.vue'

  import useTaskManager from '@/composables/task'
  const { roots, tasks, addTask } = useTaskManager()

  if (roots.value.length == 0) {
    addTask()
  }
</script>

<template>
  <Header />
  <div class="p-4 pt-2">
    <TaskList :taskIds="roots" />
  </div>
</template>

<style scoped lang="scss"></style>
