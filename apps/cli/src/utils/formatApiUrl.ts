/**
 * Remove slash at end of the url if it is present
 *
 * @param {string} apiUrl The api url
 * @return {string} The api url without the ending slash
 */
const formatApiUrl = (apiUrl: string): string => (!apiUrl.endsWith("/") ? apiUrl : apiUrl.slice(0, -1));

export default formatApiUrl;
