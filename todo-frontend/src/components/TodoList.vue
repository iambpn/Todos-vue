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
          @todoToggleCompleted="handleToggleCompleted"
      />
    </div>
    <div class="todo-completed">
      <h4>Completed: ({{ filterCompleted.length }})</h4>
      <TodoItem
          v-for="todo in filterCompleted"
          :key="todo.id"
          v-bind="todo"
          @todoDelete="handleDelete"
          @todoToggleCompleted="handleToggleCompleted"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import {computed, reactive} from "vue";
import {config} from "../../config";

export default {
  name: "TodoList",
  props: {
    todos: Array //pass by reference because array|object are pass by reference
  },
  components: {TodoItem},
  setup(props) {
    const state = reactive({
      todos: props.todos
    })
    const filterCompleted = computed(() => state.todos.filter(todo => todo.completed))
    const filterRemaining = computed(() => state.todos.filter(todo => !todo.completed))

    function handleDelete(id) {
      const todo = state.todos.find(todo => todo.id === id);
      state.todos.splice(state.todos.indexOf(todo), 1);

      (async () => {
        let res = await fetch(config.api_url + "api/todo", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({id})
        });
        let data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        }
      })();
    }

    function handleToggleCompleted(id) {
      const todo = state.todos.find(todo => todo.id === id);
      todo.completed = !todo.completed;
      (async () => {
        let res = await fetch(config.api_url + "api/todo/completed", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({id, updateData: {completed: todo.completed}})
        });
        let data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        }
      })();
    }

    return {
      state,
      handleDelete,
      handleToggleCompleted,
      filterCompleted,
      filterRemaining
    }
  }
}
</script>