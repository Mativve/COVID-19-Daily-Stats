<template>
    <div class="box">

        <router-link :to="'/country/'+data.info.iso2" class="box-item-link"><span>Więcej danych dla:</span><span>{{ data.info.name }}</span></router-link>
        <div class="box-item-title">
            <p>{{ data.info.name }}</p>
            <Flag :country="data.info.iso2"/>
        </div>
        <div class="box-item-stats">
            <p class="blue">Przypadki <span>+{{ data.new_cases }}</span></p>
            <p class="red">Zgony <span>+{{ data.new_deaths }}</span></p>
            <p class="green">Ozdrowienia <span>+{{ data.new_recovered }}</span></p>
        </div>
    </div>
</template>

<script>
import Flag from "./Flag";

export default {
    name: "CountryBoxDaily",
    components:{
        Flag,
    },
    props:{
        data: Object
    },
    data(){
        return {
            countryInfo: null,
        }
    },
    methods:{
        getCountry(){

        }
    }
}
</script>
<style lang="scss" scoped>
.box{
    padding: 16px;
    position: relative;
    overflow: hidden;

    &-item{
        position: relative;
        counter-increment: country-step;

        &:before {
            content: counter(country-step);
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-30%, -30%);
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: #FFFFFF;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            font-size: 14px;
            padding: 0 1px 2px 0;
            box-shadow: 0 2px 4px 0 rgba(83,86,92,0.06);
        }

        &-link{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            flex-direction: column;
            color: $muted;
            text-decoration: none;
            font-weight: 600;
            background-color: rgba(255,255,255,0.9);
            z-index: 1;
            border: 2px solid $green;
            border-radius: 5px;
            padding: 16px;
            opacity: 0;

            transition: opacity 0.4s ease;

            span{
                display: block;
                
                & + span{
                    margin-top: 8px;
                }

                &:last-child{
                    font-size: 1.25rem;
                    color: $green;
                }
            }

            &:hover, &:focus{
                opacity: 1;
            }
        }

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

    @media screen and (max-width:640px){
        padding-bottom: 44px !important;

        &:after{
            content: 'Więcej informacji';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 8px;
            text-align: center;
            color: $green;
            font-weight: 600;
            border-top: 1px solid $bg;
        }
    }
}
</style>