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