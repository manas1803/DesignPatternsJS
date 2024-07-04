import Observer from "./Observer.mjs"

function logger(data){
    console.log(`Date right now is ${Date.now()} and data is ${data}`)
}

Observer.subscribe(logger)