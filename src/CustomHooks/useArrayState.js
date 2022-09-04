
export function updateObjectArray(state, setState, object){
  console.log("Xxxx")
    const newState = state.map(obj => {
      console.log(obj, object)
      if (obj.id == object.id){
        console.log("object foudn")
        return object
      }

      return obj
    })

    
    setState(x=>[...newState])
    console.log(newState)
}


export function filterObjectArray(state, setState, object){
  const newState = state.filter(obj => {
    if (obj.id == object.id){
      return false
    }

    return true
  })

  setState([...newState])

}

