export function validator(term) {
  if (
    !term // undefined, null, empty string
    || isNaN(term) // has letters
    || term == 0
    || term - Math.floor(term) !== 0 // is decimal
  ) return false;
  return true;
}
