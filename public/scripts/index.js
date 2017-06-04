var Nasijona = (function() {
  var makeRequest = function(url, method, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(null, xhr.responseText);
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        callback(xhr.responseText, null);
      }
    }
    xhr.open(method, url);

    if (method === 'POST') {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  }

  var showMessage = function(msg) {
    var msgBox = document.getElementById('msg-box');
    msgBox.innerHTML = msg;
    msgBox.classList.add('show-msg');

    setTimeout(function() {
      msgBox.innerHTML = '';
      msgBox.classList.remove('show-msg');
    }, 1500);
  }

  var validate = function(origin, data) {
    // check inputs aren't empty
    for (var key in data) {
      if (!data[key].trim()) {
        Nasijona.showMessage('Missing information: ' + key);
        return false;
      }
    }

    if (origin === 'register') {
      // check username for spaces
      if (/\s/.test(data.username)) {
        Nasijona.showMessage('Username can\'t contain spaces');
        return false;
      }

      // check email address
      if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)) {
        Nasijona.showMessage('Email address is invalid');
        return false;
      }

      // check both passwords match
      if (data.password !== data.confirmation) {
        Nasijona.showMessage('Passwords don\'t match');
        return false;
      }
    }

    return true;
  }

  return {
    makeRequest: makeRequest,
    showMessage: showMessage,
    validate: validate
  }
})();