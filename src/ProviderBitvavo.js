const Lang = imports.lang;

const Local = imports.misc.extensionUtils.getCurrentExtension();
const BaseProvider = Local.imports.BaseProvider;

const Api = new Lang.Class({
  Name: "Bitvavo.Api",
  Extends: BaseProvider.Api,

  apiName: "Bitvavo",

  apiDocs: [
    ["API Docs", "https://docs.bitvavo.com/"],
    ["Books (JSON)", "https://api.bitvavo.com/v2/markets"]
  ],

  /* quote https://bitso.com/api_info#rate-limits
   *
   * > Rate limits are are based on one minute windows. If you do more than 30
   * > requests in a minute, you get locked out for one minute.
   */
  interval: 10,

  getUrl({ base, quote }) {
    return `https://api.bitvavo.com/v2/ticker/price?market=${base}-${quote}`;
  },

  getLast({ market, price }) {
	if (market.includes("ZIL")) {
	  price = price * 109028.34320898 * (1 - 0.0025) - 2002.23;
	} else if (market.includes("NANO")) {
	  price = price * 495.674595 * (1 - 0.0025) - 500;
	} else {
	  price = price * 1;
	}
    return price;
  }
});
