export const camelizeString = str => {
  return str.replace(/[\s|_|-](.)/g, $1 => $1.toUpperCase())
    .replace(/[\s|_|-]/g, '')
    .replace(/^(.)/, $1 => $1.toLowerCase());
};

export const capitalizeString = str => str.replace(/^\w/, c => c.toUpperCase());

export const getBasicReducer = params => {
  const { action: { type, payload }, name, state } = params;

  return type === name ? payload : state;
};

export const inflectTerm = params => {
  const { count, term } = params;

  return count === 1 ? term.substring(0, term.length - 1) : term;
};

export const uniqKey = () => {
  let firstPart = (new Date()).getTime().toString(36);
  let lastPart = Math.random().toString(36).substring(2);

  return `${firstPart}${lastPart}`;
};