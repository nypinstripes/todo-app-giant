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
    console.log(method);
    options.body = JSON.stringify(data);
  }

  return options;
};
