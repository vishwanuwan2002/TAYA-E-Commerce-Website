const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ATYfjnfPvEeArHVD7jcOYYLCoeHDhdZQoV8I1SdLpAerB10VnCrUgFCwmDl35XgfIsckZC1XKvhzOsDF",
  client_secret: "EOHwks3Le2rzxtw_nCvp98LxCzXD1lnQnMTVk9VBQk1e3FiZ13Jj1yG7jGp7JIbBVgrmRcQ_jf-_NzB2",
});

module.exports = paypal;