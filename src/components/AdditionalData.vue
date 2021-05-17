<template>
    <div>
        <component :is="comp" :v-if="exist"></component>
    </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
    name: "AdditionalData",
    props: {
        componentName:{
            type: String,
            required: true
        }
    },
    data(){
        return {
            exist: false,
            available: ['PL']
        }
    },
    computed: {
        comp(){
            if( this.available.includes(this.componentName) ){
                // this.exist = true;
                console.info("Additional data for " + this.componentName + " is available!");
                return defineAsyncComponent(() => import(`@/components/additional/country_${this.componentName}.vue`));
            }
            else{
                // this.exist = false;
                console.info("Additional data for " + this.componentName + " is unavailable!");
                return false;
            }
        }
    }
}
</script>