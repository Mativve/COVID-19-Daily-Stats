<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-12 header-inner">
          <div class="logo">
            <h1>COVID-19</h1>
            <p>Codzienne statystyki</p>
          </div>

          <SearchBox/>

          <ul class="main-menu">
            <li><router-link to="/">Strona główna</router-link></li>
            <li>
              <button class="change-theme" @click="changeTheme">
                <font-awesome-icon :icon="['fas', 'eye-slash']" v-if="theme === 'dark'"/>
                <font-awesome-icon :icon="['fas', 'eye']" v-if="theme === 'light'"/>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SearchBox from "./SearchBox";

export default {
  name: 'Header',
  components:{
    SearchBox
  },
  methods:{
    changeTheme() {
      this.$emit('changeTheme');
    }
  },
  props:{
    theme:{
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  padding: 24px 0;

  .main-menu{
    display: flex;
    align-items: center;
    margin-right: -8px;

    li{
      & + li{
        margin-left: 8px;
      }
      a{
        color: $muted;
        text-decoration: none;
        font-weight: 600;
        display: block;
        padding: 8px;

        &:hover, &:focus, &.is-active{
          color: $green;
        }

        &.is-active{
          &:hover, &:focus{
            color: $red;
          }
        }
      }
    }

    .change-theme{
      background-color: transparent;
      border: none;
      color: $muted;
      cursor: pointer;

      vertical-align: middle;
      text-align: center;
      
      margin: 0 0 0 6px;
      padding: 8px;
      background-color: $bg;
      border-radius: 50%;
      width: 32px;
      height: 32px;

      &:hover, &:focus{
        color: $green;
      }
    }
  }
}
</style>
