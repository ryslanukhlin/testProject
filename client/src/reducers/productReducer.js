const defaultState = {
  products: [],
};

function productsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GETPRODCTS':
      return { products: action.payload };
    default:
      return state;
  }
}

export default productsReducer;
