<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  mounted(){
    document.body.className = "body";
  }
}
</script>

<style lang="scss">
#app{
  font-family: inherit;
}
</style>