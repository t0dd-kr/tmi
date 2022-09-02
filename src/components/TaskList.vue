<script setup lang="ts">
  import { ref } from 'vue'

  import TaskComponent from '@/components/Task.vue'

  import useTaskManager from '@/composables/task'
  const { roots, tasks, children } = useTaskManager()

  const props = defineProps({
    taskIds: {
      type: Array<string>,
      default: () => [],
    },
    key: {
      type: String,
      default: 'task',
    },
  })
</script>

<template>
  <div class="flex flex-col">
    <TaskComponent v-for="taskId in taskIds" :key="taskId" :taskId="taskId" />
  </div>
</template>

<style scoped lang="scss"></style>
