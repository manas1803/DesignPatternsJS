import Observer from "./Observer.mjs";

Observer.notify("New Data!!")

setTimeout(()=>{
    Observer.notify("New Data in timeout")
},1000)