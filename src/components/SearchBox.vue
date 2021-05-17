<template>
    <div class="search-box" :class="{opened: is_opened}">
        <div class="search-box-field">
            <input
                class="input-control search-box-input"
                type="search"
                v-model="query"
                ref="searchbox"
                placeholder="Wyszukaj państwo (min. 2 znaki)"
            />
        </div>
        <div class="search-box-list-wrapper">
            <ul class="search-box-list" v-if="latest_search.length > 0">
                <li class="search-box-item-header">Ostatnio wyszukiwane <button class="clear-btn" @click="clear_latest()">Wyczyść</button></li>
                <li class="search-box-item" v-for="(item, index) in latest_search" :key="index">
                    <router-link :to="'/country/'+item.iso2" @click="click_country(item)" class="search-box-item-link"><Flag :country="item.iso2"/><span v-html="bold_query_results(item.name)"></span></router-link>
                </li>
            </ul>
            <ul class="search-box-list" v-if="results.length > 0">
                <li class="search-box-item-header" v-if="latest_search.length > 0">Wyniki wyszukiwania</li>
                <li class="search-box-item" v-for="(item, index) in results" :key="index">
                    <router-link :to="'/country/'+item.iso2" @click="click_country(item)" class="search-box-item-link"><Flag :country="item.iso2"/><span v-html="bold_query_results(item.name)"></span></router-link>
                </li>
            </ul>
            <ul class="search-box-list" v-if="results.length === 0">
                <li class="search-box-item-header" v-if="latest_search.length > 0">Wyniki wyszukiwania</li>
                <li class="search-box-item">
                    <p class="search-box-item-link">Nie znaleziono szukanego państwa</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Flag from "./Flag";

var _ = require('lodash');
import { boldString, filterCountries } from "../assets/js/utils";


export default {
    name: "SearchBox",
    components:{
        Flag,
    },
    data(){
        return {
            query: "",
            results: [],
            is_opened: false,
            latest_search: []
        }
    },
    methods:{
        reset_field(){
            this.query = "";

            this.$refs.searchbox.focus();
        },
        save_latest_search(c){
            const ls = localStorage;

            // Decode
            this.latest_search = (ls.getItem("latest_search")) ? JSON.parse(ls.getItem("latest_search")) : [];

            // Push
            if( c ){
                this.latest_search.unshift(c);
            }

            // Unique
            this.latest_search = _.uniqBy(this.latest_search, 'iso2');

            // Slice
            if( this.latest_search.length > 3 ){
                this.latest_search = this.latest_search.slice(0, 3);
            }

            // Save
            ls.setItem("latest_search", JSON.stringify(this.latest_search));
        },
        clear_latest(){
            const ls = localStorage;

            this.latest_search = [];
            ls.setItem("latest_search", JSON.stringify(this.latest_search));
        },
        click_country(c){
            this.reset_field();
            this.save_latest_search(c);
        },
        bold_query_results(x){
            const highlight = boldString(x.toLowerCase(), this.query);
            return highlight;
        }
    },
    watch: {
        query: function(newValue) {
            if( newValue.length >= 2 ){
                this.results = filterCountries(newValue, "name");

                this.is_opened = true;
            }
            else{
                this.is_opened = false;
            }
        }
    },
    created(){
        window.addEventListener('keydown', (e) => {
            if( this.is_opened && ( (e.key.length === 1 && (/[a-zA-Z0-9-_ ]{0,1}$/.test(e.key))) || e.key === "Backspace" ) ){
                console.log(this.$refs);
                this.$refs.searchbox.focus();
            }
        });
    },
    mounted(){
        this.save_latest_search(false);
    }
}
</script>
<style lang="scss" scoped>
.search-box{
    $this: &;
    position: relative;
    width: 40%;

    &:after{
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparentize($muted, 0.5);
        z-index: 2;

        visibility: hidden;
        opacity: 0;
        pointer-events: none;

        transition: visibility 0.4s ease, opacity 0.4s ease;
    }

    &.opened{
        &:after{
            visibility: visible;
            opacity: 1;
        }

        #{$this}-input{
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-color: transparent;
        }

        #{$this}-list-wrapper{
            visibility: visible;
            opacity: 1;
        }
    }

    &-field{
        position: relative;
        width: 100%;
        z-index: 3;
    }

    &-input{
        width: 100%;
        font-size: 14px;
    }

    &-list{
        list-style: none;

        display: flex;
        flex-direction: column;

        &-wrapper{
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            z-index: 10;

            background-color: #FFFFFF;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 4px 0 rgba(83,86,92,0.06);
            overflow: hidden;

            visibility: hidden;
            opacity: 0;

            transition: visibility 0.4s ease, opacity 0.4s ease;


            max-height: 370px;
            overflow: hidden;
            overflow-y: auto;
        }
    }

    &-item{
        &-link{
            display: block;
            padding: 10px 16px;
            font-family: $font;
            font-size: 16px;
            font-weight: 600;

            color: $muted;
            text-decoration: none;

            outline: none;
            border: 2px solid transparent;
            appearance: none;

            border-top: 1px solid $bg;

            span{
                margin-left: 8px;
            }

            &:is(a){
                text-transform: capitalize;
                
                &:hover, &:focus{
                    color: $green;
                    background-color: $bg;
                }
            }
        }
        
        &-header{
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 7px 16px;
            font-family: $font;
            font-size: 16px;
            font-weight: 600;

            color: $muted;
            text-decoration: none;

            outline: none;
            border: 2px solid transparent;
            appearance: none;

            border-top: 1px solid $bg;
            background-color: $bg;

            span{
                margin-left: 8px;
            }

            button{
                margin-left: auto;

                &.clear-btn{
                    border: none;
                    color: $red;
                    cursor: pointer;
                    font-weight: 600;
                    font-family: $font;
                    background-color: transparent;
                    padding: 7px 16px;
                    margin: -7px -16px -7px 0;
                }
            }

            &:is(a){
                &:hover, &:focus{
                    color: $green;
                    background-color: $bg;
                }
            }
        }
    }
}
</style>