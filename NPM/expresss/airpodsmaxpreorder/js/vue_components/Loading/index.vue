<template>
  <div class="loading box-2"></div>
</template>

<script>
module.exports = {};
</script>

<style scoped>
.loading { position: fixed;
    left: 0;
    top: 0;
    
    background: url("../../../images/Ripple-1s-200px.svg") center center no-repeat rgba(0,0,0,0.6);
    width: 100vw;
    height: 100vh;
    z-index: 1000; 
}
</style>