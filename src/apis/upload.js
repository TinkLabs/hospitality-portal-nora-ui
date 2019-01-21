import express from './client';

const upload = (file) => {
  let data = new FormData();
  data.append("image", file);
  return express.post('/upload', data, {
    timeout: 60000
  });
}

export default upload;