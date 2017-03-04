import axios from 'axios';

/**
 * Helper function to authenticate with the Zype OAuth API (/oauth/token/)
 *
 * Sample response:
 * {
    "access_token": "deadbeef",
    "token_type": "bearer",
    "expires_in": 604800,
    "refresh_token": "[refresh_token",
    "scope": "consumer",
    "created_at": 1454440773
    }
 *
 * @param client_id
 * @param client_secret
 * @param username
 * @param password
 */
function authenticate({
    client_id,
    client_secret,
    username,
    password
} = {}) {
  const base_url = 'https://login.zype.com/oauth/token/'
  const query = `?client_id=${client_id}&client_secret=${client_secret}&username=${encodeURIComponent(username)}&password=${password}&grant_type=password`;

  return axios.post(base_url + query).then(response => response.data)
}

export { authenticate };
