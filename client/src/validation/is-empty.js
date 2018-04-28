//this is a method to check if a object is empty
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};        //it's gonna check for the null or empty object or empty string


export default isEmpty;
