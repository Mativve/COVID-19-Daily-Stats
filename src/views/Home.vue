<template>
  <div class="home">
    <GlobalStats/>
    <TopCountries/>
  </div>
</template>

<script>
import GlobalStats from "@/components/GlobalStats";
import TopCountries from "@/components/TopCountries";

export default {
  name: 'Home',
  components:{
    GlobalStats,
    TopCountries
  },
  data(){
    return{
      metaTags:{
        title: "Strona główna - COVID-19 Codzienne statystyki"
      }
    }
  },
  methods:{
    initialize(){
      if(this.metaTags.title){
        document.title = this.metaTags.title;

        const favi = document.getElementById("favicon");
        favi.href = "/favicon.ico";
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.initialize(to.params.countryId))
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate (to, from, next) {
      this.initialize(to.params.countryId);
      next();
  },
  created(){
    this.initialize();
  }
}
</script>
