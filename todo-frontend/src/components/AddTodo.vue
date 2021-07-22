<style scoped>
.add-todo {
  margin: 1rem;
  border: 1px solid lavender;
  border-radius: 10px;
  padding: 10px;
}

.add-todo > h4 {
  margin: 0 0 10px 0;
}

.add-todo-form {
  text-align: center;
}

.add-todo-form > label {
  line-height: 1.5;
  font-size: 1.1rem;
  display: block;
}

.add-todo-form > textarea {
  width: 95%;
  margin-bottom: 3px;
  min-height: 50px;
  resize: vertical;
  max-height: 100px;
}

.add-todo-form > button {
  width: 95%;
  padding: 5px;
  font-size: 0.9rem;
}
.error{
  box-shadow: 0px 0px 3px red;
}
</style>

<template>
  <div style="width: 30%">
    <div class="add-todo">
      <h4>Add To-dos:</h4>
      <form class="add-todo-form" @submit.prevent="handleAddTodo">
        <label for="newTodo">To-do:</label>
        <textarea
            id="newTodo"
            v-model="state.newTodo"
            :class="{'error':state.error}"
            @change="handleContentChange"/>
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "AddTodo",
  setup(props, context) {
    const state = reactive({
      newTodo: "",
      error:false
    });

    function handleAddTodo() {
      if (state.newTodo) {
        context.emit("addTodo", state.newTodo);
        state.newTodo = "";
      }
      else{
        state.error=true;
      }
    }

    function handleContentChange(){
      if(state.newTodo){
        state.error = false;
      }
      else{
        state.error = true;
      }
    }

    return {
      state,
      handleAddTodo,
      handleContentChange
    }
  }
}
</script>