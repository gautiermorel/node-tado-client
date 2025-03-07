import type { ActionableDevice, AirComfort, FlowTemperatureOptimization, Power, XFeatures, XHomeSummary, XQuickAction, XRoom, XRoomAwayConfiguration, XRoomsAndDevices, XTermination } from "./types";
import { Method } from "axios";
import { BaseTado } from "./base";
/**
 * TadoX class provides functions to interact with the TadoX API, including
 * user authentication and various home and device management operations.
 *
 * @example Fetch user information (javascript)
 * ```javascript
 * // Import the TadoX client
 * const { TadoX } = require("node-tado-client");
 *
 * // Create a new TadoX instance
 * var tado = new TadoX();
 *
 * // Login to the Tado Web API
 * tado.login("username", "password").then(() => {
 *     tado.getMe().then((resp) => {
 *         console.log(resp);
 *     });
 * });
 * ```
 */
export declare class TadoX extends BaseTado {
    /**
     * Makes an API call to the provided TadoX URL with the specified method and data.
     *
     * @typeParam R - The type of the response
     * @typeParam T - The type of the request body
     * @param url - The endpoint to which the request is sent. If the URL contains "https", it will be used as is.
     * @param method - The HTTP method to use for the request (e.g., "get", "post").
     * @param data - The payload to send with the request, if applicable.
     * @returns A promise that resolves to the response data.
     */
    apiCallX<R, T = unknown>(url: string, method?: Method, data?: T): Promise<R>;
    /**
     * Fetches a subset of the home info.
     *
     * @param home_id - The ID of the home for which to fetch the zones.
     * @returns A promise that resolves to home summary data.
     */
    getHomeSummary(home_id: number): Promise<XHomeSummary>;
    /**
     * Fetches the features supported by the home.
     *
     * @param home_id - The ID of the home for which to fetch the zones.
     * @returns A promise that resolves to a list of features.
     */
    getFeatures(home_id: number): Promise<XFeatures>;
    /**
     * Retrieve actionable devices.
     *
     * @param home_id - The ID of the home for which to fetch the zones.
     * @returns A promise that resolves to a list of actionable devices.
     */
    getActionableDevices(home_id: number): Promise<ActionableDevice[]>;
    /**
     * Retrieves a list of rooms and devices associated with the given home ID.
     *
     * @param home_id - The unique identifier of the home.
     * @returns A promise that resolves to an object containing rooms and devices.
     */
    getRoomsAndDevices(home_id: number): Promise<XRoomsAndDevices[]>;
    /**
     * Fetches the rooms for a given home.
     *
     * @param home_id - The ID of the home for which to fetch the zones.
     * @returns A promise that resolves to a list of room states.
     */
    getRooms(home_id: number): Promise<XRoom[]>;
    /**
     * Fetches the state of a specified room in a home.
     *
     * @param home_id - The ID of the home.
     * @param room_id - The ID of the room within the home.
     * @returns  A promise that resolves to a room's state.
     */
    getRoomState(home_id: number, room_id: number): Promise<XRoom>;
    /**
     * Perform a predefined quick action on all rooms.
     *
     * @param home_id - The ID of the home.
     * @param action - The action to perform.
     * @returns  A promise that resolves on completion.
     */
    performQuickAction(home_id: number, action: XQuickAction): Promise<string>;
    /**
     * Resumes the schedule for a specific room in a home.
     *
     * @param home_id - The unique identifier of the home.
     * @param room_id - The unique identifier of the room within the home.
     * @returns  A promise that resolves when the operation is complete.
     */
    resumeSchedule(home_id: number, room_id: number): Promise<string>;
    /**
     * Sets manual control for a specific room in a home.
     *
     * @param home_id - The identifier of the home.
     * @param room_id - The identifier of the room within the home.
     * @param power - The power state, either 'ON' or 'OFF'.
     * @param termination - The termination condition for the overlay. Options include 'MANUAL', 'NEXT_TIME_BLOCK', or a number representing duration in seconds.
     * @param temperature - The desired temperature for the overlay, in celsius.
     * @returns  A promise that resolves to the created zone overlay.
     */
    manualControl(home_id: number, room_id: number, power: Power, termination: XTermination | number, temperature?: number): Promise<unknown>;
    /**
     * Set device child lock status.
     *
     * @param home_id - The ID of the home for which to fetch the zones.
     * @param serial_no - The serial number of the device.
     * @param child_lock - Boolean value to enable or disable the child lock.
     * @returns A promise that resolves when the operation is complete.
     */
    setChildlock(home_id: number, serial_no: string, child_lock: boolean): Promise<void>;
    /**
     * Set device child lock status.
     *
     * @param home_id - The ID of the home for which to fetch the zones.
     * @param serial_no - The serial number of the device.
     * @param temperatureOffset - The temperature offset to be set, in degrees Celsius.
     * @returns A promise that resolves when the operation is complete.
     */
    setDeviceTemperatureOffset(home_id: number, serial_no: string, temperatureOffset: number): Promise<void>;
    /**
     * Retrieves the away configuration for a specific home and zone.
     *
     * @param home_id - The unique identifier of the home.
     * @param room_id - The unique identifier of the zone within the home.
     * @returns A promise that resolves to the away configuration object.
     */
    getAwayConfiguration(home_id: number, room_id: number): Promise<XRoomAwayConfiguration>;
    /**
     * Sets the away configuration for a specified zone in the home.
     *
     * @param home_id - The unique identifier of the home.
     * @param room_id - The unique identifier of the zone within the home.
     * @param config - The configuration settings for away mode.
     * @returns A promise that resolves when the configuration has been successfully set.
     */
    setAwayConfiguration(home_id: number, room_id: number, config: Omit<XRoomAwayConfiguration, "roomId">): Promise<XRoomAwayConfiguration>;
    /**
     * Check if home is hot water capable.
     *
     * @param home_id - The unique identifier of the home.
     * @returns True if the home is hot water capable, false otherwise.
     */
    isDomesticHotWaterCapable(home_id: number): Promise<boolean>;
    /**
     * Get the Flow Temperature Optimization settings.
     *
     * @param home_id - The unique identifier of the home.
     * @returns Flow Temperature Optimization settings.
     */
    getFlowTemperatureOptimization(home_id: number): Promise<FlowTemperatureOptimization>;
    /**
     * Enable Flow Temperature Optimization settings.
     *
     * @param home_id - The unique identifier of the home.
     * @returns if changed.
     */
    enableFlowTemperatureOptimization(home_id: number): Promise<string>;
    /**
     * Disable Flow Temperature Optimization settings.
     *
     * @param home_id - The unique identifier of the home.
     * @returns if changed.
     */
    disableFlowTemperatureOptimization(home_id: number): Promise<string>;
    /**
     * Set the Flow Temperature Optimization max temperature.
     *
     * @param home_id - The unique identifier of the home.
     * @param temperature - The max. temperature.
     * @returns if changed.
     */
    setFlowTemperatureOptimization(home_id: number, temperature: number): Promise<string>;
    /**
     * Retrieves the air comfort details for a given home.
     *
     * @param home_id - The ID of the home for which to get the air comfort details.
     * @returns A promise that resolves to an AirComfort object containing the air comfort details.
     */
    getAirComfort(home_id: number): Promise<AirComfort>;
}
