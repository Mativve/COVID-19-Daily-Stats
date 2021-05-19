<template>
    <div class="box box-number" :class="[customClass]">
        <p class="box-number-counter">{{ spacedNumber }}</p>
        <p class="box-number-title">{{ title }} <small>{{ subtitle }}</small></p>
    </div>
</template>

<script>
import { numberWithSpaces } from "../assets/js/utils";

export default {
    name: "NumberBox",
    props:{
        title: String,
        subtitle: String,
        counter: Number,
        customClass: String,
        icon: String
    },
    data(){
        return{
            number: 0,
        }
    },
    computed: {
        spacedNumber: function() {
            if( this.number ){
                return numberWithSpaces( this.number.toFixed(0) );
            }
            else{
                return 0;
            }
        }
    },
    watch: {
        counter: function(newValue){
            this.number = newValue;
        }
    },
    mounted(){
        this.number = this.counter;
    }
}
</script>

<style lang="scss" scoped>
.box-number{
    $this: &;
    
    &-counter{
        font-size: 3rem;
        font-weight: 600;
        display: block;
    }

    &-title{
        color: $muted;
    }

    &.muted{
        #{$this}-counter, small{
            color: $muted;
        }
    }

    &.red{
        #{$this}-counter, small{
            color: $red;
        }
    }

    &.green{
        #{$this}-counter, small{
            color: $green;
        }
    }

    &.blue{
        #{$this}-counter, small{
            color: $blue;
        }
    }

    &.orange{
        #{$this}-counter, small{
            color: $orange;
        }
    }
}
</style>