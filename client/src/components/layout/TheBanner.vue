<template>
  <header>
      <h1>
        <router-link to="/">Sales Order System</router-link>
      </h1>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 3rem;
  background-color: #160c6b;
  display: flex;
  justify-content: left;
  align-items: center;

}

header a {
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

h1 {
  margin: 0;
    font-size: 15pt;
}

h1 a {
  color: white;
  margin: 0;
}
</style>