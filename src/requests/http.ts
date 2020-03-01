import axios from 'axios'

export function get(url: string, config: object) {
    axios.get(url, config).then(() => {
        console.log(url);
    });
}

export function post(url: string, config: object) {
    axios.post(url, config).then(() => {
        console.log(url);
    });
}
