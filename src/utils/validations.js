// Formatea una fecha ISO a dd-mm-aaaa
export const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
export const validatePlayer = (form, isEdit = false) => {
  const allowedRoles = ["jugador", "admin"];
  if (!form.nombre || !form.correo || !form.rol || (!isEdit && !form.password)) {
    return "Todos los campos obligatorios deben estar rellenos";
  }
  if (!allowedRoles.includes(form.rol)) {
    return "El rol debe ser 'jugador' o 'admin'";
  }
  if (!/\S+@\S+\.\S+/.test(form.correo)) {
    return "El correo no es válido";
  }
  return null;
};

export const ActualDate = () => {
  const now = new Date();
  const dia = String(now.getDate()).padStart(2, '0');
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  const anio = now.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

export const validateAuthor = (form, isEdit = false) => {
  if (!form.nombre || !form.nacionalidad) {
    return "Todos los campos obligatorios deben estar rellenos";
  }
  // Puedes agregar más validaciones aquí si lo necesitas
  return null;
};

export const validateGame = (form, isEdit = false) => {
  if (!form.nombre || !form.tipo || !form.anioPublicacion || !form.descripcion) {
    return "Todos los campos obligatorios deben estar rellenos";
  }
  if (!Array.isArray(form.autores) || form.autores.length === 0) {
    return "El juego debe tener al menos un autor asociado";
  }
  // Puedes agregar más validaciones aquí si lo necesitas
  return null;
};

export const validateMatch = (form, isEdit = false) => {
  // Verificar campos básicos obligatorios
  if (!form.juego_id || !form.fecha || !Array.isArray(form.jugadores_ids) || form.jugadores_ids.length === 0) {
    return "Todos los campos obligatorios deben estar rellenos";
  }
  
  // Verificar que hay al menos un ganador
  if (!Array.isArray(form.ganadores_ids) || form.ganadores_ids.length === 0) {
    return "Debe haber al menos un ganador";
  }
  
  // Verificar que todos los ganadores están entre los jugadores
  const jugadoresIds = form.jugadores_ids.map(j => typeof j === 'object' ? j.id : j);
  const ganadoresIds = form.ganadores_ids.map(g => typeof g === 'object' ? g.id : g);
  
  const ganadoresInvalidos = ganadoresIds.filter(ganadorId => !jugadoresIds.includes(ganadorId));
  if (ganadoresInvalidos.length > 0) {
    return "Los ganadores deben estar entre los jugadores de la partida";
  }
  
  return null;
};