<template>
  <div class="top-page">
    <h1>Science Books</h1>
    <div class="drop-container">
      <div class="drop"></div>
    </div>
    <div></div>
    <div class="top-menu">
      <router-link to="/physics" class="subject-button"
        ><a>物理</a></router-link
      >
      <router-link to="/chemistry" class="subject-button"
        ><a>化学</a></router-link
      >
      <router-link to="/biology" class="subject-button"
        ><a>生物</a></router-link
      >
    </div>

    <router-view />
  </div>
</template>

<style scoped>
.top-page {
  background: rgba(65, 105, 225, 0.5);

  height: 600px;
  overflow: hidden;
}
.top-menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 150px;
}
.subject-button {
  text-decoration: none;

  font-weight: bold;
  font-size: 40px;

  opacity: 0;
  animation: appear 2s 2.5s forwards;
}
a {
  color: white;
  transition: color 0.5s;
}
a :hover {
  color: #2eccfa;
}
div.drop-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 200px;
  width: 200px;
}

div.drop {
  position: absolute;
  top: -25%;
  width: 100%;
  height: 100%;
  border-radius: 100% 5% 100% 100%;
  transform: rotate(-45deg);
  margin: 0px;
  background: deepskyblue;
  animation: drip 4s forwards;
}

h1 {
  color: white;
  position: absolute;
  font-size: 2.5em;
  height: 1em;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  margin: auto;
  text-align: center;
  opacity: 0;
  animation: appear 2s 2.5s forwards;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

div.drop-container:before,
div.drop-container:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 55%;
  right: 50%;
  transform: translate(50%) rotateX(75deg);
  border-radius: 100%;
  opacity: 0;
  width: 75%;
  height: 75%;
  border: 5px solid skyblue;
  animation: dripple 2s ease-out 1s;
}

div.drop-container:after {
  animation: dripple 2s ease-out 1.7s;
}

@keyframes drip {
  45% {
    top: 0;
    border-radius: 100% 5% 100% 100%;
    transform: rotate(-45deg);
  }
  100% {
    top: 0;
    transform: rotate(0deg);
    border-radius: 100%;
  }
}

@keyframes dripple {
  0% {
    width: 150px;
    height: 150px;
  }
  25% {
    opacity: 1;
  }
  100% {
    width: 500px;
    height: 500px;
    top: -20%;
    opacity: 0;
  }
}
</style>
