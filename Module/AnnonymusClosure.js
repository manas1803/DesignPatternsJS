let globalVariable = "Hello From Outside"
(function(){
    const arr = [1,2,3,4,5,6]

    const getEvenNumbers = ()=>{
        arr.filter((ele)=>ele%2===0)
    }

    const getOddNumbers = ()=>{
        arr.filter((ele)=>ele%2!==0)
    }

    console.log(getEvenNumbers())
    console.log(globalVariable)
})()