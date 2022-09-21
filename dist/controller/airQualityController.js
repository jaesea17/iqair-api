"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = exports.requestCron = exports.getAirQualityGps = exports.getAirQualityIp = void 0;
const axios_1 = __importDefault(require("axios"));
const dataModel_1 = require("../model/dataModel");
const uuid_1 = require("uuid");
const locationModel_1 = require("../model/locationModel");
const pollutionModel_1 = require("../model/pollutionModel");
const weatherModel_1 = require("../model/weatherModel");
const currentModel_1 = require("../model/currentModel");
const node_cron_1 = __importDefault(require("node-cron"));
const APIKEY = process.env.IQAIR_API_KEY;
async function getAirQualityIp(req, res) {
    try {
        axios_1.default.get(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
            .then((response) => {
            if (response.status === 200) {
                const details = response.data;
                res.status(200).json({
                    message: 'Successful Retrieval',
                    details
                });
            }
        });
    }
    catch (err) {
    }
}
exports.getAirQualityIp = getAirQualityIp;
async function getAirQualityGps(req, res) {
    try {
        const details = await makeRequest();
        if (details) {
            res.status(200).json({
                message: 'Successful Retrieval',
                details
            });
        }
    }
    catch (err) {
        if (err)
            console.log('error:', err);
    }
}
exports.getAirQualityGps = getAirQualityGps;
exports.requestCron = node_cron_1.default.schedule("* * * * *", () => {
    makeRequest();
});
async function makeRequest() {
    const LATITUDE = 48.856613;
    const LONGITUDE = 2.352222;
    const mainId = (0, uuid_1.v4)();
    const currentId = (0, uuid_1.v4)();
    console.log('DATA RETIEVED');
    const response = await axios_1.default.get(`http://api.airvisual.com/v2/nearest_city?lat=${LATITUDE}&lon=${LONGITUDE}&key=${APIKEY}`);
    if (response.status === 200) {
        const details = response.data;
        const mainData = details.data;
        const { city, state, country, location, current, } = mainData;
        const dataTableInput = await dataModel_1.DataInstance.create({
            id: mainId,
            city: city,
            state: state,
            country: country
        });
        const locationTable = await locationModel_1.LocationInstance.create({
            id: (0, uuid_1.v4)(),
            type: location.type,
            coordinates: location.coordinates,
            dataId: mainId
        });
        const currentTable = await currentModel_1.CurrentInstance.create({
            id: currentId,
            dataId: mainId
        });
        const pollutionTable = await pollutionModel_1.PollutionInstance.create({
            id: (0, uuid_1.v4)(),
            ts: current.pollution.ts,
            aqius: current.pollution.aqius,
            mainus: current.pollution.mainus,
            aqicn: current.pollution.aqicn,
            maincn: current.pollution.maincn,
            currentId: currentId
        });
        const weatherTable = await weatherModel_1.WeatherInstance.create({
            id: (0, uuid_1.v4)(),
            ts: current.weather.ts,
            tp: current.weather.tp,
            pr: current.weather.pr,
            hu: current.weather.hu,
            ws: current.weather.ws,
            wd: current.weather.wd,
            ic: current.weather.ic,
            currentId: currentId
        });
        return details;
    }
}
exports.makeRequest = makeRequest;
