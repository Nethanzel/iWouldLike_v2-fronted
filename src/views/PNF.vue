<template>
    <div id="NotFound">
        <p>Error 404.</p>
        <h2>"{{$router.currentRoute.path}}"</h2>
        <h1>Esta página no existe.</h1>
    </div>
</template>

<style scoped>

#NotFound {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h2 {
    font-weight: bold;
    font-size: 75px; 
    text-align: center;
    font-style: italic;
}

h1 {
    color: #79c471;
    font-weight: normal;
    font-size: 35px;
    text-align: center;
}

p{
    font-size: 21px;
}

</style>