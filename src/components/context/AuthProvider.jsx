import { createContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  name: 'reza',
  email: 'test@gmail.com',
  password: '1234',
};
function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return { user: action.payload, isAuthenticated: true };
    case 'logout':
      return { user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown Action!');
  }
}
const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: 'logout' });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
