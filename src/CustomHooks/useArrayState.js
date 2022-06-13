
export function updateObjectArray(state, setState, object){
    const newState = state.map(obj => {
      if (obj.id == object.id){
        return object
      }

      return obj
    })

    setState([...newState])
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

