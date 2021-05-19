<template>
  <div class="country-page">
    <div class="container">

      <div class="country-page-grid">
        <div class="box country-page-header" :data-loading="loading">
          <div class="box-title">
            <Flag :country="country.iso2"/>
            <h2>{{ country.name }}</h2>

            <span>
              <span>Aktualizacja: {{ last_update }}</span>
              <button class="refresh" @click="refresh(country_id)" ref="refresh_button"><font-awesome-icon :icon="['fas', 'sync-alt']" /></button>
            </span>
          </div>
        </div>

        <div class="country-page-daily-cases">
            <NumberBox title="Dzienne przypadki" customClass="blue" :counter="current.new_cases" :data-loading="loading"/>
        </div>
        <div class="country-page-daily-deaths">
            <NumberBox title="Dzienne zgony" customClass="red" :counter="current.new_deaths" :data-loading="loading"/>
        </div>
        <div class="country-page-daily-recovered">
            <NumberBox title="Dzienne ozdrowienia" customClass="green" :counter="current.new_recovered" :data-loading="loading"/>
        </div>

        <div class="country-page-total-cases">
            <NumberBox title="Przypadki" customClass="blue" :counter="current.cases" :data-loading="loading"/>
        </div>
        <div class="country-page-total-deaths">
            <NumberBox title="Zgony" customClass="red" :counter="current.deaths" :data-loading="loading"/>
        </div>
        <div class="country-page-total-recovered">
            <NumberBox title="Ozdrowienia" customClass="green" :counter="current.recovered" :data-loading="loading"/>
        </div>

        <div class="country-page-chart">
          <div class="box" v-if="statsExist" :data-loading="loading">
              <p class="box-title">Wykres ogólny</p>
              <LineChartCDR :chartData="stats"/>
          </div>
          <div class="box" v-if="!statsExist" :data-loading="loading">
            <p class="centered">Brak danych do wyświetlenia</p>
          </div>
        </div>

        <div class="country-page-map">
          <div class="box" v-if="mapExist" :data-loading="loading">
              <p class="box-title">Mapa</p>
              <MapChart
                :countryData="countryDataMap"
                highColor="#e45253"
                lowColor="#f2f3f8"
                countryStrokeColor="#bebebe"
                defaultCountryFillColor="#f2f3f8"
                :showLegend="false"
              />
          </div>
        </div>

        <div class="country-page-total-perc">
          <div class="box" v-if="statsExist" :data-loading="loading">
              <p class="box-title">Wykres ogólny w % <small>(ostatni miesiąc)</small></p>
              <TotalPercChart :chartData="stats"/>
          </div>
          <div class="box" v-if="!statsExist" :data-loading="loading">
              <p class="centered">Brak danych do wyświetlenia</p>
          </div>
        </div>
        
        <div class="country-page-daily-perc">
          <div class="box" v-if="statsExist" :data-loading="loading">
              <p class="box-title">Przyrost dzienny w % <small>(ostatni miesiąc)</small></p>
              <DailyPercChart :chartData="stats"/>
          </div>
          <div class="box" v-if="!statsExist" :data-loading="loading">
            <p class="centered">Brak danych do wyświetlenia</p>
          </div>
        </div>

        <div class="country-page-additional">
          <AdditionalData :componentName="country_id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { searchCountry, countries } from "../assets/js/utils";

import { getCountriesStats, getCountryStats, getCountryVaccine } from ".././assets/js/api";

import MapChart  from "vue-map-chart";
import NumberBox from "../components/NumberBox";
import Flag from "../components/Flag";
import LineChartCDR from "../components/LineChartCDR.vue";
import TotalPercChart from "../components/TotalPercChart.vue";
import DailyPercChart from "../components/DailyPercChart.vue";

import AdditionalData from "../components/AdditionalData.vue";

export default {
  name: 'CountryPage',
  components:{
    NumberBox,
    Flag,
    MapChart,
    LineChartCDR,
    TotalPercChart,
    DailyPercChart,
    AdditionalData
  },
  data(){
    return{
      country_id: "",
      loading: true,
      country: {},
      stats: [],
      last_update: "",
      statsExist: false,
      current: {
        cases:0,
        new_cases: 0,
        deaths:0,
        new_deaths: 0,
        recovered:0,
        new_recovered: 0
      },
      mapExist: false,
      countryDataMap: {},
      metaTags:{
        title: "? - COVID-19 Codzienne statystyki"
      },
    }
  },
  methods:{
    getCountryData(){
      this.loading = true;

      getCountriesStats()
      .then((data) => {
          const latest = data.find(el => (el.country === this.country.iso2));

          this.current.cases = latest.cases;
          this.current.new_cases = latest.new_cases;

          this.current.deaths = latest.deaths;
          this.current.new_deaths = latest.new_deaths;

          this.current.recovered = latest.recovered;
          this.current.new_recovered = latest.new_recovered;

          this.last_update = latest.last_update;
      })
      .then(() => {
        getCountryStats( this.country.iso2 ).then((data) => {
            if( data ){
              this.stats = data;
            }
            else{
              this.stats = [];
            }
        });
      }).then(() => {
        getCountryVaccine( this.country.iso2 ).then((data) => {
          if( !this.stats || Object.keys(this.stats).length === 0 ) return false;

          const dates = this.stats.map(d => {
            return d.last_update;
          });

          const vaccine = dates.map(d => {
            if( data[d] ){
              data[d].last_update = d;
              return data[d];
            }
            else{
              return {last_update: d, total: 0, daily: 0};
            }
          });

          if( this.stats.length === vaccine.length ){
            vaccine.forEach((el, i) => {
              if( el.last_update === this.stats[i].last_update ){
                this.stats[i].vaccine = el.total;
              }
            });
          }

            this.statsExist = (this.stats.length) ? true : false;
            this.loading = false;
        });
      });
    },

    pickCountry(){
      const tmp = {};
      countries.forEach((a) => {
        const b = (a.iso2 === this.country.iso2) ? 1000 : 0;

        if( b === 1000 ){ this.mapExist = true; }

        tmp[a.iso2] = b;
      });

      this.countryDataMap = tmp;
    },

    initialize(id){
      this.loading = true;

      // Reset
      this.stats = {};
      this.last_update = "";
      this.statsExist = false;
      this.current = {
        cases:0,
        new_cases: 0,
        deaths:0,
        new_deaths: 0,
        recovered:0,
        new_recovered: 0
      };
      this.mapExist = false;
      this.countryDataMap = {};

      // Assign new country ID/Slug
      if( id ){
        this.country_id = id;
      }

      // Title
      const countryInfo = searchCountry(this.country_id, "iso2");
      this.country = countryInfo;
      this.metaTags.title = `${this.country.name} - COVID-19 Codzienne statystyki`;

      if(this.metaTags.title){
        document.title = this.metaTags.title;

        const favi = document.getElementById("favicon");
        favi.href = require('../assets/img/flag/' + this.country.iso2.toUpperCase() + '.png');
      }
      
      this.getCountryData();
      this.pickCountry();
      
      this.detectLoading();
    },

    refresh(id){
      this.loading = true;

      setTimeout(() => {
        this.initialize(id);
        this.$refs.refresh_button.blur();
        }, 1000);
    },

    detectLoading(){
      setTimeout(() => {
        if( this.loading === true ){
          this.getCountryData();
          this.pickCountry();
        }
      }, 5000);
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
      // Route variable
      const route = useRoute();
      this.country_id = route.params.countryId;

      this.initialize(this.country_id);
  },
  mounted(){
    this.getCountryData();
    this.pickCountry();

    this.detectLoading();
  }
}
</script>

<style lang="scss">
.country-page{
  .box{
    height: 100%;
  }

  &-grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: auto;
    gap: 16px;
    grid-template-areas:
      "header header header header header header"
      "daily-cases daily-cases daily-deaths daily-deaths daily-recovered daily-recovered"
      "total-cases total-cases total-deaths total-deaths total-recovered total-recovered"
      "chart chart chart chart map map"
      "total-perc total-perc total-perc daily-perc daily-perc daily-perc"
      "additional additional additional additional additional additional";

    @media all and (max-width:1024px){
    grid-template-areas:
      "header header header header header header"
      "daily-cases daily-cases daily-cases daily-cases daily-cases daily-cases"
      "daily-deaths daily-deaths daily-deaths daily-deaths daily-deaths daily-deaths"
      "daily-recovered daily-recovered daily-recovered daily-recovered daily-recovered daily-recovered"
      "total-cases total-cases total-cases total-cases total-cases total-cases"
      "total-deaths total-deaths total-deaths total-deaths total-deaths total-deaths"
      "total-recovered total-recovered total-recovered total-recovered total-recovered total-recovered"
      "chart chart chart chart chart chart"
      "map map map map map map"
      "total-perc total-perc total-perc total-perc total-perc total-perc"
      "daily-perc daily-perc daily-perc daily-perc daily-perc daily-perc"
      "additional additional additional additional additional additional";
    }
  }

  &-header {
    grid-area: header;

    .box-title{
      display: flex;
      align-items: center;
      color: $muted;
      margin: -24px -16px;

      .flag{
        transform-origin: left;
        transform: scale(1.5);
      }

      h2{
        margin-left: 16px;
      }

      span{
        display: inline-flex;
        align-items: center;
        margin-left: auto;
        
        span{
          display: block;
        }
      }

      @media screen and (max-width:640px){
        text-align: center;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;

        .flag{
          transform-origin: center;
          margin-bottom: 8px;
        }

        h2, span{
          margin: 0;
        }

        span{
          margin-top: 6px;
          flex-direction: column;

          .refresh{
            margin: 6px 0 0 0;
          }
        }
      }
    }

    .refresh{
      background-color: transparent;
      border: none;
      color: $muted;
      cursor: pointer;

      vertical-align: middle;
      text-align: center;
      
      margin: 0 0 0 6px;
      padding: 8px;
      background-color: $bg;
      border-radius: 50%;
      width: 32px;
      height: 32px;

      z-index: 10;

      svg{
        transition: transform 0;
      }

      &:hover, &:focus{
        color: $green;
        
        svg{
          transform: rotate(360deg);
          transition: transform 0.4s ease-in-out;
        }
      }
    }
  }
  &-daily-cases { grid-area: daily-cases; }
  &-daily-deaths { grid-area: daily-deaths; }
  &-daily-recovered { grid-area: daily-recovered; }
  &-total-cases { grid-area: total-cases; }
  &-total-deaths { grid-area: total-deaths; }
  &-total-recovered { grid-area: total-recovered; }
  &-chart { grid-area: chart; }
  &-map {
    grid-area: map;
    position: relative;

    &:after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
  &-total-perc { grid-area: total-perc; }
  &-daily-perc { grid-area: daily-perc; }
  &-additional { grid-area: additional; }
}
</style>