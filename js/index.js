const Container = document.getElementById("container")
const addfloorBtn = document.getElementById("addfloor")
const removeFloorBtn = document.getElementById("removefloor")
const addLiftBtn = document.getElementById("addlift")
const removeLiftBtn = document.getElementById("removelift")
let Floors = 0
let isrunning = false
let liftpos = 0
const targetFloors = []

function createElement({type, attributes={}, innerText}) {
    const element = document.createElement(type)
    Object.keys(attributes).forEach(item => {
        element.setAttribute(item, attributes[item]);
    })
    element.textContent = innerText
    return element
}

function addFloor() {
    const floor = createElement({type: "div", attributes: {class: "floor"}})
    const btnContainer = createElement({type: "div", attributes: {class: "buttonContainer"}})
    const floorNumber = createElement({type: "div", attributes: {class: "floorNumber"}, innerText: `floor ${Floors}`})
    
    const upBtn = createElement({type: "button", attributes: {class: "upBtn", floorno: `${Floors}`}, innerText: "up"})
    const DownBtn = createElement({type: "button", attributes: {class: "downBtn", floorno: `${Floors}`},innerText: "Down"})
    
    upBtn.addEventListener("click", () => useLift(upBtn.getAttribute("floorno")))
    DownBtn.addEventListener("click", () => useLift(DownBtn.getAttribute("floorno")))
    
    btnContainer.appendChild(upBtn)
    btnContainer.appendChild(DownBtn)
    floor.appendChild(btnContainer)
    floor.appendChild(floorNumber)
    Container.prepend(floor)
    Floors++
}

function removeFloor() {
    Floors--
    const floors = document.querySelectorAll(".floor")
    floors[0].remove()
    console.log(floors)
}

function addLift() {
    liftpos++
    const elevator = createElement({type: "div", attributes: {class: "elevator", onfloor: 0, pos: liftpos}})
    const door1 = createElement({type: "div", attributes: {class: "door"}})
    const door2 = createElement({type: "div", attributes: {class: "door"}})
    elevator.setAttribute("id", `pos${liftpos}`)
    
    elevator.appendChild(door1)
    elevator.appendChild(door2)
    Container.append(elevator)
    definepos()
}

function removeLift() {
    liftpos--
    const elevators = document.querySelectorAll(".elevator")
    elevators[elevators.length - 1].remove()
}

function definepos() {
    const elevator = document.getElementById(`pos${liftpos}`)
    elevator.style.left = `${100 * liftpos}px`
}

for(let i = 0; i < 4; i++) {
    addFloor()
}

addLift()

console.log(Container)

function useLift(targetFloor) {
    const elevators = document.querySelectorAll(".elevator")

    let pos;

    for(let i = 0; i < elevators.length; i++) {
        if(elevators[i].classList.contains("busy")) {
            if(elevators[i].getAttribute("onfloor") === targetFloor) {
                return;
            }
            console.log("check next")
        } else {
            pos = i
            move(targetFloor, pos)
            break;
        }
    }
    if(pos === undefined) {
        targetFloors.push(targetFloor)
    }
}

 function move(targetFloor, pos) {
        const elevators = document.querySelectorAll(".elevator")
        const elevator = elevators[pos]

            let currentFloor = elevator.getAttribute("onfloor")
            let duration = Math.abs(targetFloor - currentFloor) * 2
    
            elevator.setAttribute("onfloor",targetFloor)
            elevator.style.transition = `transform ${duration}s linear`
            elevator.style.transform = `translateY(-${(120 * targetFloor)}px)`
            elevator.classList.add("busy")

            let doors = elevator.children

            setTimeout(() => {
                doors[0].style.transform = 'translateX(-30px)'
                doors[1].style.transform = 'translateX(30px)'
            }, duration * 1000)

            setTimeout(() => {
                doors[0].style.transform = "none"
                doors[1].style.transform = "none"
            }, duration * 1000 + 3000)
    
            setTimeout(() => {
                elevator.classList.remove("busy")
                if(targetFloors.length) {
                    move(targetFloors.shift(),pos)
                }
            }, duration * 1000 + 5000)
}

addfloorBtn.addEventListener("click",addFloor)
addLiftBtn.addEventListener("click", addLift)
removeFloorBtn.addEventListener("click",removeFloor)
removeLiftBtn.addEventListener("click", removeLift)