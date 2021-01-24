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
    case 'REMOVEBASKET':
      // eslint-disable-next-line no-case-declarations
      const newArr = [
        ...state.basket.slice(0, action.payload),
        ...state.basket.slice(action.payload + 1),
      ];
      return { ...state, basket: newArr };
    case 'CLEARBASKET':
      return { ...state, basket: [] };
    default:
      return state;
  }
}

export default productsReducer;
