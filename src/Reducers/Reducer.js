const iState = {
  data: [],
  loader: false,
  spree: ''
};

const Reducer = (state = iState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        data: [action.payload]
      };
    case 'spree_data':
      return {
        spree: [action.payload]
      };
    default:
      return state;
  }
};

export default Reducer;
