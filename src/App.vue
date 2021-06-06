<template>
  <div id="app">
    <div class="home-header">
      <router-link to="/science" class="home-button"> Home</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style scoped>
.home-header {
  background-color: white;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
}
.home-button {
  margin-left: 10px;
  margin-bottom: 10px;
  color: rgba(65, 105, 225, 0.5);
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  background: transparent;
  border: 3px solid rgba(65, 105, 225, 0.5);
  border-radius: 6px;
  position: relative;
  z-index: 1;
  transition: 0.5s;
  text-decoration: none;
}
.home-button::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background: #2eccfa;
  transform-origin: 50% 0%;
  transform: scaleY(0);
  transition: transform ease 0.5s;
}
.home-button:hover {
  color: white;
}
.home-button:hover::before {
  transform-origin: 50% 100%;
  transform: scaleY(1);
}
</style>
