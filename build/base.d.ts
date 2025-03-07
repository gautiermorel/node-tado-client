import type { AddEnergiIQMeterReadingResponse, AirComfortDetailed, BoilerSystemInformation, Country, EnergyIQConsumptionDetails, EnergyIQMeterReadings, EnergyIQOverview, EnergyIQTariffInfo, EnergyIQTariffs, EnergySavingReport, HeatingCircuit, HeatingSystem, Home, HomeIncidentDetection, Installation, Invitation, IQUnit, Me, MobileDevice, MobileDeviceGeoLocationConfig, MobileDeviceSettings, PushNotificationRegistration, RunningTimeAggregation, RunningTimes, RunningTimesSummaryOnly, State, StatePresence, User, Weather } from "./types";
import { Method } from "axios";
export declare class BaseTado {
    #private;
    constructor();
    initiateDeviceCodeFlow(): Promise<void>;
    pollForToken(device_code: string, interval: number): Promise<void>;
    refreshToken(): Promise<void>;
    apiCall<R>(url: string, method?: Method, data?: any): Promise<R>;
    getMe(): Promise<Me>;
    /**
     * Fetches and returns the home details for the specified home ID.
     *
     * @param home_id - The ID of the home to be retrieved.
     * @returns A promise that resolves to the details of the home.
     */
    getHome(home_id: number): Promise<Home>;
    /**
     * Sets the away radius for a specific home.
     *
     * @param home_id - The ID of the home.
     * @param away_radius_meters - The away radius in meters.
     * @returns A promise that resolves when the away radius is successfully set.
     */
    setAwayRadius(home_id: number, away_radius_meters: number): Promise<void>;
    /**
     * Fetches incident detection details for the specified home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to the incident detection details of the home.
     */
    getIncidentDetection(home_id: number): Promise<HomeIncidentDetection>;
    /**
     * Enables or disables incident detection for a specified home.
     *
     * @param home_id - The unique identifier of the home.
     * @param enabled - Indicates whether incident detection should be enabled (true) or disabled (false).
     * @returns A promise that resolves when the operation is complete.
     */
    setIncidentDetection(home_id: number, enabled: boolean): Promise<void>;
    /**
     * Checks if the early start feature is enabled for a given home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to a boolean indicating whether the early start feature is enabled.
     */
    isEarlyStartEnabled(home_id: number): Promise<boolean>;
    /**
     * Sets the early start feature for a specified home.
     *
     * @param home_id - The unique identifier of the home.
     * @param enabled - A boolean indicating whether the early start feature should be enabled or disabled.
     * @returns A promise that resolves when the early start setting has been successfully updated.
     */
    setEarlyStart(home_id: number, enabled: boolean): Promise<void>;
    /**
     * Fetches the weather information for a specified home.
     *
     * @param home_id - The unique identifier of the home for which to retrieve the weather data.
     * @returns A promise that resolves to a Weather object containing the weather information for the specified home.
     */
    getWeather(home_id: number): Promise<Weather>;
    /**
     * Fetches the list of installations for a given home.
     *
     * @param home_id - The ID of the home for which to fetch installations.
     * @returns A promise that resolves to an array of installations.
     */
    getInstallations(home_id: number): Promise<Installation[]>;
    /**
     * Fetches the list of invitations for a specified home.
     *
     * @param home_id - The ID of the home for which to retrieve invitations.
     * @returns A promise that resolves to an array of Invitation objects.
     */
    getInvitations(home_id: number): Promise<Invitation[]>;
    /**
     * Retrieves an invitation based on the provided home ID and token.
     *
     * @param home_id - The ID of the home for which the invitation is to be retrieved.
     * @param token - The unique token (invitation id) associated with the invitation.
     * @returns A promise that resolves to the invitation details.
     */
    getInvitation(home_id: number, token: string): Promise<Invitation>;
    /**
     * Creates an invitation for a specified home.
     *
     * @param home_id - The unique identifier of the home to which the invitation will be sent.
     * @param email - The email address of the invitee.
     * @returns A promise that resolves to an Invitation object.
     */
    createInvitation(home_id: number, email: string): Promise<Invitation>;
    /**
     * Resends an invitation to a specific home.
     *
     * @param home_id - The ID of the home for which the invitation is to be resent.
     * @param token - The token representing the invitation to be resent.
     * @returns A promise that resolves once the invitation has been resent.
     */
    resendInvitation(home_id: number, token: string): Promise<void>;
    /**
     * Deletes an invitation associated with a home.
     *
     * @param home_id - The unique identifier of the home.
     * @param token - The token associated with the invitation.
     * @returns A promise that resolves when the invitation is successfully deleted.
     */
    deleteInvitation(home_id: number, token: string): Promise<void>;
    /**
     * Fetches the list of users associated with a given home.
     *
     * @param home_id - The ID of the home for which to fetch users.
     * @returns A promise that resolves to an array of User objects.
     */
    getUsers(home_id: number): Promise<User[]>;
    /**
     * Fetches the state of a home based on the provided home ID.
     *
     * @param home_id - The unique identifier of the home for which the state is to be retrieved.
     * @returns A promise that resolves to the state of the specified home.
     */
    getState(home_id: number): Promise<State>;
    /**
     * Retrieves the heating circuits associated with a given home based on the home ID.
     *
     * @param home_id - The ID of the home for which to retrieve heating circuits.
     * @returns A promise that resolves to a HeatingCircuit object.
     */
    getHeatingCircuits(home_id: number): Promise<HeatingCircuit>;
    /**
     * Retrieves a list of mobile devices associated with a given home ID.
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to an array of MobileDevice objects.
     */
    getMobileDevices(home_id: number): Promise<MobileDevice[]>;
    /**
     * Fetches a mobile device associated with the given home ID and mobile device ID.
     *
     * @param home_id - The ID of the home.
     * @param mobile_device_id - The ID of the mobile device.
     * @returns A promise that resolves to the mobile device data.
     */
    getMobileDevice(home_id: number, mobile_device_id: number): Promise<MobileDevice>;
    /**
     * Fetches the settings for a specific mobile device within a given home.
     *
     * @param home_id - The unique identifier of the home.
     * @param mobile_device_id - The unique identifier of the mobile device.
     * @returns  A promise that resolves to the mobile device's settings.
     */
    getMobileDeviceSettings(home_id: number, mobile_device_id: number): Promise<MobileDeviceSettings>;
    /**
     * Sets the geo-tracking settings for a specified mobile device in a given home.
     *
     * @param home_id - The ID of the home.
     * @param mobile_device_id - The ID of the mobile device.
     * @param geoTrackingEnabled - A flag indicating whether geo-tracking should be enabled.
     * @returns A promise that resolves to the updated mobile device settings.
     */
    setGeoTracking(home_id: number, mobile_device_id: number, geoTrackingEnabled: boolean): Promise<MobileDeviceSettings>;
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
    createPushNotificationRegistration(home_id: number, mobile_device_id: number, token: string): Promise<PushNotificationRegistration>;
    /**
     * Fetches the geo-location configuration for a specific mobile device in a home.
     *
     * @param home_id - The unique identifier of the home.
     * @param mobile_device_id - The unique identifier of the mobile device.
     * @returns A promise that resolves to the mobile device's geo-location configuration.
     */
    getMobileDeviceGeoLocationConfig(home_id: number, mobile_device_id: number): Promise<MobileDeviceGeoLocationConfig>;
    /**
     * Retrieves the running times for a specific home within a given date range.
     *
     * @param home_id - The unique identifier for the home.
     * @param from - The start date of the range in ISO 8601 format.
     * @param to - The end date of the range in ISO 8601 format.
     * @param aggregate - The method of aggregation for the running times.
     * @param summary_only - Indicates that only a summary of the running times is to be returned.
     *
     * @returns A promise that resolves to a summary of the running times.
     */
    getRunningTimes(home_id: number, from: string, to: string, aggregate: RunningTimeAggregation, summary_only: true): Promise<RunningTimesSummaryOnly>;
    /**
     * Retrieves the running times of a specific home within a specified date range.
     *
     * @param home_id - The unique identifier of the home.
     * @param from - The start date of the range in ISO 8601 format.
     * @param to - The end date of the range in ISO 8601 format.
     * @param aggregate - The type of aggregation to apply to the running times.
     * @param summary_only - If false, detailed running times are included; otherwise, only the summary is provided.
     * @returns A promise that resolves to the running times data for the specified home and date range.
     */
    getRunningTimes(home_id: number, from: string, to: string, aggregate: RunningTimeAggregation, summary_only: false): Promise<RunningTimes>;
    /**
     * Updates the presence status for a specified home.
     *
     * @param home_id - The unique identifier for the home.
     * @param presence - The new presence state which must be "HOME", "AWAY", or "AUTO".
     * @returns Resolves when the presence status has been successfully updated.
     * @throws {@link TadoError} if the supplied presence state is not "HOME", "AWAY", or "AUTO".
     */
    setPresence(home_id: number, presence: StatePresence): Promise<void>;
    /**
     * Checks if anyone is at home based on the geo-tracking data of mobile devices.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to a boolean indicating if any tracked device is at home.
     */
    isAnyoneAtHome(home_id: number): Promise<boolean>;
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
    updatePresence(home_id: number): Promise<void | "already up to date">;
    /**
     * Fetches detailed air comfort information for a specific home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns  A promise that resolves to detailed air comfort data.
     */
    getAirComfortDetailed(home_id: number): Promise<AirComfortDetailed>;
    /**
     * Retrieves energy consumption details for a specified home, month, and year.
     *
     * @param home_id - The unique identifier of the home.
     * @param month - The specific month for which the consumption details are requested.
     * @param year - The specific year for which the consumption details are requested.
     * @returns A promise resolving to the energy consumption details for the specified time period.
     */
    getEnergyIQConsumptionDetails(home_id: number, month: number, year: number): Promise<EnergyIQConsumptionDetails>;
    /**
     * Fetches the energy consumption overview for a specified home, month, and year.
     *
     * @param home_id - The unique identifier of the home.
     * @param month - The month for which the energy overview is needed.
     * @param year - The year for which the energy overview is needed.
     * @returns A promise that resolves to an EnergyIQOverview object containing the energy consumption details.
     */
    getEnergyIQOverview(home_id: number, month: number, year: number): Promise<EnergyIQOverview>;
    /**
     * Fetches the EnergyIQ tariff for a given home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns  A promise that resolves to the {@link EnergyIQTariffs} object.
     */
    getEnergyIQTariff(home_id: number): Promise<EnergyIQTariffs>;
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
    addEnergyIQTariff(home_id: number, unit: IQUnit, startDate: string, endDate: string, tariffInCents: number): Promise<void>;
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
    updateEnergyIQTariff(home_id: number, tariff_id: string, unit: IQUnit, startDate: string, endDate: string, tariffInCents: number): Promise<EnergyIQTariffInfo>;
    /**
     * Fetches the Energy IQ meter readings for a specified home.
     *
     * @param home_id - The unique identifier of the home for which the meter readings are to be retrieved.
     * @returns A promise that resolves to the Energy IQ meter readings for the specified home.
     */
    getEnergyIQMeterReadings(home_id: number): Promise<EnergyIQMeterReadings>;
    /**
     * Adds an energy IQ meter reading for a given home.
     *
     * @param home_id - The ID of the home.
     * @param date - The date of the meter reading in ISO format.
     * @param reading - The meter reading value.
     * @returns A promise that resolves to the response of the API call.
     */
    addEnergyIQMeterReading(home_id: number, date: string, reading: number): Promise<AddEnergiIQMeterReadingResponse>;
    /**
     * Deletes a specific energy meter reading for a given home.
     *
     * @param home_id - The unique identifier of the home.
     * @param reading_id - The unique identifier of the meter reading to be deleted.
     * @returns  A promise that resolves when the meter reading has been successfully deleted.
     */
    deleteEnergyIQMeterReading(home_id: number, reading_id: number): Promise<void>;
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
    getEnergySavingsReport(home_id: number, year: number, month: number, countryCode: Country): Promise<EnergySavingReport>;
    /**
     * Retrieves the heating system information for a specific home.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to the heating system information of the specified home.
     */
    getHomeHeatingSystem(home_id: number): Promise<HeatingSystem>;
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
    getBoilerSystemInformation(system_id: number): Promise<BoilerSystemInformation>;
}
