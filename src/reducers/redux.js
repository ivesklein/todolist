const session = (state = {tasks:[]}, action) => {
  switch (action.type) {
    case 'SETTASKS':
      return {
        ...state,
          tasks: action.tasks
      }
    default:
      return state
  }
}

export default session