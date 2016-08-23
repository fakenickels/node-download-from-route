import queryString from 'query-string'
import saveAs from 'file-saver'

module.exports = function downloadFromRoute({
  url,
  data,
  filename,
  method = 'POST',
  headers: {
    'Content-Type': 'text/json',
  },
}){
  if(!window.fetch){
    throw new Error('You don\'t have fetch API available, try using a polyfill')
  }

  return fetch(method === 'POST' ? url : `${url}?${queryString.stringify(data)}`, {
    method,
    ...(
      method === 'POST' ? {body: JSON.stringify(data)} : {}
    ),
    headers,
  })
  .then(response => response.blob())
  .then(blob => saveAs(blob, filename))
}
