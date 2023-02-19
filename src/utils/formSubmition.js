export const changeState = (event, component) =>{
    const update = {}
    update[event.target.id] = event.target.value
    update[event.target.id] && component.setState( update )
  }

export const enterKeySubmit = (event, component) => {
    const { current } = component.Ref
    if (event.key=== 'Enter') {current.focus(); current.click()}
}
