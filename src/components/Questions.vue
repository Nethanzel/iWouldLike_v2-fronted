<template>
    <div id="control">

        <div id="back" v-on:click="goBack()">
            <span>{{char_01}}</span>
        </div>

        <div id="view">
            <p id="question">
                {{currentQuestion}}
            </p>

            <img src="" id="viewImg">

            <div id="answers">
            </div>

            <div id="positioner">
                <span class="sposition"></span>
                <span></span>
                <span></span>
            </div>
            <div id="bnMobile">
                <div class="back" v-on:click="goBack()"><span> {{char_02}} Anterior </span></div>
                <div class="next" v-on:click="goNext()"><span>Siguiente >></span></div>
            </div>
        </div>

        <div id="next" v-on:click="goNext()">
            <span>></span>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Questions",
    data() {
        return {
            char_01: "<",
            char_02: "<<",
            currentQuestion: "",
            questionCollection: undefined, //array of objects
            pos: 0,
            type: "",
            cProject: "",
            answeredPos: []
        }
    },

    methods: {
        goNext () {
            let calcPos = this.pos + 1
            this.pos += 1
            this.saveAnswer(this.pos -1)

            if(calcPos > this.questionCollection.length - 1) {
                this.currentQuestion = this.questionCollection[0].question
                this.pos = 0
                this.renderAnswer( this.questionCollection[this.pos].answers,  this.questionCollection[this.pos].type)
                this.rederImg(this.questionCollection[this.pos])
            } else {
                this.currentQuestion = this.questionCollection[calcPos].question
                this.renderAnswer( this.questionCollection[calcPos].answers,  this.questionCollection[calcPos].type)
                this.rederImg(this.questionCollection[calcPos])
            }
            this.positionMarker(this.pos)
            this.determineEnd()
        },

        goBack () {
            let calcPos = this.pos - 1
            this.pos -= 1

            if(calcPos == -1) {
                this.currentQuestion = this.questionCollection[this.questionCollection.length - 1].question
                this.pos = this.questionCollection.length - 1
                this.renderAnswer( this.questionCollection[this.pos].answers,  this.questionCollection[this.pos].type)
                this.rederImg(this.questionCollection[this.pos])
            }
            else {
                this.currentQuestion = this.questionCollection[calcPos].question
                this.renderAnswer( this.questionCollection[calcPos].answers,  this.questionCollection[calcPos].type)
                this.rederImg(this.questionCollection[calcPos])
            }
            this.positionMarker(this.pos)
            this.determineEnd()
        },

        renderAnswer (questionAnswers, type) {

            this.type = type
            let answersView = document.getElementById("answers")
            if(type == "pick") {
                answersView.innerHTML = ""
                answersView.style.display = "block"

                for(let i = 0; i < questionAnswers.length; i++) {
                    let option = `
                        <input type="radio" name="option" id="option${i}" value="${questionAnswers[i]}" style="margin:3px 5px 0 5px;float: left;"> 
                        <label for="option${i}" style="margin-left:30px;display:block;">${questionAnswers[i]}</label> <br>
                    `
                    answersView.innerHTML += option
                }
            } else if(type == "multi") {
                answersView.innerHTML = ""
                answersView.style.display = "block"

                for(let i = 0; i < questionAnswers.length; i++) {
                    let option = `
                        <input type="checkbox" name="option" id="option${i}" value="${questionAnswers[i]}" style="margin: 7px 5px;"> 
                        <label for="option${i}">${questionAnswers[i]}</label> <br>
                    `
                    answersView.innerHTML += option
                }
                answersView.innerHTML += '<p style="margin: 7px 5px;">(Puedes elegir más de una)</p>'
            } else if(type == "text"){
                answersView.style.paddingLeft = "0px"
                answersView.innerHTML = ""
                answersView.style.display = "flex"

                let option = `
                        <textarea id="textarea" name="option" placeholder="Escriba su respuesta."></textarea>
                    `
                    answersView.innerHTML += option

            } else if(type == "select"){
                answersView.innerHTML = ""
                answersView.style.display = "flex"

                let option = `
                        <select id="select" name="option" placeholder="Escriba su respuesta.">
                        <option value="" disabled selected>Seleccione...</option>
                    `
                for(let i = 0; i < questionAnswers.length; i++) {
                    option += `
                    <option value="${questionAnswers[i]}">${questionAnswers[i]}</option>
                    `
                }
                    answersView.innerHTML += option + "</select>"

            } else {
                answersView.innerHTML = ""
            }
        },

        rederImg(obj) {

            let imgview = document.getElementById("viewImg")
            if(obj.img) {
                imgview.src = obj.uri
                imgview.style.display = "flex"
            } else {
                imgview.src = ""
                imgview.style.display = "none"
            }
        },

        saveAnswer(pos) {
            if(this.type == "multi" || this.type == "pick") {
                let question  = ""
                let answer = []
                let options = document.getElementsByName("option")

                question = this.currentQuestion //here you catch the question
                for(let i = 0; i < options.length; i++) {
                    if(options[i].checked) {
                        answer.push(options[i].value) //here you catch the answer
                    }
                }
                let questionResult = {
                    question,
                    answer,
                    pos: this.pos
                }

                if(answer.length == 0) {
                    return null
                }

                this.storageResutls(questionResult) //Value to save as an answered question
                this.highlightAnswered(pos, false)
            } else if(this.type == "text") {

                let question  = ""
                let text = document.getElementById("textarea")
                let answer = [text.value]

                question = this.currentQuestion //here you catch the question

                let questionResult = {
                    question,
                    answer,
                    pos: this.pos
                }

                if(answer[0].length == 0) {
                    return null
                }

                this.storageResutls(questionResult) //Value to save as an answered question
                this.highlightAnswered(pos, false)
            } else if(this.type == "select") {

                let question  = ""
                let slect = document.getElementById("select")
                let answer = [slect.value]

                question = this.currentQuestion //here you catch the question

                let questionResult = {
                    question,
                    answer,
                    pos: this.pos
                }

                if(answer[0] == "") {
                    return null
                }

                this.storageResutls(questionResult) //Value to save as an answered question
                this.highlightAnswered(pos, false)
            }
        },

        storageResutls(value) {
            let exists = this.validateAnswers(value)
            let storage = localStorage.getItem("questionStorage")
             if(storage != null) {
                if(!exists) {
                    storage = JSON.parse(storage)
                    storage.questions.push(value)
                    localStorage.setItem("questionStorage", JSON.stringify(storage))
                }
            } else {
                localStorage.setItem("questionStorage", JSON.stringify({questions: []}))
                this.storageResutls(value)
            }
        },

        loadQuestions() {
            let token = this.clienttoken()

            axios.get("/api/questions", {headers: {"token": token}})

            .then(res => {
                this.questionCollection = res.data[0]
                this.cProject = res.data[1][0]
                
                let status = JSON.parse(localStorage.getItem("iwouldliketoask"))

                let project = status !== null ? status.project : null

               //=================================================================
                if(project !== this.cProject) {
                    localStorage.setItem("questionStorage", JSON.stringify( {"questions":[] }))
                    localStorage.setItem("iwouldliketoask", JSON.stringify({project: this.cProject}))
                }
               //=================================================================
                this.$emit("count", this.questionCollection.length)
                this.dataLoaded()
            })
            .catch((err) => {
                let e = String(err).toLowerCase()
                if(e.includes("network error")) {
                    this.messageBox("Servidor fuera de alcance.", 2)
                } else if (e.includes("code 401")) {
                    this.messageBox("Autenticación requerida o invalida.", 0)
                    this.$emit("rejected", {code: 401})
                } else if (e.includes("code 404")) {
                    this.messageBox("Solictud invalida.", 0)
                } else if(e.includes("code 500")) {
                    this.messageBox("Estamos teniendo algunos problemas con el servidor.", 2)
                } else {
                 this.messageBox("Error desconocido.", 0)
                 this.$emit("rejected", {code: 0})
                }
            })
        },

        validateAnswers(newAnser) {
            let storage = localStorage.getItem("questionStorage")
            if(storage !== null) {
                storage = JSON.parse(storage)
                let answers = storage.questions

                for(let i = 0; i < answers.length; i++) {
                    if(newAnser.question == answers[i].question){

                        if(confirm("Ya habias respondido esta pregunta, ¿quieres guardar la nueva respuesta?")) {
                            let vStorage = storage
                            vStorage.questions.splice(i, 1)
                            localStorage.setItem("questionStorage", JSON.stringify(vStorage))
                            return false
                        } else return true
                    }
                }
                return false
            }
        },

        determineEnd() {

            let status = localStorage.getItem("iwouldliketoask")
            let storage = localStorage.getItem("questionStorage")

            if(storage !== null) {
                status = JSON.parse(status)
                storage = JSON.parse(storage)

                let answers = storage.questions
                let project = status !== null ? status.project : null

                if((answers.length == this.questionCollection.length) && project == this.cProject) {
                    this.$emit("finished", true)

                } else if((answers.length == this.questionCollection.length) && project !== this.cProject) {
                    localStorage.removeItem("iwouldliketoask")
                    
                    if(status == null) {
                        localStorage.setItem("iwouldliketoask", JSON.stringify({project: this.cProject}))
                    } else {
                        status.status.project = this.cProject
                        localStorage.setItem("iwouldliketoask", JSON.stringify(status))
                    }

                    this.$emit("finished", false)

                } else {
                    this.$emit("finished", false)
                }
            }
        },

        dataLoaded() {
            this.currentQuestion = this.questionCollection[0].question
            this.renderAnswer(this.questionCollection[0].answers, this.questionCollection[0].type)
            this.rederImg(this.questionCollection[0])
            let image = document.getElementById("viewImg")
            image.addEventListener("click", (e) => {
                let uri = e.target.getAttribute("src")
                this.$emit("view", uri)
            })
            this.setPositions()
            this.positionMarker(0)
            this.getHighlight()
            this.determineEnd()
            this.$emit("count", this.questionCollection.length)
        },

        positionMarker(pos) {
            let positioner = document.getElementById("positioner")
            let positions = positioner.getElementsByTagName("span")

            for(let i = 0; i < positions.length; i++) {
               if(positions[i].getAttribute("id") == pos && positions[i].classList.contains("answered")) {
                    positions[i].classList.add("hposition")
                } else if(positions[i].getAttribute("id") == pos && !positions[i].classList.contains("answered")) {
                    positions[i].classList.add("sposition")
                } else { 
                    positions[i].classList.remove("sposition")
                    positions[i].classList.remove("hposition")
                }
            }
        },

        setPositions() {
            let positioner = document.getElementById("positioner")
            positioner.innerHTML = ""

            for(let i = 0; i < this.questionCollection.length; i++) {
                positioner.innerHTML += `<span id=${i}></span>`
            }
        },

        highlightAnswered(pos, load) {
            let positioner = document.getElementById("positioner")
            let positions = positioner.getElementsByTagName("span")
            if(!load) {
                for(let i = 0; i < positions.length; i++) {
                    if(positions[i].getAttribute("id") == pos) {
                        positions[i].classList.add("answered")
                        
                        let status = localStorage.getItem("iwouldliketoask")
                        if(status !== null) {
                            status = JSON.parse(status)
                            if(status.positions) {
                                status.positions.push(pos)
                                localStorage.setItem("iwouldliketoask", JSON.stringify(status))
                            } else {
                                status.positions = [pos]
                                localStorage.setItem("iwouldliketoask", JSON.stringify(status))
                            }
                        }
                    }
                } 
            } else {
                for(let i = 0; i < positions.length; i++) {
                    if(positions[i].getAttribute("id") == pos) {
                        if(pos == 0) {
                            positions[i].classList.remove("sposition")
                            positions[i].classList.add("hposition")
                            positions[i].classList.add("answered")
                        } else {
                            positions[i].classList.add("answered")
                        }

                    }
                }     
            }
        },

        getHighlight() {
            let status = localStorage.getItem("iwouldliketoask")
            if(status !== null) {
                status = JSON.parse(status)
                if(status.positions) {
                    for(let pos = 0; pos < status.positions.length; pos++) {
                        this.highlightAnswered(status.positions[pos], true)
                    }
                }
            }
        }
    },

    mounted () {
        document.getElementById("svSpin").style.display = "block"
        this.loadQuestions()
    }
}
</script>

<style>

#positioner {
    width: 100%;
    min-height: 25px;
    margin-top: auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 5px;
}

#positioner span {
    width: 10px;
    height: 10px;
    background: radial-gradient(transparent, #fff);
    box-shadow: 1px 1px 2px 1px black;
    margin: 0 5px;
    border-radius: 50%;
    transition: .4s;
}

#positioner .answered {
    width: 10px;
    height: 10px;
    background: radial-gradient(transparent, #7bde70);
    box-shadow: 1px 1px 2px 1px black;
    margin: 0 5px;
    border-radius: 50%;
    transition: .4s;
}

#positioner .sposition {
    width: 13px;
    height: 13px;
    background: #fff;
    box-shadow: 1px 1px 2px 1px black;
    margin: 0 5px;
    border-radius: 50%;
    transition: .4s;
}

#positioner .hposition {
    width: 13px;
    height: 13px;
    background: #7bde70;
    box-shadow: 1px 1px 2px 1px black;
    margin: 0 5px;
    border-radius: 50%;
    transition: .4s;
}

#viewImg {
    max-width: 25vw;
    margin-bottom: 15px; 
    display: none;
}

#textarea {
    padding: 5px;
    color: #000;
    resize: none;
    outline: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
}

@media only screen and (min-width: 751px) {
    #control {
        display: flex;
        border: solid #888 2px;
        border-radius: 8px;
        margin: 5px 10px 5px 10px;
        height: auto;
        min-height: 215px;
        max-width: 650px;
        background: #c9c9c959;
        box-shadow: 5px 5px 5px #0000008d;
        transition: .5s,;
    }

    #bnMobile {
        display: none;
    }

    #next {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #back {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #next span {
        text-align: center;
        font-size: 52px;
        width: 70px;
        margin: 10px 10px;
        padding-bottom: 8px;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;
    }

    #back span {
        text-align: center;
        font-size: 52px;
        width: 70px;
        margin: 10px 10px;
        padding-bottom: 8px;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;
    }

    #next:hover span {
        background: #79c471;
        border-radius: 50%;
        transition: all .5s;
    }

    #back:hover span {
        background: #79c471;
        border-radius: 50%;
        transition: all .5s;
    }

    #view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        min-width: 450px;
    }

    #question {
        display: block;
        padding: 15px 0 25px 0;
        font-size: 21px;
        font-weight: bold;
        text-align: center;
    }

    #answers {
        width: 100%;
        height: 100%;
    }

    #textarea {
        font-size: 17px;
        font-family: monospace;
        height: 120px;
        width: 90%;
        margin: auto;
    }

    #select {
        font-size: 17px;
        margin: auto;
        height: 30px;
    }
}

@media only screen and (max-width: 750px) {

    #control {
        display: flex;
        border: solid #bbb 2px;
        background: #c9c9c959;
        border-radius: 8px;
        margin: 5px 2px 0 2px;
        height: auto;
        padding: 0px 0px;
        min-width: 97.5vw;
        max-width: 97.5vw;
        transition: .5s;
        box-shadow: 3px 5px 5px #0000008d;
    }

    #next, #back {
        display: none;
    }

    #bnMobile {
        display: flex;
        width: 100%;
        margin-top: 7px;
    }

    #bnMobile .back, #bnMobile .next {
        height: 35px;
        width: 50%;
        display: flex;
        align-items: center;
        border-radius: 5px;
    }

    #bnMobile .back:active, #bnMobile .next:active {
        background: #79c471;
        transition: all .2s;
    }

    #bnMobile .back {
        justify-content: flex-start;
        padding-left: 15px;
    }

    #bnMobile .next {
        justify-content: flex-end;
        padding-right: 15px;
    }

    #bnMobile .back span, #bnMobile .next span {
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;
        font-weight: bold;
        font-size: 17px;
    }

    #view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px;
        width: 100%;
        min-width: 55vw;
    }
 
    #question {
        display: block;
        padding: 15px 0;
        font-size: 17px;
        font-weight: bold;
        text-align: center
    }

    #answers {
        width: 100%;
    }

    #textarea {
        font-size: 17px;
        height: 75px;
        width: 80%;
        margin: 0 auto;

    }

    #select {
        font-size: 17px;
        width: 70%;
        margin: 0 auto;
    }

    #positioner span {
        width: 6px;
        height: 6px;
        background: radial-gradient(transparent, #fff);
        box-shadow: 1px 1px 2px 1px black;
        margin: 0 5px;
        border-radius: 50%;
    }

    #positioner .sposition {
        width: 9px;
        height: 9px;
        background: #fff;
        box-shadow: 1px 1px 2px 1px black;
        margin: 0 5px;
        border-radius: 50%;
    }

    #positioner .answered {
        width: 6px;
        height: 6px;
    }

    #positioner .hposition {
        width: 9px;
        height: 9px;
    }

}
</style>