const gradesCalculation = (function(){
    const grades = [98,97,92,87]
    
    const passing = ()=>{
      console.log("You are passing")
    }
  
    const failing = ()=>{
      console.log("You are failing")
    }
  
    return {
      passing:passing
    }
  })()
  
  gradesCalculation.passing()