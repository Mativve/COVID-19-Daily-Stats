<template>
    <footer class="main-footer">
        <div class="container">
            <div class="row main-footer-in">
                <div class="col-sm-12 col-md-6 main-footer-left">
                    <p>Create with ❤️ at 🌑 by <a href="https://github.com/mativve" target="_blank" rel="noopener noreferrer">Mativve</a></p>
                </div>
                <div class="col-sm-12 col-md-6 main-footer-right">
                    <p>2021</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    data(){
        return {

        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>
<style lang="scss">
.main-footer-in{
    padding-top: 2em;
    padding-bottom: 1em;

    a{
        color: $green;
        font-weight: 600;
        text-decoration: none;

        &:hover, &:focus{
            color: $red;
        }
    }
}

.main-footer-left{

}

.main-footer-right{
    text-align: right;
}
</style>