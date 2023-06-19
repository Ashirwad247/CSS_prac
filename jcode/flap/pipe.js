const holeHeight= 200
const pipeWidth = 120
const pipint = 1500
let pipes = []
let timslp;
const pipesped = .75
let passPC;

export function setupPipes(){
    document.documentElement.style.setProperty("--pipe-width", pipeWidth)
    document.documentElement.style.setProperty("--hole-height", holeHeight)
    pipes.forEach(pipe => pipe.remove())
    timslp = pipint
    passPC = 0
}

export function updatePipes(delta){
    timslp += delta
    if(timslp > pipint){
        timslp -= timslp
        createPipe()
    }

    pipes.forEach(pipe=>{
        if(pipe.left + pipeWidth<0){
            passPC++
            return pipe.remove()
        }
        pipe.left = pipe.left - delta * pipesped
    })
}

export function getPiprec(){
    return pipes.flatMap(pipe => pipe.rects())
}

export function getPassedPip(){
    return passPC
}

function createPipe(){
    const pipeElem = document.createElement('div')
    const topElem=createPipeSegment("top")
    const bottomElem = createPipeSegment("bottom")
    pipeElem.append(topElem)
    pipeElem.append(bottomElem)
    pipeElem.classList.add("pipe")
    pipeElem.style.setProperty("--hole-top", randomNumberBetween(holeHeight * 1.5, window.innerHeight-holeHeight*.5))
    const pipe = {
        get left(){
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left"))

        },
        set left(value){
            pipeElem.style.setProperty("--pipe-left", value)

        }, 
        remove(){
            pipes = pipes.filter(p => p !== pipe)
            pipeElem.remove()
        },
        rects(){
            return[
                topElem.getBoundingClientRect(),
                bottomElem.getBoundingClientRect()
            ]
        }
    }

    pipe.left = window.innerWidth
    document.body.append(pipeElem)
    pipes.push(pipe)
}

function createPipeSegment(position){
    const segment = document.createElement('div')
    segment.classList.add("segment", position)
    return segment

}

function randomNumberBetween(min, max){
    return Math.floor(Math.random() * (max-min + 1)+ min)
}