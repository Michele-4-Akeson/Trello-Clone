
export default function updateObjectArray(state, setState, object){
    const newState = state.map(obj => {
      if (obj.id == object.id){
        return object
      }

      return obj
    })

    setState([...newState])
}


