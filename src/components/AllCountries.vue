<template>
    <section class="section allCountries">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h2 class="section-title"><span>Wszystkie kraje</span><small>({{ page + "/" + max_page }})</small></h2>

                    <button class="allCountries-arr allCountries-prev" @click="prevPage()" v-if="(page > 1)">&lt; Poprzednia</button>
                    <button class="allCountries-arr allCountries-next" @click="nextPage()" v-if="(page < max_page)">Następna &gt;</button>

                    <div class="allCountries-grid">
                        <div class="allCountries-item" v-for="(item, index) in paged" :key="index">
                            <CountryBox :data="item" :showNews="false" v-if="item.info"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row allCountries-footer">
                <div class="col-12">
                    <div><button class="allCountries-arr allCountries-bottom allCountries-prev" @click="prevPage()" v-if="(page > 1)">&lt; Poprzednia</button></div>
                    <div><small>(Strona {{ page + " z " + max_page }})</small></div>
                    <div><button class="allCountries-arr allCountries-bottom allCountries-next" @click="nextPage()" v-if="(page < max_page)">Następna &gt;</button></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CountryBox from "./CountryBox";


export default {
    name: 'AllCountries',
    components:{
        CountryBox
    },
    props: ['countriesList'],
    data(){
        return{
            paged: [],
            page: 1,
            per_page: 9,
            max_page: 1
        }
    },
    methods:{
        setPage(){
            if( this.page < 1 ){ this.page = 1; }
            if( this.page > this.max_page ){ this.page = this.max_page; }
            this.paged = this.countriesList.slice((this.page - 1) * this.per_page, this.page * this.per_page);
            // this.paged = this.countriesList;
        },
        nextPage(){
            this.page++;
            this.setPage();
        },
        prevPage(){
            this.page--;
            this.setPage();
        }
    },
    mounted(){
        this.paged = this.countriesList;
        this.max_page = Math.ceil( this.paged.length / this.per_page );
        this.setPage();
    }
}
</script>

<style lang="scss" scoped>
.allCountries{
    position: relative;

    .box{
        padding: 16px;
    }

    &-grid{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
        gap: 16px;

        &.small{
            grid-template-columns: repeat(1, 1fr);
        }

        @media all and (max-width:1024px){
            grid-template-columns: repeat(2, 1fr);
        }

        @media all and (max-width:648px){
            grid-template-columns: repeat(1, 1fr);
        }
    }
    
    &-item{
        position: relative;

        &-title{
            display: flex;
            justify-content: space-between;
            margin: -16px -16px 8px -16px;
            padding: 12px 16px;
            border-bottom: 1px solid  rgba(0,0,0,0.1);
            text-align: left;
            font-weight: 600;

            p{
                position: relative;
                white-space: nowrap;
                overflow: hidden;
                flex: 1;

                &:after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 25%;
                    height: 100%;
                    box-shadow: inset -24px 0 15px white;
                    pointer-events: none;
                }
            }

            picture{
                margin-left: 8px;
            }
        }

        &-stats{
            p{
                display: flex;
                justify-content: space-between;

                & + p{
                    margin-top: 8px;
                }

                span{
                    text-align: right;

                    small{
                        font-size: 12px;
                        display: block;
                    }
                }
            }

            .blue{
                span{
                    font-weight: 600;
                    color: $blue;
                }
            }

            .red{
                span{
                    font-weight: 600;
                    color: $red;
                }
            }

            .green{
                span{
                    font-weight: 600;
                    color: $green;
                }
            }
        }
    }

    &-footer{
        position: relative;
        margin-top: 1em;

        .col-12{
            display: flex;
            align-items: center;
            justify-content: center;

            div{
                text-align: center;
                font-weight: 600;
                width: 33.33%;

                &:first-child{
                    text-align: left;
                }

                &:last-child{
                    text-align: right;
                }
            }

            @media screen and (max-width:640px){
                flex-wrap: wrap;

                div{
                    width: 50%;

                    button{
                        width: 100%;
                    }

                    &:nth-child(2){
                        order: -1;
                        width: 100%;
                    }
                }
            }
        }
    }

    &-arr{
        position: absolute;
        top: -12px;

        background: $bg;
        color: $green;

        font-family: $font;

        border: none;
        padding: 16px;

        cursor: pointer;

        font-weight: 600;
        font-size: 1rem;

        &:hover, &:focus{
            color: $red;
        }

        @media screen and (max-width:640px){
            position: relative;
            top: 0;
            width: 50%;
        }
    }

    &-prev{
        left: 0;
    }

    &-next{
        right: 0;
    }

    &-bottom{
        position: relative;
        top: initial;
        left: initial;
        right: initial;
        bottom: initial;

        &.allCountries-prev{
            // margin-right: auto;
            margin-left: -8px;
        }

        &.allCountries-next{
            // margin-left: auto;
            margin-right: -8px;
        }
    }
}
</style>