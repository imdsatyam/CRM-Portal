import konsole from "../controls/Konsole";

export let $CommonServiceFn = {
    InvokeCommonApi: function (method, url, inputData, callback) {
    konsole.log(`API Request: ${method} ${url}`);
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'GET' ? JSON.stringify(inputData) : null,
      })
        .then((response) => response.json())
        .then((data) => {
          konsole.log("Response from API:", data);
          if (callback) callback(data, null);
        })
        .catch((error) => {
          konsole.error('API Error:', error);
          if (callback) callback(null, error);
        });
    },
  };