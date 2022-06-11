const Container = document.getElementById("container");

const docStyle = document.documentElement.style
const floorLifts = []
const upBtns = []
const downBtns = []
let currentFloor = 3;
let isrunning = false

// Creating four floors for the very first time

for(let i = 0; i < 4; i++) {
    createFloor()
}

function createFloor() {
    const div = document.createElement("div")
    const buttonContainer = document.createElement("div")
    const lift = document.createElement("div")
    const button1 = document.createElement("button")
    const button2 = document.createElement("button")
    
    button1.innerText = "Up"
    button2.innerText = "Down"
    
    div.classList.add("floor")
    buttonContainer.classList.add("buttonContainer")
    lift.classList.add("lift")
    button1.classList.add("upButton")
    button2.classList.add("downButton")
    button1.setAttribute("id",`id${Math.random()}_btn`)
    button2.setAttribute("id", `id${Math.random()}_btn`)
    
    Container.appendChild(div)
    buttonContainer.appendChild(button1)
    buttonContainer.appendChild(button2)
    div.appendChild(buttonContainer)
    div.appendChild(lift)

    floorLifts.push(lift)
    upBtns.push(button1)
    downBtns.push(button2)
}
floorLifts[currentFloor].classList.add("liftCurrent")

let btnsup = document.querySelectorAll(".upButton")
let btnsDown = document.querySelectorAll(".downButton")

for(let i = 0; i < btnsup.length; i++) {
    btnsup[i].addEventListener("click", function (e) {
        move(e, "up")
    })
}

for(let i = 0; i < btnsDown.length; i++) {
    btnsDown[i].addEventListener("click", function (e) {
        move(e, "down")
    })
}

function move(e, btnPressed) {
    if(isrunning === false) {
        let animationwidthup = 110 * (currentFloor -  upBtns.indexOf(e.target))
        let animationwidthdown = 110 * (currentFloor -  downBtns.indexOf(e.target))
        let animationwidth = btnPressed === "up" ? animationwidthup : animationwidthdown
        console.log(animationwidth)
        console.log(currentFloor)
        floorLifts[currentFloor].classList.remove("liftCurrent")
        floorLifts[currentFloor].classList.remove("liftAnimated")
        docStyle.setProperty("--top", `${animationwidth}px`)
        currentFloor = btnPressed === "up" ? upBtns.indexOf(e.target) : downBtns.indexOf(e.target)
        floorLifts[currentFloor].classList.add("liftAnimated")
    }
}
