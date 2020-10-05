//Datafeed implementation, will be added later
import Datafeed from "./datafeed.js";
//import Datafeed from "../datafeeds/udf/lib/udf-compatible-datafeed.js"
import { getAllExchangesForDropdown, getAllSymbolPairs } from "./helpers.js";

//Get exchange list from API

getAllExchangesForDropdown().then(function (result) {
  //console.log(result.length);
  var markupPair = "";
  for (var i = 0; i < result.length; i++) {
    markupPair += '<option id="' + result[i] + '">' + result[i] + "</option>";
  }
  //	console.log(markupPair);
  document.getElementById("exchange").innerHTML = markupPair;

  LoadSymbolPairs();
});

window.LoadSymbolPairs = function () {
  getAllSymbolPairs(document.getElementById("exchange").value).then(function (
    result
  ) {
    var markupPair = "";
    for (var i = 0; i < result.length; i++) {
      markupPair +=
        '<option id="' +
        result[i].symbol +
        '">' +
        result[i].symbol +
        "</option>";
    }

    document.getElementById("pairs").innerHTML = markupPair;
  });
};

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//LoadChart();

window.LoadChart = function () {
  let selSymbol = document.getElementById("pairs").value;
  var bl_hide_side_toolbar;
  const bl_show_side_toolbar = document.getElementById(
    "chk_hide_side_toolbar"
  ).checked;
  if (bl_show_side_toolbar) {
    bl_hide_side_toolbar = false;
  } else {
    bl_hide_side_toolbar = true;
  }
  const bl_enable_publishing = document.getElementById(
    "chk_enable_publishing"
  ).checked;
  const bl_details = document.getElementById("chk_details").checked;
  const bl_hotlist = document.getElementById("chk_hotlist").checked;
  const bl_calendar = document.getElementById("chk_calendar").checked;
  const bl_allow_symbol_change = document.getElementById(
    "chk_allow_symbol_change"
  ).checked;
  const bl_withdateranges = document.getElementById("chk_withdateranges")
    .checked;
  const bl_bolinger = document.getElementById("chk_bolinger").checked;
  const bl_rsi = document.getElementById("chk_rsi").checked;
  const bl_vwamp = document.getElementById("chk_vwamp").checked;
  const bl_MACD = document.getElementById("chk_MACD").checked;

  var mrkup_studies = "",
    mrkup_studies1 = "",
    mrkup_studies2 = "",
    mrkup_studies3 = "";

  if (bl_bolinger || bl_rsi || bl_vwamp || bl_MACD) {
    if (bl_bolinger) {
      mrkup_studies = document.getElementById("chk_bolinger").value;
    }
    if (bl_rsi) {
      mrkup_studies1 = document.getElementById("chk_rsi").value;
    }
    if (bl_vwamp) {
      mrkup_studies2 = document.getElementById("chk_vwamp").value;
    }
    if (bl_MACD) {
      mrkup_studies3 = document.getElementById("chk_MACD").value;
    }
  }

  // console.log(mrkup_studies);
  const exchange = document.getElementById("exchange").value;
  //alert("symbol:"+ exchange + ":" + selSymbol);
  
 var wid= window.tvWidget = new TradingView.widget({
    //symbol: 'Bitfinex:BTC/USD', // default symbol
    interval: "1D", // default interval
    fullscreen: true, // displays the chart in the fullscreen mode
    container_id: "tv_chart_container",
    datafeed: Datafeed,
    //	datafeed: new Datafeeds.UDFCompatibleDatafeed = function(datafeed),
    //	datafeed: new Datafeed.UDFCompatibleDatafeed("https://min-api.cryptocompare.com"),

    library_path: "../charting_library_clonned_data/charting_library/",
    locale: getParameterByName("lang") || "en",
    disabled_features: ["use_localstorage_for_settings"],
    enabled_features: ["study_templates"],
    charts_storage_url: "https://saveload.tradingview.com",

    //Extra features added as per widget
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    theme: getParameterByName("theme"),
    theme: "light",
    style: "1",
    locale: "en",
    toolbar_bg: "#f1f3f6",
    range: "3m",
    show_popup_button: true,
    popup_width: "1000",
    popup_height: "650",
    symbol: exchange + ":" + selSymbol,
    //	symbol:selSymbol,
    symbol: "Binance:ETH/USDT", // default symbol
    exchange: exchange,
    enable_publishing: bl_enable_publishing,
    withdateranges: bl_withdateranges,
    range: "3m",
    // hide_side_toolbar: bl_hide_side_toolbar,

    studies: [mrkup_studies, mrkup_studies1, mrkup_studies2, mrkup_studies3],
    name: selSymbol,
    description: selSymbol,
    type: "cypro",
    width: "100%",
    height: "500px",
    has_no_volume: true,
    //supported_resolutions: ["1D", "1W", "1M"],
    volume_precision: 2,
    data_status: "streaming",
    has_intraday: true,
    intraday_multipliers: ["1", "60"],
    has_weekly_and_monthly: true,
    overrides: {
      "hide_side_toolbar": "true",
      "allow_symbol_change": "true",
      "details": "true",
      "hotlist": "true",
      "calendar": "true",
     
    },
  });
// console.log(wid);
//   document.getElementById("btnShowChart").innerText = "Refresh Chart";
//   //Charting drawing trial

//   wid.activeChart().createOrderLine()
//     .setTooltip("Additional order information")
//     .setModifyTooltip("Modify order")
//     .setCancelTooltip("Cancel order")
//     .onMove(function() {
//         this.setText("onMove called");
//     })
//     .onModify("onModify called", function(text) {
//         this.setText(text);
//     })
//     .onCancel("onCancel called", function(text) {
//         this.setText(text);
//     })
//     .setText("STOP: 73.5 (5,64%)")
//     .setQuantity("2");
 };


window.ChangeAPIDriver = function () {
  alert(document.getElementById("drp_APIDriver").value);
};
