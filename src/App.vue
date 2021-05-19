<template>
  <Header @changeTheme="applyTheme" :theme="theme"/>
  <router-view/>
  <Footer/>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

import { applyTheme, setTheme, getTheme } from "./assets/js/utils";

export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  data(){
    return{
      theme: "light"
    }
  },
  methods:{
    applyTheme(){
      this.theme = (this.theme === "light") ? "dark" : "light";
      
      setTheme(this.theme);
    }
  },
  mounted(){
    document.body.className = "body";

    this.theme = getTheme();
    applyTheme();
  }
}
</script>

<style lang="scss">
#app{
  font-family: inherit;
}
</style>