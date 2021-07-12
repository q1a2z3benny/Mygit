<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">

      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/signup" class="nav-link">SIGN UP</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/signin" class="nav-link">signin</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>