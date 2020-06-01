import { CHANGE_THEME, CHANGE_LANGAGE, SET_SIDEBAR_CLOSE, SET_SIDEBAR_OPEN, TOGGLE_SIDEBAR } from '.';

export const changeTheme = (theme: string) => ({
  type: CHANGE_THEME,
  theme,
});

export const changeLangage = (langage: string) => ({
  type: CHANGE_LANGAGE,
  langage,
});

export const setSidebarOpen = () => ({
  type: SET_SIDEBAR_OPEN,
});

export const setSidebarClose = () => ({
  type: SET_SIDEBAR_CLOSE,
});

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});
