export function validarUser (text) {
    const textValido = /^[a-z0-9]+@(gmail|hotmail|outlook)\.com$/.test(text);
    if (text.trim().length === 0) return "Campo requerido.";
    if (!textValido) return "Ingrese un email válido.";
    return '';
  }

  export function validarTexto (text) {
    const regexTexto = /^[A-Za-zÀ-ÿ\s]+$/;
    if (text.trim().length === 0) return "Campo requerido.";
    if (!regexTexto.test(text)) return "Solo letras y espacios.";
    return '';
  };

  export function validarContrasena (text) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{3,}$/;
    if (text.trim().length === 0) return "Campo requerido.";
    if (!regex.test(text)) { return "La contraseña debe tener al menos 3 caracteres, letras mayúsculas y minúsculas, un número y un caracter especial.";}
    return '';
  };