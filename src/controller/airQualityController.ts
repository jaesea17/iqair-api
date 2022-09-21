import axios from "axios";
import express from "express";
import { DataInstance } from "../model/dataModel";
import { v4 as uuid4 } from 'uuid';
import { LocationInstance } from "../model/locationModel";
import { PollutionInstance } from "../model/pollutionModel";
import { WeatherInstance } from "../model/weatherModel";
import { CurrentInstance } from "../model/currentModel";
import cron from 'node-cron';


const APIKEY = process.env.IQAIR_API_KEY;

export async function getAirQualityIp(req: express.Request, res: express.Response) {
    try {
        axios.get(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
            .then((response) => {
                if (response.status === 200) {
                    const details = response.data
                    res.status(200).json({
                        message: 'Successful Retrieval',
                        details
                    })
                }
            })
    } catch (err) {

    }
}


export async function getAirQualityGps(req: express.Request, res: express.Response) {
    try {
        const details = await makeRequest()
        if (details) {
            res.status(200).json({
                message: 'Successful Retrieval',
                details
            })
        }
    } catch (err) {
        if (err) console.log('error:', err)
    }
}


cron.schedule("* * * * *", () => {
    makeRequest()
})


async function makeRequest() {
    const LATITUDE = 48.856613;
    const LONGITUDE = 2.352222;

    const mainId = uuid4()
    const currentId = uuid4()
    console.log('DATA RETIEVED')

    const response = await axios.get(`http://api.airvisual.com/v2/nearest_city?lat=${LATITUDE}&lon=${LONGITUDE}&key=${APIKEY}`)
    if (response.status === 200) {
        const details = response.data;
        const mainData = details.data;

        const {
            city,
            state,
            country,
            location,
            current,
        } = mainData;


        const dataTableInput = await DataInstance.create({
            id: mainId,
            city: city,
            state: state,
            country: country
        })

        const locationTable = await LocationInstance.create({
            id: uuid4(),
            type: location.type,
            coordinates: location.coordinates,
            dataId: mainId
        })

        const currentTable = await CurrentInstance.create({
            id: currentId,
            dataId: mainId
        })

        const pollutionTable = await PollutionInstance.create({
            id: uuid4(),
            ts: current.pollution.ts,
            aqius: current.pollution.aqius,
            mainus: current.pollution.mainus,
            aqicn: current.pollution.aqicn,
            maincn: current.pollution.maincn,
            currentId: currentId
        })

        const weatherTable = await WeatherInstance.create({
            id: uuid4(),
            ts: current.weather.ts,
            tp: current.weather.tp,
            pr: current.weather.pr,
            hu: current.weather.hu,
            ws: current.weather.ws,
            wd: current.weather.wd,
            ic: current.weather.ic,
            currentId: currentId
        })
        return details
    }
}

