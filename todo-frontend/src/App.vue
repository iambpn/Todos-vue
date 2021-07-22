<style scoped>
.todos {
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 80%;
}
</style>

<template>
  <Layout/>
  <div class="container">
    <div class="todos">
      <add-todo @addTodo="addTodo"/>
      <TodoList :todos="state.todos" v-if="state.todos.length>0"/>
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";
import Layout from "@/components/Layout";
import AddTodo from "@/components/AddTodo";
import {config} from "../config";
import {onMounted, reactive} from "vue";

export default {
  name: 'App',
  components: {
    AddTodo,
    Layout,
    TodoList
  },
  setup() {
    const state = reactive({
      todos: []
    })
    onMounted(async () => {
      const res = await fetch(config.api_url + "api/todo");
      const data = await res.json();
      if (res.ok) {
        state.todos = [...data];
      } else {
        console.log(data.message);
      }
    });

    async function addTodo(content) {
      const res = await fetch(config.api_url + "api/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({content})
      })
      const data = await res.json();
      if (res.ok) {
        state.todos.unshift({...data});
      } else {
        console.log(data.message)
      }
    }

    return {
      state,
      addTodo
    }
  }
}
</script>
