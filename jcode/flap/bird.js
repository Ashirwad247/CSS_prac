const birdElem=document.querySelector('[data-bird]')
const bird_speed = 0.5
let timeSinceLastJump = Number.POSITIVE_INFINITY
const jumpduration = 125

export function setupBird(){
    setTop(window.innerHeight /2)
    document.removeEventListener('keydown', handleJump)

    document.addEventListener('keydown', handleJump)
}


export function updateBird(delta){
    if(timeSinceLastJump < jumpduration){
        setTop(getTop() - bird_speed * 5)

    }else{
        setTop(getTop() + bird_speed * 5)
        
    }

    timeSinceLastJump+=delta
    
    console.log(getTop())

}

function setTop(top){
    birdElem.style.setProperty("--bird-top", top)

}

function getTop(){
    return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))    

}

function handleJump(e){
    if(e.code !== "Space") return

    timeSinceLastJump = 0
}

export function getBirdRect(){
    return birdElem.getBoundingClientRect()
}