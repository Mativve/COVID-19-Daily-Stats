<template>
    <div class="additional" v-if="!loading">
        <div class="box additional-header mb-3">
            <h2>Dodatkowe dane</h2>
            <span>Aktualizacja: {{ last_update }}</span>
        </div>
        <div class="additional-grid mb-3">
            <NumberBox title="Wykonane testy" customClass="muted" :counter="response.dailyTested" :data-loading="loading"/>
            <NumberBox title="Pozytywne testy" customClass="muted" :counter="response.dailyPositiveTests" :data-loading="loading"/>
            <NumberBox title="Na kwarantannie" customClass="blue" :counter="response.dailyQuarantine" :data-loading="loading"/>
            <NumberBox title="Zgony przez COVID" customClass="red" :counter="response.dailyDeceasedDueToCovid" :data-loading="loading"/>
        </div>

        <ul class="box additional-list-of-provinces">
            <li class="additional-province">
                <button class="index">#</button>
                <button
                    class="regionName"
                    :class="{ active: (sort.column == 'region'), asc: (sort.orderby === 'asc'), desc: (sort.orderby === 'desc') }"
                    @click='sortColumns("region")'>
                Województwo
                </button>
                <button
                    class="infectedCount"
                    :class="{ active: (sort.column == 'infectedCount'), asc: (sort.orderby === 'asc'), desc: (sort.orderby === 'desc') }"
                    @click='sortColumns("infectedCount")'>
                Przypadki
                </button>
                <button
                    class="deceasedCount"
                    :class="{ active: (sort.column == 'deceasedCount'), asc: (sort.orderby === 'asc'), desc: (sort.orderby === 'desc') }"
                    @click='sortColumns("deceasedCount")'>
                Zgony
                </button>
                <button
                    class="recoveredCount"
                    :class="{ active: (sort.column == 'recoveredCount'), asc: (sort.orderby === 'asc'), desc: (sort.orderby === 'desc') }"
                    @click='sortColumns("recoveredCount")'>
                Ozdrowienia
                </button>
                <button
                    class="testedCount"
                    :class="{ active: (sort.column == 'testedCount'), asc: (sort.orderby === 'asc'), desc: (sort.orderby === 'desc') }"
                    @click='sortColumns("testedCount")'>
                Testów
                </button>
                <button
                    class="testedNegative"
                    :class="{ active: (sort.column == 'testedNegative'), asc: (sort.orderby === 'asc'), desc: (sort.orderby === 'desc') }"
                    @click='sortColumns("testedNegative")'>
                Testy negatywne
                </button>
                <button
                    class="testedPositive"
                    :class="{ active: (sort.column == 'testedPositive'), asc: (sort.orderby === 'asc'), desc: (sort.orderby === 'desc') }"
                    @click='sortColumns("testedPositive")'>
                Testy pozytywne
                </button>
            </li>
            <li class="additional-province" v-for="(items, index) in response.infectedByRegion" :key="index">
                <span class="index" data-tab="#"><span>{{ (index++) }}</span></span>
                <span class="regionName" :data-tab=" 'Województwo' "><span>{{ items.region }}</span></span>
                <span class="infectedCount" :data-tab=" 'Przypadki' "><span>{{ items.infectedCount }}</span></span>
                <span class="deceasedCount" :data-tab=" 'Zgony' "><span>{{ items.deceasedCount }}</span></span>
                <span class="recoveredCount" :data-tab=" 'Ozdrowienia' "><span>{{ items.recoveredCount }}</span></span>
                <span class="testedCount" :data-tab=" 'Testów' "><span>{{ items.testedCount }}</span></span>
                <span class="testedNegative" :data-tab=" 'Testy negatywne' "><span>{{ items.testedNegative }}</span></span>
                <span class="testedPositive" :data-tab=" 'Testy pozytywne' "><span>{{ items.testedPositive }}</span></span>
            </li>
        </ul>
    </div>
</template>

<script>
import { parseDateToHuman } from "../../assets/js/utils";
import { getCountryAdditional } from "../../assets/js/api";

var _ = require('lodash');

import NumberBox from "../NumberBox";

export default {
    name: "AdditionalPL",
    components:{
        NumberBox
    },
    data(){
        return {
            loading: true,
            response: {},
            last_update: "",
            sort:{
                column: "region",
                orderby: "asc"
            }
        }
    },
    methods:{
        getData(){
            getCountryAdditional("PL")
            .then((res) => {
                this.response = res.data;

                this.last_update = parseDateToHuman(this.response.lastUpdatedAtSource);

                this.loading = false;
            });
        },
        sortColumns(column){
            if( column === this.sort.column ){
                this.sort.orderby = (this.sort.orderby === "asc") ? "desc" : "asc";
            }

            if( column !== this.sort.column ){
                this.sort.column = column;
            }

            this.response.infectedByRegion = _.orderBy(this.response.infectedByRegion, this.sort.column, this.sort.orderby);
        }
    },
    mounted(){
        this.getData();
        this.sortColumns("region");
    }
}
</script>
<style lang="scss">
.additional{
    &-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $muted;
        font-weight: 600;

        span{
            margin-left: auto;
        }

        @media screen and (max-width:640px){
            flex-direction: column;
            justify-content: center;

            span{
                margin: 0;
            }
        }
    }

    &-grid{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: auto;
        gap: 16px;

        @media screen and (max-width:1024px){
            grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (max-width:640px){
            grid-template-columns: repeat(1, 1fr);
        }
    }

    &-list-of-provinces{
        list-style: none;

        @media screen and (max-width:1024px){
            padding-top: 44px;

            &:before{
                content: '- Kliknij na nazwę aby sortować- ';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                padding: 8px;
                text-align: center;
                color: $muted;
            }
        }
    }

    &-province{
        display: grid;
        grid-template-columns: 32px 250px repeat(6, 1fr);
        grid-auto-rows: auto;
        gap: 8px;

        padding: 8px 0;

        &:first-child{
            margin-top: -16px;
            border-bottom: 1px solid $bg;

            button{
                background-color: transparent;
                border: none;

                font-family: $font;
                font-size: 1rem;

                position: relative;

                cursor: pointer;
                padding: 16px;

                &:hover, &:focus{
                    background-color: inherit;
                }
                
                &:after{
                    content: '';
                    position: absolute;
                    top: 50%;
                    transform: translate(0%, -50%);
                    right: 4px;

                    width: 0; 
                    height: 0; 
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    
                    border-top: 6px solid $muted;

                    display: none;
                }

                &.asc{
                    &:after{
                        transform: translate(0%, -50%) scale(-1);
                    }
                }

                &.active{
                    &:after{
                        display: block;
                    }
                }

                &.index{
                    padding: 0;
                }
            }

            @media screen and (max-width: 640px){
                display: flex;
                flex-wrap: wrap;

                button{
                    padding: 4px;

                    &:first-child{
                        display: none;
                    }

                    &.active{
                        width: 100%;
                        order: -1;
                        border:1px solid $muted;
                    }
                }
            }
        }

        & + .additional-province{
            border-top: 1px solid $bg;
        }

        &:not(:first-child){
            &:hover{
                background-color: $bg;
            }
        }

        span{
            position: relative;
            text-align: center;


            @media screen and (max-width: 640px){
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 4px;

                &:before{
                    content: attr(data-tab)
                }
            }
        }

        .regionName{
            font-weight: 600;
        }

        .infectedCount{
            color: $blue;
            font-weight: 600;
         }

        .deceasedCount{
            color: $red;
            font-weight: 600;
         }

        .recoveredCount{
            color: $green;
            font-weight: 600;
         }

        .testedCount, .testedNegative, .testedPositive{
            color: $muted;
            font-weight: 600;
        }

        @media screen and (max-width:1024px){
            grid-template-columns: 1fr;
        }
    }
}

body[data-theme="dark"]{
    .additional{
        &-province{
            .index, .regionName{
                color: $text-dark;
            }

            &:first-child{
                border-bottom-color: $bg-dark;
            }

            &:not(:first-child):hover{
                background-color: $bg-dark;
            }

            & + .additional-province{
                border-top-color: $bg-dark;
            }
        }
    }
}
</style>