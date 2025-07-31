// Utilidades de validación para formularios

// Validar email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar contraseña
export const validatePassword = (password) => {
  // Al menos 8 caracteres, una mayúscula, una minúscula y un número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validar teléfono colombiano
export const validatePhone = (phone) => {
  // Formato: +57 XXX XXX XXXX o 3XXXXXXXXX
  const phoneRegex = /^(\+57\s?)?[3][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validar nombre (solo letras y espacios)
export const validateName = (name) => {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
  return nameRegex.test(name);
};

// Validar código postal colombiano
export const validatePostalCode = (postalCode) => {
  const postalCodeRegex = /^[0-9]{6}$/;
  return postalCodeRegex.test(postalCode);
};

// Validar URL
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validar precio
export const validatePrice = (price) => {
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return priceRegex.test(price) && parseFloat(price) > 0;
};

// Validar cantidad
export const validateQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};

// Validar SKU
export const validateSku = (sku) => {
  const skuRegex = /^[A-Z0-9-]{3,20}$/;
  return skuRegex.test(sku);
};

// Validar slug
export const validateSlug = (slug) => {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug);
};

// Validaciones de formularios completos
export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(data.email)) {
    errors.email = 'El email no es válido';
  }

  if (!data.password) {
    errors.password = 'La contraseña es requerida';
  } else if (data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegisterForm = (data) => {
  const errors = {};

  if (!data.firstName) {
    errors.firstName = 'El nombre es requerido';
  } else if (!validateName(data.firstName)) {
    errors.firstName = 'El nombre solo puede contener letras y espacios';
  }

  if (!data.lastName) {
    errors.lastName = 'El apellido es requerido';
  } else if (!validateName(data.lastName)) {
    errors.lastName = 'El apellido solo puede contener letras y espacios';
  }

  if (!data.email) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(data.email)) {
    errors.email = 'El email no es válido';
  }

  if (!data.password) {
    errors.password = 'La contraseña es requerida';
  } else if (!validatePassword(data.password)) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'El teléfono no es válido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAddressForm = (data) => {
  const errors = {};

  if (!data.firstName) {
    errors.firstName = 'El nombre es requerido';
  } else if (!validateName(data.firstName)) {
    errors.firstName = 'El nombre solo puede contener letras y espacios';
  }

  if (!data.lastName) {
    errors.lastName = 'El apellido es requerido';
  } else if (!validateName(data.lastName)) {
    errors.lastName = 'El apellido solo puede contener letras y espacios';
  }

  if (!data.address1) {
    errors.address1 = 'La dirección es requerida';
  } else if (data.address1.length < 5) {
    errors.address1 = 'La dirección debe tener al menos 5 caracteres';
  }

  if (!data.city) {
    errors.city = 'La ciudad es requerida';
  } else if (!validateName(data.city)) {
    errors.city = 'La ciudad solo puede contener letras y espacios';
  }

  if (!data.state) {
    errors.state = 'El departamento es requerido';
  } else if (!validateName(data.state)) {
    errors.state = 'El departamento solo puede contener letras y espacios';
  }

  if (!data.postalCode) {
    errors.postalCode = 'El código postal es requerido';
  } else if (!validatePostalCode(data.postalCode)) {
    errors.postalCode = 'El código postal debe tener 6 dígitos';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'El teléfono no es válido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateProductForm = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'El nombre del producto es requerido';
  } else if (data.name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!data.description) {
    errors.description = 'La descripción es requerida';
  } else if (data.description.length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }

  if (!data.price) {
    errors.price = 'El precio es requerido';
  } else if (!validatePrice(data.price)) {
    errors.price = 'El precio no es válido';
  }

  if (!data.sku) {
    errors.sku = 'El SKU es requerido';
  } else if (!validateSku(data.sku)) {
    errors.sku = 'El SKU debe contener solo letras mayúsculas, números y guiones';
  }

  if (!data.categoryId) {
    errors.categoryId = 'La categoría es requerida';
  }

  if (data.quantity !== undefined && !validateQuantity(parseInt(data.quantity))) {
    errors.quantity = 'La cantidad debe ser un número entero positivo';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateReviewForm = (data) => {
  const errors = {};

  if (!data.rating) {
    errors.rating = 'La calificación es requerida';
  } else if (data.rating < 1 || data.rating > 5) {
    errors.rating = 'La calificación debe estar entre 1 y 5';
  }

  if (data.title && data.title.length > 200) {
    errors.title = 'El título no puede tener más de 200 caracteres';
  }

  if (data.comment && data.comment.length > 1000) {
    errors.comment = 'El comentario no puede tener más de 1000 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Sanitizar datos de entrada
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover caracteres peligrosos
    .substring(0, 1000); // Limitar longitud
};

// Validar archivo de imagen
export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG, WebP y GIF.'
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'El archivo es muy grande. El tamaño máximo es 10MB.'
    };
  }

  return { isValid: true };
};

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validatePostalCode,
  validateUrl,
  validatePrice,
  validateQuantity,
  validateSku,
  validateSlug,
  validateLoginForm,
  validateRegisterForm,
  validateAddressForm,
  validateProductForm,
  validateReviewForm,
  sanitizeInput,
  validateImageFile
};
