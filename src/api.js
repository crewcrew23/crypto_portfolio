import {cryptoData} from './data.js'

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'X-API-KEY': '/knV0y73CI7pNcZEf5nphDq9YodoptMWGJwDKZmNRlI='
    }
};
export function fakeFetchCrypto() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 10)
    })
}

export function fetchAssets() {
    const assets = JSON.parse(localStorage.getItem('assets'))

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (assets === null){
                localStorage.setItem('assets', JSON.stringify([]))
                location.reload()
            }
            resolve(assets)
        }, 10)
    })
}