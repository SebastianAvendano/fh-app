export const validateRol = (rol: string): string => {
    switch (rol) {
      case 'admin':
        return'Administradores';
      case 'technical':
        return 'Tecnicos';
      default:
        return 'Clientes';
    }
  }