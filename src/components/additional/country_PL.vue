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
                <span class="index"><span>{{ (index++) }}</span></span>
                <span class="regionName"><span>{{ items.region }}</span></span>
                <span class="infectedCount"><span>{{ items.infectedCount }}</span></span>
                <span class="deceasedCount"><span>{{ items.deceasedCount }}</span></span>
                <span class="recoveredCount"><span>{{ items.recoveredCount }}</span></span>
                <span class="testedCount"><span>{{ items.testedCount }}</span></span>
                <span class="testedNegative"><span>{{ items.testedNegative }}</span></span>
                <span class="testedPositive"><span>{{ items.testedPositive }}</span></span>
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
<style lang="scss" scoped>
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
    }

    &-grid{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: auto;
        gap: 16px;
    }

    &-list-of-provinces{
        // padding: 24px 16px;
        // background-color: #FFFFFF;
        // color: #191b1a;
        // position: relative;
        // overflow: hidden;
        // box-shadow: 0 2px 4px 0 rgba(83, 86, 92, 0.06);
        // border-radius: 5px;

        list-style: none;
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
            }
        }

        & + .additional-province{
            border-top: 1px solid $bg;
        }

        &:not(:first-child):hover{
            background-color: $bg;
        }

        span{
            text-align: center;
        }

        .regionName{
            font-weight: 600;
        }

        .infectedCount{
            color: $blue;

            span{
                font-weight: 600;
            }
         }

        .deceasedCount{
            color: $red;

            span{
                font-weight: 600;
            }
         }

        .recoveredCount{
            color: $green;

            span{
                font-weight: 600;
            }
         }

        .testedCount{
            span{
                font-weight: 600;
                color: $muted;
            }
        }

        .testedNegative{
            span{
                font-weight: 600;
                color: $muted;
            }
        }

        .testedPositive{
            span{
                font-weight: 600;
                color: $muted;
            }
        }
    }
}
</style>