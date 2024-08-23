export const validators: { [key: string]: (value: string) => boolean } = {
  'Rule 1': (value: string) => value.length >= 5,
  'Rule 2': (value: string) => /[A-Z]/.test(value),
  'Rule 3': (value: string) => /[0-9]/.test(value),
  'Rule 4': (value: string) =>
    /[!@#$%^&*()_+\-=[\]{}|;:'",.<>?\\\/]/.test(value),
  'Rule 5': (value: string) => !/(.)\1/.test(value),
  'Rule 6': (value: string) => /\p{Emoji}/u.test(value),
  'Rule 7': (value: string) => {
    // Buscar números en la contraseña y verificar si alguno es primo
    const numbers = value.match(/\d+/g); // Encuentra todos los números en la cadena
    return numbers ? numbers.some((num) => isPrime(parseInt(num))) : false;
  },
  'Rule 8': (value: string) => /[A-Z]/.test(value),
  'Rule 9': (value: string) => /[A-Z]/.test(value),
  'Rule 10': (value: string) => /[A-Z]/.test(value),
  'Rule 11': (value: string) => /[A-Z]/.test(value),
  'Rule 12': (value: string) => /[A-Z]/.test(value),
  'Rule 13': (value: string) => /[A-Z]/.test(value),
  'Rule 14': (value: string) => /[A-Z]/.test(value),
  'Rule 15': (value: string) => /[A-Z]/.test(value),
  'Rule 16': (value: string) => /[A-Z]/.test(value),
  'Rule 17': (value: string) => /[A-Z]/.test(value),
  'Rule 18': (value: string) => /[A-Z]/.test(value),
};

const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};
