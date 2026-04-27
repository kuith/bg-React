// Servicio simplificado solo para testing
const mockPlayersData = [
  {
    id: 1,
    correo: "invitado@correo.com",
    password: "invitado123", 
    nombre: "Usuario Invitado",
    rol: "user"
  },
  {
    id: 2,
    correo: "admin@bg.com",
    password: "admin123",
    nombre: "Administrador", 
    rol: "admin"
  }
];

export const getAllPlayers = async () => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPlayersData;
};

export const getPlayerById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockPlayersData.find(player => player.id === parseInt(id));
};

export const loginPlayer = async (correo, password) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const player = mockPlayersData.find(p => p.correo === correo && p.password === password);
  
  if (!player) {
    throw new Error("Credenciales incorrectas");
  }
  
  const { password: _, ...playerData } = player;
  return playerData;
};