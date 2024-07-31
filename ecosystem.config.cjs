module.exports = {
  apps: [
    {
      name: "racing-wss-sevice",
      script: `SECRET_ENC=${process.env.SECRET_ENC} node dist/bin/wss.js`
    },
    {
      name: "racing-http-service",
      script: `SECRET_ENC=${process.env.SECRET_ENC} node dist/bin/http.js`
    }
  ]
}
