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
  }
}
</style>
