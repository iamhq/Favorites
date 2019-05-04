<template>
    <div class="relative" id="header">
        <img class="header-logo" src="/assets/images/logo.png">
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
    height: 80px;

    color: #fff;
}

.header-logo {
    position: absolute;
    left: 20px;
    top: 0;

    width: 80px;
    height: 80px;
}

#header-nav {
    height: 50px;
    background: #191919;

}
</style>

