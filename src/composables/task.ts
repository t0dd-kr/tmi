import { uuidv4 } from '@/composables/utils'
import { ref, type Ref } from 'vue'
import { useStorage } from '@vueuse/core'

export interface ITask {
  id: string
  text: string
  done: boolean
}

export type Task = {
  id: string
  text: string
  done: boolean
  // children: Task[]
  // parent: Task | null
}

type Tree = {
  [index: string]: string[]
}

type TaskList = {
  [index: string]: Task
}

const tasks = useStorage<TaskList>('tasks', {})
const children = useStorage<Tree>('children', {})
const parents = useStorage<Tree>('parents', {})
const roots = useStorage<Array<string>>('roots', [])

export default function useTaskManager() {
  function addTask(parentId?: string | undefined): Task {
    const task: Task = {
      id: uuidv4(),
      text: '',
      done: false,
      // children: [],
      // parent: null,
    }

    if (parentId !== undefined) {
      children.value[parentId] = [...children.value[parentId], task.id]
      parents.value[task.id] = [parentId, ...parents.value[parentId]]
    } else {
      parents.value[task.id] = []
      roots.value = [...roots.value, task.id]
    }

    children.value[task.id] = []
    tasks.value = { ...tasks.value, [task.id]: task }

    return task
  }

  function removeTask(taskId: string) {
    if (roots.value.length == 1) {
      return
    }

    const task = tasks.value[taskId]
    if (task === undefined) return

    const parentIds = parents.value[taskId]
    if (parentIds.length === 0) {
      roots.value = roots.value.filter(id => id !== taskId)
    } else {
      const parentId = parentIds[0]
      children.value[parentId] = children.value[parentId].filter(
        id => id !== taskId,
      )
    }

    delete tasks.value[taskId]
    delete children.value[taskId]
    delete parents.value[taskId]
  }

  function degradeTask() {
    return
  }

  function upgradeTask() {
    return
  }

  return {
    tasks,
    children,
    parents,
    roots,

    addTask,
    removeTask,
    degradeTask,
    upgradeTask,
  }
}
