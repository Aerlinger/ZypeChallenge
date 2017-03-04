import axios from 'axios';

const BASE_URL = 'https://api.zype.com';

function getVideos(app_key) {
  const url = `${BASE_URL}/videos?app_key=${app_key}&per_page=100`;

  return axios.get(url).then(response => response.data);
}

function getVideo(app_key, id) {
  const video_url = `${BASE_URL}/videos/${id}?app_key=${app_key}`;

  return axios
      .all([
        axios.get(video_url),
      ])
      .then(([video]) => ({
        video: video.data.response
      }));
}

export {getVideos, getVideo};
