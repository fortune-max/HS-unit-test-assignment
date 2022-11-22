<script setup>
import { ref } from 'vue';

const todos = ref([
  {
    id: 1,
    text: 'Learn Vue.js 3',
    completed: false,
  },
]);

const newTodo = ref("");

function addTodo(){
  todos.value.push(
    {
      id: todos.value.length + 1,
      text: newTodo.value,
      completed: false,
    }
  );
}

</script>
<template>
  <div v-for="todo in todos" data-test="todo" :class="{completed: todo.completed}">
    <input type="checkbox" data-test="todo-checkbox" v-model="todo.completed"/>
    {{todo.text}}
  </div>
  <input data-test="new-todo-input" v-model="newTodo"/>
  <button data-test="new-todo-btn" @click="addTodo" >Add New Todo</button>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
