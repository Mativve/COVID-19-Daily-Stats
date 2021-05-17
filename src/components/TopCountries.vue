<template>
    <section class="section topCountries">
        <div class="container">
            <div class="row mb-5">
                <div class="col-12">
                    <h2 class="section-title">Najwięcej przypadków</h2>

                    <div class="topCountries-grid">
                        <div class="topCountries-item" v-for="(item, index) in mostCases" :key="index">
                            <CountryBox :data="item"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-5">
                <div class="col-12">
                    <h2 class="section-title">Najwięcej dziennych przypadków</h2>

                    <div class="topCountries-grid">
                        <div class="topCountries-item" v-for="(item, index) in mostCasesDaily" :key="index">
                            <CountryBoxDaily :data="item"/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row mb-5">
                <div class="col-12">
                    <h2 class="section-title">Najmniej przypadków</h2>

                    <div class="topCountries-grid">
                        <div class="topCountries-item" v-for="(item, index) in leastCases" :key="index">
                            <CountryBox :data="item"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-5">
                <div class="col-12">
                    <h2 class="section-title">Najmniej dziennych przypadków</h2>

                    <div class="topCountries-grid">
                        <div class="topCountries-item" v-for="(item, index) in leastCasesDaily" :key="index">
                            <CountryBoxDaily :data="item"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <AllCountries :countriesList="countriesStatList" v-if="countriesStatList"/> 
</template>

<script>
import CountryBox from "./CountryBox";
import CountryBoxDaily from "./CountryBoxDaily";
import AllCountries from "./AllCountries";

var _ = require('lodash');
import { numberWithSpaces, searchCountry } from "../assets/js/utils";
import { getCountriesStats } from ".././assets/js/api";


export default {
    name: 'TopCountries',
    components:{
        CountryBox,
        CountryBoxDaily,
        AllCountries
    },
    data(){
        return{
            showAmount: 4,
            countriesStatList: null,
            mostCases: null,
            mostCasesDaily: null,
            leastCases: null,
            leastCasesDaily: null,
        }
    },
    methods:{
        sortCases(){
            const cl = this.countriesStatList;

            cl.forEach((el) => {
                el.info = searchCountry(el.country, "iso2");
            });

            this.mostCases = _.sortBy(cl, "cases").reverse().slice(0, this.showAmount);
            this.mostCasesDaily = _.sortBy(cl, "new_cases").reverse().slice(0, this.showAmount);

            this.leastCases = _.sortBy(cl, "cases").slice(0, this.showAmount);
            this.leastCasesDaily = _.sortBy(cl, "new_cases").slice(0, this.showAmount);

            cl.forEach((el) => {
                el.cases = numberWithSpaces(el.cases);
                el.new_cases = numberWithSpaces(el.new_cases);
                el.deaths = numberWithSpaces(el.deaths);
                el.new_deaths = numberWithSpaces(el.new_deaths);
                el.recovered = numberWithSpaces(el.recovered);
                el.new_recovered = numberWithSpaces(el.new_recovered);
            });

            this.countriesStatList = cl;
        },
        getStats(){

            getCountriesStats()
            .then(data => {
                if( data ){
                    this.countriesStatList = data
                    this.sortCases();
                }
                else{
                    // err
                }
            });

        },
    },
    mounted(){
        this.getStats();
    }
}
</script>

<style lang="scss" scoped>
.topCountries{
    &-grid{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto;
        gap: 16px;

        counter-reset: country-step;

        &.small{
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
</style>