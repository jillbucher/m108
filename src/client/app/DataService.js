export class DataService {

    getStatus(callback) {
        this.request('/?CMD_PSTS', callback);
    }

    save(name, value, channel, callback) {
        let paramValue = '';
        if (channel && value) {
            paramValue = channel + ',' + value;
        } else if (channel) {
            paramValue = channel;
        } else {
            paramValue = value;
        }
        this.request('/?CMD_'+name+'=' + paramValue, callback);
    }

    request(url, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    let response = JSON.parse(request.responseText);
                    callback.call(this, response);
                }
            }
        };

        request.open('GET', 'http://192.168.0.6' + url, true);
        request.send();
    }
}