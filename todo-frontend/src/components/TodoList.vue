<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
}
</style>

<template>
  <div class="todo-list">
    <div class="todo-remaining">
      <h4>Remaining:({{ filterRemaining.length }})</h4>
      <TodoItem
          v-for="todo in filterRemaining"
          :key="todo.id"
          v-bind="todo"
          @todoDelete="handleDelete"
          @todoCompleted="handleCompleted"
          @todoNotCompleted="handleNotCompleted"
      />
    </div>
    <div class="todo-completed">
      <h4>Completed: ({{ filterCompleted.length }})</h4>
      <TodoItem
          v-for="todo in filterCompleted"
          :key="todo.id"
          v-bind="todo"
          @todoDelete="handleDelete"
          @todoCompleted="handleCompleted"
          @todoNotCompleted="handleNotCompleted"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import {computed, reactive} from "vue";

export default {
  name: "TodoList",
  props: {
    todos: Array
  },
  components: {TodoItem},
  updated() {
    console.log("list update")
  },
  setup(props) {
    const state = reactive({
      todos: props.todos
    })
    const filterCompleted = computed(() => state.todos.filter(todo => todo.completed))
    const filterRemaining = computed(() => state.todos.filter(todo => !todo.completed))

    function handleDelete(id) {
      state.todos = state.todos.filter(todo => todo.id !== id);

      // Opinion: optimized way but not sure
      // const todo = state.todos.find(todo=>todo.id===id);
      // state.todos.splice(state.todos.indexOf(todo),1);
    }

    function handleCompleted(id) {
      const todo = state.todos.find(todo => todo.id === id);
      todo.completed = true;
    }

    function handleNotCompleted(id) {
      const todo = state.todos.find(todo => todo.id === id);
      todo.completed = false;
    }

    return {
      state,
      handleDelete,
      handleCompleted,
      handleNotCompleted,
      filterCompleted,
      filterRemaining
    }
  }
}
</script>