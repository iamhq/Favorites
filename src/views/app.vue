<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app',
    data(){
        return{
            test:213123,
        }
    }
}
</script>
<style scoped>
ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
}

html,body {
    margin: 0;
    padding: 0;
    height: 100%;
}

#app {
    margin: 0 auto;
    max-width: 1400px;
    min-height: 100%;
}
</style>

