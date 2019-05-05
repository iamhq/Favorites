<template>
    <div class="relative" id="header">
        <img class="header-logo" src="/assets/images/logo.png">
        <nav id="header-nav"></nav>
    </div>
</template>

<script>
export default {
    name: 'head1',
    data(){
        return{
            test:'head',
        }
    }
}
</script>

<style scoped>


#header {
    margin: 0 auto;
    height: 50px;

    color: #fff;
}

.header-logo {
    position: absolute;
    left: 20px;
    top: 5px;

    width: 45px;
    height: 45px;
}

#header-nav {
    height: 50px;
    background: #191919;

}
</style>

