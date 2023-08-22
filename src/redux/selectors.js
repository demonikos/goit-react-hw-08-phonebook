export const getContacts = state => state.contacts.items;
export const getFilter = state => state.filter.value;
export const getLoading = state => state.contacts.isLoading;
export const getRefreshing = state => state.authorization.isRefreshing;
export const getLoggin = state => state.authorization.isLoggIn;
export const getAuthorization = state => state.authorization;
export const getUserName = state => state.authorization.user.name;
export const getAuthorizationError = state => state.authorization.error;
