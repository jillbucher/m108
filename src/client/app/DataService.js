export class DataService {

    getStatus(callback, errorCallback) {
        this.request('/?CMD_PSTS', callback, errorCallback);
    }

    save(name, value, channel, callback) {
        let paramValue = '';
        if (channel && value !== null) {
            paramValue = channel + ',' + value;
        } else if (channel) {
            paramValue = channel;
        } else {
            paramValue = value;
        }
        this.request('/?CMD_'+name+'=' + paramValue, callback);
    }

    request(url, callback, errorCallback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    try {
                        let response = JSON.parse(request.responseText);
                        if (callback) {
                            callback.call(this, response);
                        }
                    } catch(e) {
                        if (errorCallback) {
                            console.log('json failed', e, request.responseText);
                            errorCallback.call()
                        }
                    }
                } else {
                    if (errorCallback) {
                        errorCallback.call();
                    }
                }
            }
        };

        request.open('GET', url, true);
        request.send();
    }
}