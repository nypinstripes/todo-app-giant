export const getBasicReducer = params => {
  const { action: { type, payload }, name, state } = params;

  return type === name ? payload : state;
};

export const setRequestOptions = params => {
  const { accept, content, data, method } = params;
  let options = {
    method: method ? method : 'GET',
    headers: {
      'Content-Type': content ? content : 'application/json',
      'Accept': accept ? accept : 'application/json'
    },
    resolveWithFullResponse: true
  };

  if ('PATCH POST PUT'.indexOf(method) !== -1) {
    options.body = JSON.stringify(data);
  }

  return options;
};


export const uniqKey = () => {
  let firstPart = (new Date()).getTime().toString(36);
  let lastPart = Math.random().toString(36).substring(2);

  return `${firstPart}${lastPart}`;
};
