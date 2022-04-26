const AppReducer = (state, action) => {
  switch (action.type) {
    case 'BOOLEAN_VALUES':
      return {
        ...state,
        booleanValues: {
          ...state.booleanValues,
          isLightButtonVisible: action.isLightButtonVisible,
          isFirstText: action.isFirstText,
        },
      };
    case 'FIRST_RENDER':
      return {
        ...state,
        isFirstRender: {
          ...state.isFirstRender,
          firstRender: action.firstRender,
        },
      };
    default:
      return state;
  }
};

export default AppReducer;
