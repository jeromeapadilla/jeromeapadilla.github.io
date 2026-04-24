<script setup>
import { ref } from 'vue';
import ChildExample from './components/ChildExample.vue';

const x = ref(0);
const dog = ref({ name: 'Misha', breed: 'Poodle' });
const colors = ref(['red', 'green', 'blue']);

function plusOne() {
  x.value++; // Increment x
} 
</script>

<template>
  <h1>Basics</h1>
  <p>{{ x }}</p>
  <p>{{ dog.name }}</p>
  <p>{{ dog.breed }}</p>
  <p :class="colors[Math.abs(x % 3)]">{{ colors[Math.abs(x % 3)] }}</p> 
  <p v-for="(color, key) in colors" :key="key" :class="color" :id="'color-' + key">{{ key + color }}</p> 
  <button @click="x--">Minus One</button>
  <button @click="plusOne()">Plus One Function</button>
  <button @click="x = 0">Reset</button>
  <ChildExample :number="1" :rgb="black" />
  <child-example></child-example>
</template>

<style scoped>
.red, .green, .blue {
  color: white;
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
.blue {
  background-color: blue;
}
</style>
