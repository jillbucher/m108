export class DataService {

    getStatus(callback, errorCallback) {
        this.request('/?CMD_PSTS', callback, errorCallback);
    }

    //This provides the dropdown items for the ADC sample rate and clock source settings
    getHardwareADCSettings(callback, errorCallback) {
        this.request('/?CMD_HWAD', callback, errorCallback);
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
        request.timeout = 2000;
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    let success = false;
                    let response = null;
                    try {
                        response = JSON.parse(request.responseText);
                        success = true;
                    } catch(e) {
                        //Ignore json errors
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

        request.ontimeout = () => {
            if (errorCallback) {
                errorCallback.call();
            }
        };

        request.open('GET', url, true);
        request.send();
    }
}
