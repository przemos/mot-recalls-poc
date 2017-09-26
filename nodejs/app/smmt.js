'use strict'

// const axios = require('axios')
const httpClient = require('superagent')
const co = require('co')

let firstCall = true

const recallsApi = (uri, apiKey) => {

    const getRecalls =  co.wrap(function *(vin, marque) {

        console.log('firstCall', firstCall)
        firstCall = false
        return yield httpClient.post(uri)
         .set('Content-Type', 'application/json')
         .send( 
            {
                apikey : apiKey,
                marque : marque,
                vin : vin
            }
        ) 
    }) 

    return {
        getRecalls
    }
}

module.exports = recallsApi