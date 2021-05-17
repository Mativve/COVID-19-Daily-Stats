<template>
    <picture class="flag">
        <img
            :src="getFlag(countryInfo.iso2.toUpperCase())"
            width="20"
            :alt="countryInfo.name">
    </picture>
</template>

<script>
import { searchCountry } from "../assets/js/utils";

export default {
    name: "Flag",
    props:{
        country: String
    },
    data(){
        return {
            countryInfo: null,
        }
    },
    methods:{
        getCountry(){
            this.countryInfo = searchCountry( this.country, "iso2" );
        },
        getFlag(c){
            return require('../assets/img/flag/' + c + '.png');
        }
    },
    created(){
        this.getCountry();
    },
    updated(){
        this.getCountry();
    }
}
</script>
<style lang="scss" scoped>
.flag{
    max-height: 20px;
}
</style>