<style scoped>
.todo-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: lavender;
  border-radius: 10px;
  transition: all 0.25s ease;
  padding: 10px 0;
  margin: 10px 0;
}

.todo-item:hover {
  transform: scale(1.05, 1.05);
  border-radius: 3px;
}

.todo-done {
  display: inline-flex;
  align-items: center;
}

.todo-content {
  border: 1px solid #afafbc;
  border-radius: 5px;
  margin: 3px;
  width: 100%;
  text-align: center;
}

.todo-content > p {
  display: inline-block;
  margin: 5px;
}

.todo-delete {
  display: inline-flex;
  align-items: center;
}

.todo-delete > button {
  margin: 0 5px;
  border: none;
  background-color: transparent;
  font-weight: bolder;
  transition: all 0.3s ease;
}

.todo-delete > button:hover {
  color: #0060df;
  font-size: 1.1rem;
}

.strike {
  text-decoration: line-through;
}
</style>

<template>
  <div class="todo-item">
    <div class="todo-done">
      <input type="checkbox" title="Done" v-model="state.completed">
    </div>
    <div class="todo-content">
      <p :class="{'strike':state.completed}">
        {{ content }}
      </p>
    </div>
    <div class="todo-delete">
      <button title="Delete" @click="handleDelete">X</button>
    </div>
  </div>
</template>

<script>
import {reactive, watch} from "vue";

export default {
  name: "TodoItem",
  props: {
    id: String,
    content: String,
    completed: Boolean
  },
  setup(props, context) {
    const state = reactive({
      completed: props.completed
    })

    function handleDelete() {
      context.emit("todoDelete", props.id)
    }
    
    // cannot used direct state.completed. need to use getter method. i.e method that returns the state value. 
    watch(() => state.completed, () => {
      context.emit("todoToggleCompleted", props.id)
    })

    return {
      state,
      handleDelete
    }
  }
}
</script>
