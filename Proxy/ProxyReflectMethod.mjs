const person = {
    name:"Barry Allen",
    age:28,
    email:"fastestman@centralcity.com",
    city:"Central City"
}

export const proxyFlash = new Proxy(person,{
    get:(target,prop)=>{
        return Reflect.get(target,prop)
    },

    set:(target,prop,value)=>{
        Reflect.set(target,prop,value)
        return true;
    }
})