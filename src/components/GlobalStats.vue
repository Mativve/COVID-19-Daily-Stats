<template>
    <section class="section globalStats">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="section-title">Ogólne statystyki</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-4">
                    <NumberBox title="Przypadki" :subtitle="'(+'+ global.new_cases +')' " customClass="blue" :counter="global.cases"/>
                </div>
                <div class="col-sm-12 col-md-4">
                    <NumberBox title="Zgony" :subtitle="'(+'+ global.new_deaths +')' " customClass="red" :counter="global.deaths"/>
                </div>
                <div class="col-sm-12 col-md-4">
                    <NumberBox title="Ozdrowienia" :subtitle="'(+'+ global.new_recovered +')' " customClass="green" :counter="global.recovered"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import NumberBox from "./NumberBox";
import { getGlobalStats } from ".././assets/js/api";


export default {
    name: 'GlobalStats',
    components:{
        NumberBox
    },
    data(){
        return{
            global:{},
        }
    },
    methods:{
        getStats(){
            getGlobalStats().then((data) => {
                if( data ){
                    this.global = data;
                }
                else{
                    // err
                }
            });
        }
    },
    mounted(){
        this.getStats();
    }
}
</script>