const defaultState = {
  isAuth: false,
  user: null,
  jwt: null,
};

function counterReducer(state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { isAuth: true, user: action.payload.user, jwt: action.payload.token };
    default:
      return state;
  }
}

export default counterReducer;
