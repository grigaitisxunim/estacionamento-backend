export const TOKEN_KEY = "&app-token";
export const ID_USUARIO = "&id-usuario";
export const NOME_USUARIO = "&nome-usuario";
export const USER_TYPE = "&user-type";

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.clear();
};
export const setIdUsuario = (id) => localStorage.setItem(ID_USUARIO, id);
export const getIdUsuario = (id) => localStorage.getItem(ID_USUARIO, id);

export const setNomeUsuario = (nome) =>
  localStorage.setItem(NOME_USUARIO, nome);
export const getNomeUsuario = (nome) =>
  localStorage.getItem(NOME_USUARIO, nome);

export const setTipoUsuario = (tipo) =>
  localStorage.setItem(NOME_USUARIO, tipo);
export const getTipoUsuario = (tipo) =>
  localStorage.getItem(NOME_USUARIO, tipo);
