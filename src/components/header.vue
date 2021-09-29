<template>
  <div class="hcontainer">
    <div class="header">
      <router-link :to="{name:'Home'}">
        <img src="../assets/iWouldLike2.svg" alt="branding" id="branding">
      </router-link>

      <div id="headerBtns">

        <router-link :to="{name: 'Help'}" class="link">
          <div class="icon">
            <img src="../assets/help.svg" alt="help" id="help"> 
            <span class="tagEv"> Ayuda</span>
          </div>
        </router-link>

        <router-link :to="{name: 'About'}" class="link">
          <div class="icon">
            <img src="../assets/info.svg" alt="info" id="info"> 
            <span class="tag"> Saber más</span>
          </div>
        </router-link>

        <router-link :to="{name: 'Report'}" class="link">
          <div class="icon">
            <img src="../assets/problem.svg" alt="problem" id="prob"> 
            <span class="tag"> Reportar fallo</span>
          </div>
        </router-link>
      </div>
    </div>
    <div id="messageBand">
      <p id="messageBand_text"></p>
    </div>
  </div>
</template>

<style>

  #messageBand p {
    font-weight: bold;
    color: #000;
  }

  .header {
    z-index: 5;
  }

  .hcontainer {
    width: 100vw;
    box-shadow: 0 7px 8px rgba(0, 0, 0, 0.658);
    background: #5f8f5f;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
  }

  .link {
    text-decoration: none;
  }

@media only screen and (max-width: 750px) {
  .header {
    width: 100vw;
    height: 9vh;
    position: fixed;
    top: 0;
    display: flex;
  }

  .hcontainer {
    height: 9vh;
  }

  #headerBtns {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: auto;
    margin-bottom: auto;
    padding-right: 5px;
  }

  #branding {
    height: 8.5vh;
    margin-top: 2px;
    margin-left: 3px;
    align-self: flex-start;
    display: inline-block;
  }

  .icon {
    align-self: flex-end;
    position: relative;
    margin-right: 5px;
    width: auto;
    display: flex;
    align-items: center;
    padding: 1px 3px;

  } 
  
  #help {
    max-height: 25px;
    height: auto;
    align-self: flex-end;
    display: inline-block;
    border-radius: 50%;
  }

  #info {
    max-height: 25px;
    height: auto;
    align-self: flex-end;
    display: inline-block;
    border-radius: 50%;
  }

  #prob {
    max-height: 25px;
    height: auto;
    align-self: flex-end;
    display: inline-block;
    border-radius: 50%;
  }

  .icon:active #prob {
    background: #c47171;
  }

  .icon:active #info {
    background: #79c471;
  }

  .icon:active #help {
    background: #c4aa71;
  }

  .icon:active {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }

  .tag {
    display: none;
  }

  .tagEv {
    color: #fff;
    display: inline-block;
    margin-left: 5px;
    font-size: 14px;
  }

  #messageBand p {
    font-size: 15px;
  }

  #messageBand {
    height: 0px;
    width: 100%;
    top: 9vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: height cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s;
    z-index: 1;
    overflow: hidden;
  }
}

@media only screen and (min-width: 751px) {

  .hcontainer {
    max-width: unset;
    margin-left: unset;
    margin-right: unset;
    height: 7vh;
  }

  .header {
    height: 7vh;
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    max-width: 1920px;
  }

  #headerBtns {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: auto;
    margin-bottom: auto;
    padding-right: 15px;
  }

  #branding {
    height: 6.5vh;
    margin-top: 3px;
    margin-left: 3px;
    align-self: flex-start;
    display: inline-block;
  }

  .icon {
    align-self: flex-end;
    position: relative;
    margin-right: 5px;
    width: auto;
    display: flex;
    align-items: center;
    padding: 5px 5px;

  } 
  
  #help {
    max-height: 25px;
    height: auto;
    align-self: flex-end;
    display: inline-block;
    border-radius: 50%;
  }

  #info {
    max-height: 25px;
    height: auto;
    align-self: flex-end;
    display: inline-block;
    border-radius: 50%;
  }

  #prob {
    max-height: 25px;
    height: auto;
    align-self: flex-end;
    display: inline-block;
    border-radius: 50%;
  }

  .icon:hover #prob {
    background: #c47171;
  }

  .icon:hover #info {
    background: #79c471;
  }

  .icon:hover #help {
    background: #c4aa71;
  }

  .icon:hover {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }

  .tag {
    color: #fff;
    display: inline-block;
    margin-left: 5px;
    font-size: 14px;
  }

  .tagEv {
    color: #fff;
    display: inline-block;
    margin-left: 5px;
    font-size: 14px;
  }

  #messageBand p {
    font-size: 17px;
  }

  #messageBand {
    height: 0px;
    width: 100%;
    top: 7.3vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: height cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s;
    z-index: 1;
    overflow: hidden;
  }
}
</style>