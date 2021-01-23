const defaultState = {
  products: [],
  basket: [],
};

function productsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GETPRODCTS':
      return { ...state, products: action.payload };
    case 'ADDBASKET':
      return { ...state, basket: [...state.basket, action.payload] };
    default:
      return state;
  }
}

export default productsReducer;
