import { CHANGE_THEME, CHANGE_LANGAGE, SET_SIDEBAR_OPEN, SET_SIDEBAR_CLOSE, TOGGLE_SIDEBAR } from '../actions';

const initialState = {
  theme: 'light',
  langage: 'en',
  openSidebar: true,
};

type ThemeReducerType = {
  type: string;
  theme?: string;
  langage?: string;
};

export default (state = initialState, action: ThemeReducerType) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case CHANGE_LANGAGE:
      return {
        ...state,
        langage: action.langage,
      };
    case SET_SIDEBAR_OPEN:
      return {
        ...state,
        openSidebar: true,
      };
    case SET_SIDEBAR_CLOSE:
      return {
        ...state,
        openSidebar: false,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        openSidebar: !state.openSidebar,
      };
    default:
      return state;
  }
};
