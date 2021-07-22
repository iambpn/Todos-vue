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
    onMounted(() => {
      state.todos = [
        {id: 1, content: "1st to-do", completed: false},
        {id: 2, content: "2st to-do", completed: true},
        {id: 3, content: "3st to-do", completed: false}
      ]
    });

    async function addTodo(content) {
      console.log(content);
      const res = await fetch(config.api_url + "api/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({content})
      })
      const data = await res.json();

      if (res.ok) {
        console.log(data)
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
