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
                    let success = false;
                    let response = null;
                    try {
                        response = JSON.parse(request.responseText);
                        success = true;
                    } catch(e) {
                        if (errorCallback) {
                            console.log('json failed', e, request.responseText);
                            errorCallback.call()
                        }
                    }
                    if (success && callback) {
                        callback.call(this, response);
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