<template>
    <div id="NotFound">
        <h2>"{{$router.currentRoute.path}}"</h2>
        <h1>Esta página no existe.</h1>
        <p>Error 404.</p>
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
    font-weight: normal;
    font-size: 70px; 
    text-align: center;
}

h1 {
    color: #79c471;
    font-weight: bold;
    font-size: 40px;
    text-align: center;
}

</style>