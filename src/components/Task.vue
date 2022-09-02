<script setup lang="ts">
  import { computed } from 'vue'

  import TaskList from '@/components/TaskList.vue'

  import useTaskManager from '@/composables/task'
  import { type Task } from '@/composables/task'
  const { parents, tasks, children, addTask, removeTask } = useTaskManager()

  const props = defineProps({
    taskId: {
      type: String,
      required: true,
    },
  })

  const task = computed<Task>(() => tasks.value[props.taskId])
  const myChildren = computed<Array<Task>>(() =>
    children.value[props.taskId].map(taskId => tasks.value[taskId]),
  )
  const isInterminate = computed<boolean>(
    () => myChildren.value.filter((child: Task) => child.done).length > 0,
  )
  function addSibling() {
    if (parents.value[props.taskId] && parents.value[props.taskId][0]) {
      addTask(parents.value[props.taskId][0])
    } else {
      addTask()
    }
  }

  function degradeSelf() {
    // if (parents.value[props.taskId] && parents.value[props.taskId][0]) {
    //   addTask(parents.value[props.taskId][0])
    // } else {
    //   addTask()
    // }
  }

  function removeSelf() {
    if (task.value.text.length == 0) {
      removeTask(props.taskId)
    }
  }
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      :checked="task.done"
      @change="task.done = !task.done"
      :class="`checkbox checkbox-accent checkbox-sm rounded-sm ${
        !task.done ? 'bg-accent bg-opacity-20' : ''
      }`"
      :indeterminate="isInterminate"
    />
    <input
      type="text"
      placeholder="할 일을 입력하세요"
      class="input input-sm w-full max-w-xs !outline-none !outline-0 pl-0"
      v-model="task.text"
      @keydown.enter="addSibling"
      @keydown.tab="degradeSelf"
      @keydown.backspace="removeSelf"
    />
  </div>
  <TaskList :tasks="myChildren" />
</template>

<style scoped lang="scss"></style>
