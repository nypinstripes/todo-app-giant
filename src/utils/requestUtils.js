export const setRequestOptions = params => {
  const { accept, content, method } = params;
  let acceptHeader = accept ? accept : 'application/json';
  let contentTypeHeader = content ? content : 'application/json';
  let requestMethod = method ? method : 'GET';

  return {
    method: requestMethod,
    headers: {
      'Content-Type': contentTypeHeader,
      'Accept': acceptHeader
    }
  };
};
