const person = {
    name:"Bruce Wayne",
    age:25,
    email:"darkknight@gotham.com",
    city:"Gotham"
}

export const proxyBatman = new Proxy(person,{
    get:(target,prop)=>{
        return target[prop]
    },

    set:(target,prop,value)=>{
        target[prop] = value
        return true;
    }
})