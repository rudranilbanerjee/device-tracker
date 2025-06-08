import axios from 'axios';

export async function getLocation() {
  try {
    // Get public IP from ipify API
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ip = ipResponse.data.ip;

    // Get location info using ip-api.com
    const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`);
    return locationResponse.data;
  } catch (error) {
    console.error('Failed to get location:', error);
    return null;
  }
}
