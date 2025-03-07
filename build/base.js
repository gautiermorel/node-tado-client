"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseTado_httpsAgent, _BaseTado_accessToken, _BaseTado_refreshToken;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTado = void 0;
const https_1 = require("https");
const axios_1 = __importStar(require("axios"));
const types_1 = require("./types");
const tado_auth_url = "https://login.tado.com/oauth2/token";
const tado_device_auth_url = "https://login.tado.com/oauth2/device_authorize";
const tado_url = "https://my.tado.com";
const client_id = "1bb50063-6b0c-4d11-bd99-387f4a91cc46";
class BaseTado {
    constructor() {
        _BaseTado_httpsAgent.set(this, void 0);
        _BaseTado_accessToken.set(this, void 0);
        _BaseTado_refreshToken.set(this, void 0);
        __classPrivateFieldSet(this, _BaseTado_httpsAgent, new https_1.Agent({ keepAlive: true }), "f");
    }
    async initiateDeviceCodeFlow() {
        const response = await axios_1.default.post(tado_device_auth_url, null, {
            params: {
                client_id: client_id,
                scope: "offline_access",
            },
        });
        const data = response.data;
        console.log(`Go to: ${data.verification_uri_complete} and enter code: ${data.user_code}`);
        await this.pollForToken(data.device_code, data.interval);
    }
    async pollForToken(device_code, interval) {
        var _a;
        while (true) {
            await new Promise((resolve) => setTimeout(resolve, interval * 1000));
            try {
                const response = await axios_1.default.post(tado_auth_url, null, {
                    params: {
                        client_id: client_id,
                        device_code: device_code,
                        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
                    },
                });
                __classPrivateFieldSet(this, _BaseTado_accessToken, response.data.access_token, "f");
                __classPrivateFieldSet(this, _BaseTado_refreshToken, response.data.refresh_token, "f");
                console.log("Successfully authenticated!");
                break;
            }
            catch (error) {
                if (error instanceof axios_1.AxiosError && ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) !== 400) {
                    throw new Error("Failed to retrieve token.");
                }
            }
        }
    }
    async refreshToken() {
        if (!__classPrivateFieldGet(this, _BaseTado_refreshToken, "f")) {
            throw new Error("No refresh token available.");
        }
        const response = await axios_1.default.post(tado_auth_url, null, {
            params: {
                client_id: client_id,
                grant_type: "refresh_token",
                refresh_token: __classPrivateFieldGet(this, _BaseTado_refreshToken, "f"),
            },
        });
        __classPrivateFieldSet(this, _BaseTado_accessToken, response.data.access_token, "f");
        __classPrivateFieldSet(this, _BaseTado_refreshToken, response.data.refresh_token, "f");
        console.log("Token refreshed successfully.");
    }
    async apiCall(url, method = "get", data) {
        if (!__classPrivateFieldGet(this, _BaseTado_accessToken, "f")) {
            throw new Error("No access token available. Please authenticate first.");
        }
        const request = {
            url: tado_url + url,
            method: method,
            data: data,
            headers: {
                Authorization: "Bearer " + __classPrivateFieldGet(this, _BaseTado_accessToken, "f"),
            },
            httpsAgent: __classPrivateFieldGet(this, _BaseTado_httpsAgent, "f"),
        };
        const response = await (0, axios_1.default)(request);
        return response.data;
    }
    getMe() {
        return this.apiCall("/api/v2/me");
    }
    /**
     * Fetches and returns the home details for the specified home ID.
     *
     * @param home_id - The ID of the home to be retrieved.
     * @returns A promise that resolves to the details of the home.
     */
    getHome(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}`);
    }
    /**
     * Sets the away radius for a specific home.
     *
     * @param home_id - The ID of the home.
     * @param away_radius_meters - The away radius in meters.
     * @returns A promise that resolves when the away radius is successfully set.
     */
    setAwayRadius(home_id, away_radius_meters) {
        return this.apiCall(`/api/v2/homes/${home_id}/awayRadiusInMeters`, "PUT", {
            awayRadiusInMeters: away_radius_meters,
        });
    }
    /**
     * Fetches incident detection details for the specified home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to the incident detection details of the home.
     */
    getIncidentDetection(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/incidentDetection`);
    }
    /**
     * Enables or disables incident detection for a specified home.
     *
     * @param home_id - The unique identifier of the home.
     * @param enabled - Indicates whether incident detection should be enabled (true) or disabled (false).
     * @returns A promise that resolves when the operation is complete.
     */
    setIncidentDetection(home_id, enabled) {
        return this.apiCall(`/api/v2/homes/${home_id}/incidentDetection`, "PUT", {
            enabled: enabled,
        });
    }
    /**
     * Checks if the early start feature is enabled for a given home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to a boolean indicating whether the early start feature is enabled.
     */
    async isEarlyStartEnabled(home_id) {
        const { enabled } = await this.apiCall(`/api/v2/homes/${home_id}/earlyStart`);
        return enabled;
    }
    /**
     * Sets the early start feature for a specified home.
     *
     * @param home_id - The unique identifier of the home.
     * @param enabled - A boolean indicating whether the early start feature should be enabled or disabled.
     * @returns A promise that resolves when the early start setting has been successfully updated.
     */
    setEarlyStart(home_id, enabled) {
        return this.apiCall(`/api/v2/homes/${home_id}/earlyStart`, "PUT", {
            enabled: enabled,
        });
    }
    /**
     * Fetches the weather information for a specified home.
     *
     * @param home_id - The unique identifier of the home for which to retrieve the weather data.
     * @returns A promise that resolves to a Weather object containing the weather information for the specified home.
     */
    getWeather(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/weather`);
    }
    /**
     * Fetches the list of installations for a given home.
     *
     * @param home_id - The ID of the home for which to fetch installations.
     * @returns A promise that resolves to an array of installations.
     */
    getInstallations(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/installations`);
    }
    /**
     * Fetches the list of invitations for a specified home.
     *
     * @param home_id - The ID of the home for which to retrieve invitations.
     * @returns A promise that resolves to an array of Invitation objects.
     */
    getInvitations(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/invitations`);
    }
    /**
     * Retrieves an invitation based on the provided home ID and token.
     *
     * @param home_id - The ID of the home for which the invitation is to be retrieved.
     * @param token - The unique token (invitation id) associated with the invitation.
     * @returns A promise that resolves to the invitation details.
     */
    getInvitation(home_id, token) {
        return this.apiCall(`/api/v2/homes/${home_id}/invitations/${token}`);
    }
    /**
     * Creates an invitation for a specified home.
     *
     * @param home_id - The unique identifier of the home to which the invitation will be sent.
     * @param email - The email address of the invitee.
     * @returns A promise that resolves to an Invitation object.
     */
    createInvitation(home_id, email) {
        return this.apiCall(`/api/v2/homes/${home_id}/invitations`, "POST", {
            email: email,
        });
    }
    /**
     * Resends an invitation to a specific home.
     *
     * @param home_id - The ID of the home for which the invitation is to be resent.
     * @param token - The token representing the invitation to be resent.
     * @returns A promise that resolves once the invitation has been resent.
     */
    resendInvitation(home_id, token) {
        return this.apiCall(`/api/v2/homes/${home_id}/invitations/${token}/resend`, "POST", {});
    }
    /**
     * Deletes an invitation associated with a home.
     *
     * @param home_id - The unique identifier of the home.
     * @param token - The token associated with the invitation.
     * @returns A promise that resolves when the invitation is successfully deleted.
     */
    deleteInvitation(home_id, token) {
        return this.apiCall(`/api/v2/homes/${home_id}/invitations/${token}`, "DELETE");
    }
    /**
     * Fetches the list of users associated with a given home.
     *
     * @param home_id - The ID of the home for which to fetch users.
     * @returns A promise that resolves to an array of User objects.
     */
    getUsers(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/users`);
    }
    /**
     * Fetches the state of a home based on the provided home ID.
     *
     * @param home_id - The unique identifier of the home for which the state is to be retrieved.
     * @returns A promise that resolves to the state of the specified home.
     */
    getState(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/state`);
    }
    /**
     * Retrieves the heating circuits associated with a given home based on the home ID.
     *
     * @param home_id - The ID of the home for which to retrieve heating circuits.
     * @returns A promise that resolves to a HeatingCircuit object.
     */
    getHeatingCircuits(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/heatingCircuits`);
    }
    /**
     * Retrieves a list of mobile devices associated with a given home ID.
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to an array of MobileDevice objects.
     */
    getMobileDevices(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/mobileDevices`);
    }
    /**
     * Fetches a mobile device associated with the given home ID and mobile device ID.
     *
     * @param home_id - The ID of the home.
     * @param mobile_device_id - The ID of the mobile device.
     * @returns A promise that resolves to the mobile device data.
     */
    getMobileDevice(home_id, mobile_device_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/mobileDevices/${mobile_device_id}`);
    }
    /**
     * Fetches the settings for a specific mobile device within a given home.
     *
     * @param home_id - The unique identifier of the home.
     * @param mobile_device_id - The unique identifier of the mobile device.
     * @returns  A promise that resolves to the mobile device's settings.
     */
    getMobileDeviceSettings(home_id, mobile_device_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/mobileDevices/${mobile_device_id}/settings`);
    }
    /**
     * Sets the geo-tracking settings for a specified mobile device in a given home.
     *
     * @param home_id - The ID of the home.
     * @param mobile_device_id - The ID of the mobile device.
     * @param geoTrackingEnabled - A flag indicating whether geo-tracking should be enabled.
     * @returns A promise that resolves to the updated mobile device settings.
     */
    async setGeoTracking(home_id, mobile_device_id, geoTrackingEnabled) {
        const settings = await this.getMobileDeviceSettings(home_id, mobile_device_id);
        return this.apiCall(`/api/v2/homes/${home_id}/mobileDevices/${mobile_device_id}/settings`, "put", {
            ...settings,
            geoTrackingEnabled: geoTrackingEnabled,
        });
    }
    /**
     * Creates a push notification registration for a given home and mobile device.
     *
     * Note: Do not use this unless you know what you are doing, you might want to consider
     * registering a dummy device.
     *
     * @param home_id - The identifier for the home.
     * @param mobile_device_id - The identifier for the mobile device.
     * @param token - The push notification token for the device.
     * @returns A promise that resolves to the push notification registration (AWS SNS Endpoint ARN).
     */
    createPushNotificationRegistration(home_id, mobile_device_id, token) {
        return this.apiCall(`/api/v2/homes/${home_id}/mobileDevices/${mobile_device_id}/pushNotificationRegistration`, "put", {
            token: token,
            firebaseProject: "tado-app",
            provider: "FCM",
        });
    }
    /**
     * Fetches the geo-location configuration for a specific mobile device in a home.
     *
     * @param home_id - The unique identifier of the home.
     * @param mobile_device_id - The unique identifier of the mobile device.
     * @returns A promise that resolves to the mobile device's geo-location configuration.
     */
    getMobileDeviceGeoLocationConfig(home_id, mobile_device_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/mobileDevices/${mobile_device_id}/geoLocationConfig`);
    }
    /**
     * Fetches the running times for a given home within the specified date range.
     *
     * @param home_id - The ID of the home from which to retrieve running times.
     * @param from - The start date of the period in the format `YYYY-MM-DD`.
     * @param to - The end date of the period in the format `YYYY-MM-DD`.
     * @param aggregate - The aggregation type for running times (e.g., daily, weekly, monthly).
     * @param summary_only - Determines whether to fetch only a summary of running times or detailed data.
     *
     * @returns A promise that resolves to either detailed running times or a summary, depending on the `summary_only` parameter.
     */
    getRunningTimes(home_id, from, to, aggregate, summary_only) {
        return this.apiCall(`https://minder.tado.com/v1/homes/${home_id}/runningTimes?from=${from}&to=${to}&aggregate=${aggregate}&summary_only=${summary_only}`);
    }
    /**
     * Updates the presence status for a specified home.
     *
     * @param home_id - The unique identifier for the home.
     * @param presence - The new presence state which must be "HOME", "AWAY", or "AUTO".
     * @returns Resolves when the presence status has been successfully updated.
     * @throws {@link TadoError} if the supplied presence state is not "HOME", "AWAY", or "AUTO".
     */
    setPresence(home_id, presence) {
        const upperCasePresence = presence.toUpperCase();
        if (!["HOME", "AWAY", "AUTO"].includes(upperCasePresence)) {
            throw new types_1.TadoError(`Invalid presence "${upperCasePresence}" must be "HOME", "AWAY", or "AUTO"`);
        }
        const method = upperCasePresence == "AUTO" ? "delete" : "put";
        const config = {
            homePresence: upperCasePresence,
        };
        return this.apiCall(`/api/v2/homes/${home_id}/presenceLock`, method, config);
    }
    /**
     * Checks if anyone is at home based on the geo-tracking data of mobile devices.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to a boolean indicating if any tracked device is at home.
     */
    async isAnyoneAtHome(home_id) {
        const devices = await this.getMobileDevices(home_id);
        for (const device of devices) {
            if (device.settings.geoTrackingEnabled && device.location && device.location.atHome) {
                return true;
            }
        }
        return false;
    }
    /**
     * Updates the presence state of the specified home.
     *
     * This method checks if anyone is currently at home and compares it
     * with the current presence state. If there is a discrepancy, it updates
     * the presence state accordingly. If the presence state is already accurate,
     * it returns a message indicating no change was needed.
     *
     * @param home_id - The unique identifier of the home whose presence state is to be updated.
     * @returns A promise that resolves when the operation is complete,
     * or returns a message if the presence state was already accurate.
     */
    async updatePresence(home_id) {
        const [isAnyoneAtHome, presenceState] = await Promise.all([
            this.isAnyoneAtHome(home_id),
            this.getState(home_id),
        ]);
        const isPresenceAtHome = presenceState.presence === "HOME";
        if (isAnyoneAtHome !== isPresenceAtHome) {
            return this.setPresence(home_id, isAnyoneAtHome ? "HOME" : "AWAY");
        }
        else {
            return "already up to date";
        }
    }
    /**
     * Fetches detailed air comfort information for a specific home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns  A promise that resolves to detailed air comfort data.
     */
    async getAirComfortDetailed(home_id) {
        const home = await this.getHome(home_id);
        const location = `latitude=${home.geolocation.latitude}&longitude=${home.geolocation.longitude}`;
        return this.apiCall(`https://acme.tado.com/v1/homes/${home_id}/airComfort?${location}`);
    }
    /**
     * Retrieves energy consumption details for a specified home, month, and year.
     *
     * @param home_id - The unique identifier of the home.
     * @param month - The specific month for which the consumption details are requested.
     * @param year - The specific year for which the consumption details are requested.
     * @returns A promise resolving to the energy consumption details for the specified time period.
     */
    async getEnergyIQConsumptionDetails(home_id, month, year) {
        const date = `${year}-${month.toString().padStart(2, "0")}`;
        return this.apiCall(`https://energy-insights.tado.com/api/homes/${home_id}/consumptionDetails?month=${date}`);
    }
    /**
     * Fetches the energy consumption overview for a specified home, month, and year.
     *
     * @param home_id - The unique identifier of the home.
     * @param month - The month for which the energy overview is needed.
     * @param year - The year for which the energy overview is needed.
     * @returns A promise that resolves to an EnergyIQOverview object containing the energy consumption details.
     */
    async getEnergyIQOverview(home_id, month, year) {
        const date = `${year}-${month.toString().padStart(2, "0")}`;
        return this.apiCall(`https://energy-insights.tado.com/api/homes/${home_id}/consumptionOverview?month=${date}`);
    }
    /**
     * Fetches the EnergyIQ tariff for a given home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns  A promise that resolves to the {@link EnergyIQTariffs} object.
     */
    getEnergyIQTariff(home_id) {
        return this.apiCall(`https://energy-insights.tado.com/api/homes/${home_id}/tariffs`);
    }
    /**
     * Adds a new energy IQ tariff for a specified home.
     *
     * @param home_id - The identifier of the home.
     * @param unit - The unit of energy measurement.
     * @param startDate - The start date of the tariff in ISO format.
     * @param endDate - The end date of the tariff in ISO format.
     * @param tariffInCents - The tariff amount in cents.
     * @returns A promise that resolves to the API response.
     * @throws  {@link TadoError} if the unit is not valid.
     */
    addEnergyIQTariff(home_id, unit, startDate, endDate, tariffInCents) {
        if (!["m3", "kWh"].includes(unit)) {
            throw new types_1.TadoError(`Invalid unit "${unit}" must be "m3", or "kWh"`);
        }
        return this.apiCall(`https://energy-insights.tado.com/api/homes/${home_id}/tariffs`, "post", {
            unit: unit,
            startDate: startDate,
            endDate: endDate,
            tariffInCents: tariffInCents,
        });
    }
    /**
     * Updates the Energy IQ tariff for a specified home.
     *
     * @param home_id - The unique identifier for the home.
     * @param tariff_id - The unique identifier for the tariff.
     * @param unit - The unit of the tariff, either "m3" or "kWh."
     * @param startDate - The start date of the tariff in the format 'YYYY-MM-DD.'
     * @param endDate - The end date of the tariff in the format 'YYYY-MM-DD.'
     * @param tariffInCents - The tariff rate in cents.
     * @returns A promise that resolves to the response of the API call.
     * @throws {@link TadoError} if the unit is not "m3" or "kWh."
     */
    updateEnergyIQTariff(home_id, tariff_id, unit, startDate, endDate, tariffInCents) {
        if (!["m3", "kWh"].includes(unit)) {
            throw new types_1.TadoError(`Invalid unit "${unit}" must be "m3", or "kWh"`);
        }
        return this.apiCall(`https://energy-insights.tado.com/api/homes/${home_id}/tariffs/${tariff_id}`, "put", {
            unit: unit,
            startDate: startDate,
            endDate: endDate,
            tariffInCents: tariffInCents,
        });
    }
    /**
     * Fetches the Energy IQ meter readings for a specified home.
     *
     * @param home_id - The unique identifier of the home for which the meter readings are to be retrieved.
     * @returns A promise that resolves to the Energy IQ meter readings for the specified home.
     */
    getEnergyIQMeterReadings(home_id) {
        return this.apiCall(`https://energy-insights.tado.com/api/homes/${home_id}/meterReadings`);
    }
    /**
     * Adds an energy IQ meter reading for a given home.
     *
     * @param home_id - The ID of the home.
     * @param date - The date of the meter reading in ISO format.
     * @param reading - The meter reading value.
     * @returns A promise that resolves to the response of the API call.
     */
    addEnergyIQMeterReading(home_id, date, reading) {
        return this.apiCall(`https://energy-insights.tado.com/api/homes/${home_id}/meterReadings`, "post", { date: date, reading: reading });
    }
    /**
     * Deletes a specific energy meter reading for a given home.
     *
     * @param home_id - The unique identifier of the home.
     * @param reading_id - The unique identifier of the meter reading to be deleted.
     * @returns  A promise that resolves when the meter reading has been successfully deleted.
     */
    deleteEnergyIQMeterReading(home_id, reading_id) {
        return this.apiCall(`https://energy-insights.tado.com/api/homes/${home_id}/meterReadings/${reading_id}`, "delete", {});
    }
    /**
     * Fetches the energy savings report for a specific home and time period.
     *
     * @example Get the energy savings report for the current month
     * ```typescript
     * const today = new Date();
     * const countryCode = await tado.getHome(home_id).address.country;
     * const report = await this tado.getEnergySavingsReport(home_id, today.getFullYear(), today.getMonth() + 1)
     * ```
     *
     * @param home_id - The unique identifier of the home.
     * @param year - The year for the report.
     * @param month - The month for the report.
     * @param countryCode - The country code of the home.
     * @returns A promise that resolves to the energy savings report.
     */
    getEnergySavingsReport(home_id, year, month, countryCode) {
        return this.apiCall(`https://energy-bob.tado.com/${home_id}/${year}-${month}?country=${countryCode}`);
    }
    /**
     * Retrieves the heating system information for a specific home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to the heating system information of the specified home.
     */
    getHomeHeatingSystem(home_id) {
        return this.apiCall(`/api/v2/homes/${home_id}/heatingSystem`);
    }
    /**
     * Retrieves information about the specified boiler system. This includes model name, image
     * used by the app, and manufacturer names.
     *
     * @example
     * ```typescript
     * const heatingSystem = await tado.getHomeHeatingSystem(1907);
     * const boilerInformation = await tado.getBoilerSystemInformation(heatingSystem.boiler.id);
     * console.log(
     *   `Your boiler model is ${boilerInformation.modelName} manufactured by ${boilerInformation.manufacturers[0].name}`,
     * );
     * ```
     *
     * @param system_id - The unique identifier of the boiler system as retrieved in {@link getHomeHeatingSystem}.
     * @returns A promise that resolves to an object containing the boiler system information.
     */
    async getBoilerSystemInformation(system_id) {
        const response = await this.apiCall(`https://ivar.tado.com/graphql`, "POST", {
            query: `{ system(id: ${system_id}) { modelName shortModelName: modelName(type: SHORT) thumbnail { schematic { url } } manufacturers { name } } }`,
        });
        return response.data.system;
    }
}
exports.BaseTado = BaseTado;
_BaseTado_httpsAgent = new WeakMap(), _BaseTado_accessToken = new WeakMap(), _BaseTado_refreshToken = new WeakMap();
//# sourceMappingURL=base.js.map