//Datafeed implementation, will be added later
import Datafeed from "./datafeed.js";
//import Datafeed from "../datafeeds/udf/lib/udf-compatible-datafeed.js"
import { getAllExchangesForDropdown, getAllSymbolPairs } from "./helpers.js";

var widget = null;

//Get exchange list from API
getAllExchangesForDropdown().then(function (result) {
  //console.log(result.length);
  var markupPair = "";
  for (var i = 0; i < result.length; i++) {
    markupPair += '<option id="' + result[i] + '">' + result[i] + "</option>";
  }
  //	console.log(markupPair);
  document.getElementById("exchange").innerHTML = markupPair;

 // LoadSymbolPairs();
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
  let selTheme = document.getElementById("drp_theme").value;
  //alert(selTheme);
  var bl_hide_side_toolbar;
  const bl_show_side_toolbar = document.getElementById("chk_hide_side_toolbar")
    .checked;
  if (bl_show_side_toolbar) {
    bl_hide_side_toolbar = false;
  } else {
    bl_hide_side_toolbar = true;
  }
  const bl_enable_publishing = document.getElementById("chk_enable_publishing")
    .checked;
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
  var featuresets = [
    {
      title: "header_symbol_search[on]",
      nodeIdOrDataname: "header-toolbar-symbol-search",
    },
    {
      title: "header_chart_type[on]",
      nodeIdOrDataname: "header-toolbar-chart-styles",
    },
    {
      title: "header_compare[on]",
      nodeIdOrDataname: "header-toolbar-compare",
    },
    {
      title: "header_undo_redo[on]",
      nodeIdOrDataname: "header-toolbar-undo-redo",
    },
    {
      title: "header_saveload[on]",
      nodeIdOrDataname: "header-toolbar-save-load",
    },
    {
      title: "header_settings[on]",
      nodeIdOrDataname: "header-toolbar-properties",
    },
    {
      title: "header_fullscreen_button[on]",
      nodeIdOrDataname: "header-toolbar-fullscreen",
    },
    {
      title: "header_screenshot[on]",
      nodeIdOrDataname: "header-toolbar-screenshot",
    },
    {
      title: "header_resolutions[on]",
      nodeIdOrDataname: "header-toolbar-intervals",
    },
    {
      title: "header_indicators[on]",
      nodeIdOrDataname: "header-toolbar-indicators",
    },
    // {
    //   title: "left_toolbar[on]",
    //   nodeIdOrDataname: "drawing-toolbar",
    // },
    // {
    //   title: "timezone_menu[on]",
    //   nodeIdOrDataname: "time-zone-menu",
    // },
    // {
    //   title: "go_to_date[on]",
    //   nodeIdOrDataname: "go-to-date",
    // },
    // {
    //   title: "timeframes_toolbar[on]",
    //   nodeIdOrDataname: "date-ranges-tabs",
    // },
    // {
    //   title: "display_market_status[on]",
    //   nodeIdOrDataname: "market-status",
    // },
  ];

   widget = (window.tvWidget = new TradingView.widget({
    //symbol: 'Bitfinex:BTC/USD', // default symbol
    interval: "1", // default interval
    fullscreen: true, // displays the chart in the fullscreen mode
    container_id: "tv_chart_container",
    datafeed: Datafeed,
    //	datafeed: new Datafeeds.UDFCompatibleDatafeed = function(datafeed),
    //	datafeed: new Datafeed.UDFCompatibleDatafeed("https://min-api.cryptocompare.com"),

    library_path: "charting_library_clonned_data/charting_library/",
    locale: getParameterByName("lang") || "en",
    disabled_features: ["use_localstorage_for_settings"],
    enabled_features: ["study_templates"],
    charts_storage_url: "https://saveload.tradingview.com",

    //Extra features added as per widget
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    // theme: getParameterByName("theme"),
    theme: selTheme,
    style: "1",
    locale: "en",
    toolbar_bg: "#f1f3f6",
    range: "3m",
    show_popup_button: true,
    popup_width: "1000",
    popup_height: "650",
    // symbol: exchange + ":" + selSymbol,
    symbol: "Binance:ETH/USDT", // default symbol
    exchange: exchange,
    enable_publishing: bl_enable_publishing,
    withdateranges: bl_withdateranges,
    //range: "3m",
    // hide_side_toolbar: bl_hide_side_toolbar,

   // studies: [mrkup_studies, mrkup_studies1, mrkup_studies2, mrkup_studies3],
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
    hide_side_toolbar: true,
    allow_symbol_change: true,
    details: true,
    hotlist: true,
    calendar: true,

    // custom_css_url should be related to library_path
    custom_css_url: "../themed.css",
    // overrides: {
    //   "custom_css_url": "charting_library_clonned_data/themed.css",
    //   "hide_side_toolbar": "true",
    //   "allow_symbol_change": "true",
    //   "details": "true",
    //   "hotlist": "true",
    //   "calendar": "true",

    // },
    overrides: {
      "paneProperties.background":
        selTheme == "Dark"
          ? "#000000"
          : selTheme == "White"
            ? "#FFFFFF"
            : "#c0c0c0",
      // "paneProperties.vertGridProperties.color": "#454545",
      // "paneProperties.horzGridProperties.color": "#454545",
      "scalesProperties.textColor": "#AAA",
    },
  }));
  // console.log(widget);
  //   document.getElementById("btnShowChart").innerText = "Refresh Chart";
  //   //Charting drawing trial

  widget.onChartReady(function () {
    //For header
    widget.headerReady().then(function () {
      var chartContainer = document.getElementById("tv_chart_container");

      var iframe = chartContainer.firstChild;
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      //console.log("innerDoc");
      //sconsole.log(innerDoc);
      function addFeaturePoint(elemIdOrDataname, tooltip) {
        var elemWhereAdd =
          innerDoc.querySelector("#" + elemIdOrDataname) ||
          innerDoc.querySelector("[data-name=" + elemIdOrDataname + "]");
        //console.log(elemWhereAdd);
        //  alert(tooltip);
        if (!elemWhereAdd) {
          console.error(
            "Element with id or data-name" +
            elemIdOrDataname +
            " for featureset " +
            tooltip +
            " is not found"
          );
          return;
        }

        elemWhereAdd.style.position = "relative";

        var pointTemplate = document.getElementById("feature-point");
        var featurePoint = pointTemplate.cloneNode(true);
        featurePoint.removeAttribute("id");
        featurePoint.classList.remove("hidden");
        featurePoint.setAttribute("title", tooltip);

        elemWhereAdd.appendChild(featurePoint);
      }

      function removeFeaturePoint(elemIdOrDataname) { }

      function addAllPoints() {
        for (var i = 0; i < featuresets.length; i++) {
          addFeaturePoint(
            featuresets[i].nodeIdOrDataname,
            featuresets[i].title
          );
        }
      }

      function removeAllPonts() {
        var points = innerDoc.getElementsByClassName("feature-point");
        while (points[0]) {
          points[0].parentNode.removeChild(points[0]);
        }
      }

      addAllPoints();

      var symbolSearchField = innerDoc.getElementById(
        "header-toolbar-symbol-search"
      );

      symbolSearchField.addEventListener(
        "blur",
        function () {
          removeAllPonts();
          addAllPoints();
        },
        true
      );
    });

    var savedWidgetContent = null;
    var savedTemplate = null;
    widget.headerReady().then(function () {
      function createHeaderButton(text, title, clickHandler, options) {
        var button = widget.createButton(options);
        button.setAttribute("title", title);
        button.textContent = text;
        button.addEventListener("click", clickHandler);
      }

      // createHeaderButton('save', 'Save chart', function() {
      //   widget.save(function(data) {
      //     savedWidgetContent = data;
      //     console.log("Save chart Data:");
      //     console.log(data);
      //     alert('Saved');
      //   });
      // });

      // createHeaderButton('load', 'Load chart', function() {
      //   if (savedWidgetContent) {
      //     widget.load(savedWidgetContent);
      //   }
      // });

      // createHeaderButton('load reference', 'Load reference', function() {
      //   widget.load(referenceChart);
      // });

      // createHeaderButton('load reference 2', 'Load reference 2', function() {
      //   widget.load(referenceChart2);
      // });

      // createHeaderButton('save template (-i)', '', function() {
      //   savedTemplate = widget.activeChart().createStudyTemplate({ saveInterval: false });
      // });

      // createHeaderButton('save template (+i)', '', function() {
      //   savedTemplate = widget.activeChart().createStudyTemplate({ saveInterval: true });
      // });

      // createHeaderButton('apply template', '', function() {
      //   if (savedTemplate) {
      //     widget.chart().applyStudyTemplate(savedTemplate);
      //   }
      // });

      // createHeaderButton('F, 2D', '', function() {
      //   widget.setSymbol('F', '2D');
      // });

      // createHeaderButton('Clear marks', '', function() {
      //   widget.chart().clearMarks();
      // });

      createHeaderButton("+BB", "Insert Bollinger Bands", function () {
        console.log(
          widget
            .chart()
            .createStudy("Bollinger Bands", false, false, [
              10 + parseInt(Math.random() * 10),
              3 + parseInt(Math.random() * 3),
            ])
        );
      });

      createHeaderButton(
        "+MA",
        "Insert Moving Average",
        function () {
          console.log(
            widget
              .chart()
              .createStudy("Moving Average", false, false, [
                10 + parseInt(Math.random() * 10),
              ])
          );
        },
        { align: "left" }
      );

      createHeaderButton(
        "RSI",
        "Insert RSI",
        function () {
          console.log(
            widget
              .chart()
              .createStudy("Relative Strength Index", false, false, [14])
          );
        },
        { align: "left" }
      );
      createHeaderButton(
        "MACD",
        "Insert MACD",
        function () {
          console.log(widget.chart().createStudy("MACD", false, false, [14]));
        },
        { align: "left" }
      );

      // createHeaderButton('+MA++', 'Insert Moving Average', function() {
      //   console.log(widget.chart().createStudy(
      //       'Moving Average',
      //       false,
      //       false,
      //       [10 + parseInt(Math.random() * 10)],
      //       undefined,
      //       { 'plot.color.0': '#FF0000' }
      //   ));
      // }, { align: 'left' });

      createHeaderButton(
        "+Stoch",
        "Insert Stochastic",
        function () {
          console.log(
            widget
              .chart()
              .createStudy("Stochastic", false, false, [12, 3, 3], undefined, {
                "%d.color": "#000000",
                "%k.color": "#00FF00",
              })
          );
        },
        { align: "left" }
      );

      createHeaderButton("new order", "", function () {
        widget.chart().createOrderLine();
      });

      createHeaderButton("Clear Studies", "", function () {
        widget.chart().removeAllStudies();
      });

      createHeaderButton("Clear shapes", "", function () {
        widget.chart().removeAllShapes();
      });

      //   createHeaderButton('set view', '', function() {
      //     widget.chart().setVisibleRange({
      //       from: Date.UTC(2012, 2, 3) / 1000,
      //       to: Date.UTC(2013, 3, 3) / 1000
      //     });
      //   });

      //   createHeaderButton('get range', '', function() {
      //     console.log(widget.activeChart().getVisibleRange());
      //   });
    });

    //for chart actions
    widget
      .activeChart()
      .createOrderLine()
      .setTooltip("Additional order information")
      .setModifyTooltip("Modify order")
      .setCancelTooltip("Cancel order")
      .onMove(function () {
        this.setText("onMove called");
        alert("Moved");
      })
      .onModify("onModify called", function (text) {
        this.setText(text);
        alert("Modified");
      })
      .onCancel("onCancel called", function (text) {
        this.setText(text);
        alert("Cancelled");
      })
      .setText("STOP: 73.5 (5,64%)")
      .setQuantity("2");

    var order = widget
      .chart()
      .createOrderLine()
      .setText("Buy Line")
      .setLineLength(3)
      .setLineStyle(0)
      .setQuantity("5 Qnty");
    order.setPrice("380");

    // widget.chart().createMultipointShape(
    //   [
    //     {
    //       time: toTimestamp(new Date("10/09/2020 12:00:00")),
    //       price: 348.5,
    //     },
    //     {
    //       time: toTimestamp(new Date("10/09/2020 12:30:00")),
    //       price: 350.2,
    //     },
    //   ],
    //   {
    //     shape: "trend_line",
    //   }
    // );

    //     const from = Date.now() / 1000 - 60*30;
    // const to = Date.now() / 1000;
    // widget.activeChart().createMultipointShape(
    //     [{ time: from, price: 351 }, { time: to, price: 353 }],
    //     {
    //         shape: "trend_line",
    //         lock: true,
    //         disableSelection: true,
    //         disableSave: true,
    //         disableUndo: true,
    //         text: "Line2",
    //     }

    // );
    // widget.activeChart().createMultipointShape([{ time: 1602233963 }], {
    //   shape: "arrow_down",
    //   lock: true,
    //   disableSelection: true,
    //   disableSave: true,
    //   disableUndo: true,
    //   text: "Sell",
    // });
    // widget.activeChart().createMultipointShape([{ time: 1602235711 }], {
    //   shape: "arrow_up",
    //   lock: true,
    //   disableSelection: true,
    //   disableSave: true,
    //   disableUndo: true,
    //   text: "Buy",
    // });
    // widget
    //   .activeChart()
    //   .createMultipointShape([{ time: 1602233963 }, { time: 1602235711 }], {
    //     shape: "trend_line",
    //     lock: true,
    //     disableSelection: true,
    //     disableSave: true,
    //     disableUndo: true,
    //     text: "Line2",
    //   });
    // widget
    //   .activeChart()
    //   .createMultipointShape([{ time: 1602236110 }, { time: 1602237610 }], {
    //     shape: "trend_line",
    //     lock: true,
    //     disableSelection: true,
    //     disableSave: true,
    //     disableUndo: true,
    //     text: "Line2",
    //   });
    widget.activeChart().createMultipointShape([{ time: 1602501459 }], {
      shape: "263B",
      // lock: true,
      // disableSelection: true,
      // disableSave: true,
      // disableUndo: true,
      // text: "Buy",
      //  icon:"Oxf17b",//
       overrides:{icon:"263B"},
    });
    widget.activeChart().createMultipointShape([{ time: 1602501459 }], {
      shape: "long_position",
      // lock: true,
      // disableSelection: true,
      // disableSave: true,
      // disableUndo: true,
      // overrides:{icon:"0xf17b"},
      //text: "try",
     // icon:"Oxf17b",
    });
   widget.activeChart().createMultipointShape([{ time: 1602501459 }], {
      shape: "balloon",
      // lock: true,
      // disableSelection: true,
      // disableSave: true,
      // disableUndo: true,
      // overrides:{icon:"0xf17b"},
      text: "Hi Paul",
     // icon:"Oxf17b",
    });
       widget.activeChart().createMultipointShape([{ time: 1602501459 }], {
      shape: "note",
      // lock: true,
      // disableSelection: true,
      // disableSave: true,
      // disableUndo: true,
      // overrides:{icon:"0xf17b"},
      text: "Hi Paul",
     // icon:"Oxf17b",
    });
    widget.activeChart().createMultipointShape([{ time: 1602513338 }], {
      shape: "short_position",
      // lock: true,
      // disableSelection: true,
      // disableSave: true,
      // disableUndo: true,
      // overrides:{icon:"0xf17b"},
      //text: "try",
     // icon:"Oxf17b",
    });
  });
};


window.ChangeAPIDriver = function () {
  alert(document.getElementById("drp_APIDriver").value);
};

// function toTimestamp(strDate) {
//    //alert(strDate.getTimezoneOffset());
//   var datum = Date.parse(strDate) + strDate.getTimezoneOffset() * 1000;
//   return datum / 1000;
// }

function CustomCreateShape(time,shape,text){
  widget.activeChart().createMultipointShape([{ time: time }], {
  shape: shape,
  lock: false,
  disableSelection: true,
  disableSave: false,
  disableUndo: false,
  text: text,
  overrides:{showLabel:true,fontsize:12},
     
});
 
}
function CustomCreateLine(timeto,timefrom,shape,text,price1, price2){
  widget
      .activeChart()
      .createMultipointShape([{ time: timeto,price:price1 }, { time: timefrom ,price:price2}], {
        shape:shape,
        lock: false,
        disableSelection: true,
        disableSave: false,
        disableUndo: false,
        text: text,
        overrides:{showLabel:true,fontsize:12},
        
      });

 
}
function toTimestamp(strDate) {
  var datum =Date.parse(strDate+' '+'UTC')/1000;
 // alert(Date.parse('11-10-2020 14:30:00 UTC')+"dfsdf"+datum);
 //   alert(datum);
   return datum;                                                                                                                                                                             
  }
window.LoadChartShapes = function () {
//   alert(Date.parse('10-10-2020 14:30:00 UTC'));
  
// toTimestamp("10-10-2020 14:30:00");
//alert("in LoadChartShapes");
  CustomCreateShape(toTimestamp('10-12-2020 09:00:00'),"arrow_up","Buy-1");
  CustomCreateShape(toTimestamp('10-12-2020 09:06:00'),"arrow_down","Sell-1");
  
  CustomCreateShape(toTimestamp('10-11-2020 14:46:00'),"arrow_up","Buy-2");
  CustomCreateShape(toTimestamp('10-11-2020 14:50:00'),"arrow_down","Sell-2");
  
  
  CustomCreateShape(toTimestamp('10-11-2020 15:46:00'),"arrow_up","Buy-3");
  CustomCreateShape(toTimestamp('10-11-2020 15:56:00'),"arrow_down","Sell-3");
  

  CustomCreateShape(toTimestamp('10-11-2020 16:05:00'),"arrow_up","Buy-4");
  CustomCreateShape(toTimestamp('10-11-2020 16:15:00'),"arrow_down","Sell-4");

  CustomCreateLine(toTimestamp('10-12-2020 09:00:00'),toTimestamp('10-12-2020 09:06:00'),"trend_line","Line1");
  CustomCreateLine(toTimestamp('10-11-2020 14:46:00'),toTimestamp('10-11-2020 14:50:00'),"trend_line","Line2");
  CustomCreateLine(toTimestamp('10-11-2020 15:46:00'),toTimestamp('10-11-2020 15:56:00'),"trend_line","Line3");
  CustomCreateLine(toTimestamp('10-11-2020 16:05:00'),toTimestamp('10-11-2020 16:15:00'),"trend_line","Line4");

  
 // CustomCreateLine(1602238610,1602242561,"trend_line","Line3");

     
}
window.LoadStudiesBB = function () {

  const bl_bolinger = document.getElementById("chk_bolinger").checked;
  // const bl_rsi = document.getElementById("chk_rsi").checked;
  // const bl_vwamp = document.getElementById("chk_vwamp").checked;
  // const bl_MACD = document.getElementById("chk_MACD").checked;
  if(bl_bolinger)
  {
    
   var v1= widget
    .chart()
    .createStudy("Bollinger Bands", false, false, [
      10 + parseInt(Math.random() * 10),
      3 + parseInt(Math.random() * 3),
    ])
    console.log("BB");
    console.log(v1);
  }
  else{


  }

  
       
  }