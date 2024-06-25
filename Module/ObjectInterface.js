const gradesCalculation = (function(){
    const grades = [100,98,87,67]
  
    return{
      passing: function(){
        console.log("You are passing")
      },
      failing: function(){
        console.log("You are failing")
      }
    }
  })()
  
  gradesCalculation.passing()