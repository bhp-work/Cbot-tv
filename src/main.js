//Datafeed implementation, will be added later
import Datafeed from "./datafeed.js";
//import Datafeed from "../datafeeds/udf/lib/udf-compatible-datafeed.js"
import { getAllExchangesForDropdown, getAllSymbolPairs } from "./helpers.js";

var widget = null;

//Get exchange list from API
getAllExchangesForDropdown().then(function (result) {
  var markupPair = "";
  for (var i = 0; i < result.length; i++) {
    markupPair += '<option id="' + result[i] + '">' + result[i] + "</option>";
  }
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

window.LoadChart = function () {
  // alert(document.getElementById("drp_lang"));
   let selSymbol = document.getElementById("pairs").value;
   let selTheme = document.getElementById("drp_theme").value;
  // var bl_hide_side_toolbar;
  // const bl_show_side_toolbar = document.getElementById("chk_hide_side_toolbar")
  //   .checked;
  // if (bl_show_side_toolbar) {
  //   bl_hide_side_toolbar = false;
  // } else {
  //   bl_hide_side_toolbar = true;
  // }
  // const bl_enable_publishing = document.getElementById("chk_enable_publishing")
  //   .checked;
  // const bl_details = document.getElementById("chk_details").checked;
  // const bl_hotlist = document.getElementById("chk_hotlist").checked;
  // const bl_calendar = document.getElementById("chk_calendar").checked;
  // const bl_allow_symbol_change = document.getElementById(
  //   "chk_allow_symbol_change"
  // ).checked;
  // const bl_withdateranges = document.getElementById("chk_withdateranges")
  //   .checked;
  // const bl_bolinger = document.getElementById("chk_bolinger").checked;
  // const bl_rsi = document.getElementById("chk_rsi").checked;
  // const bl_vwamp = document.getElementById("chk_vwamp").checked;
  // const bl_MACD = document.getElementById("chk_MACD").checked;

  // var mrkup_studies = "",
  //   mrkup_studies1 = "",
  //   mrkup_studies2 = "",
  //   mrkup_studies3 = "";

  // if (bl_bolinger || bl_rsi || bl_vwamp || bl_MACD) {
  //   if (bl_bolinger) {
  //     mrkup_studies = document.getElementById("chk_bolinger").value;
  //   }
  //   if (bl_rsi) {
  //     mrkup_studies1 = document.getElementById("chk_rsi").value;
  //   }
  //   if (bl_vwamp) {
  //     mrkup_studies2 = document.getElementById("chk_vwamp").value;
  //   }
  //   if (bl_MACD) {
  //     mrkup_studies3 = document.getElementById("chk_MACD").value;
  //   }
  // }

  const exchange = document.getElementById("exchange").value;

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

  
// ----------------------------------------------------------------------------------------------------------------
// widget constructor
  widget = (window.tvWidget = new TradingView.widget({
    // * param ----------
    symbol: exchange + ":" + selSymbol,
    symbol: "Binance:ETH/USDT", // default symbol
    interval: "1s", // default interval
    datafeed: Datafeed,
    container_id: "tv_chart_container", 
    library_path: "charting_library_clonned_data/charting_library/",

    //extra param
    // width: "100%",
    // height: "600px",
     // locale: getParameterByName("lang") || "en",
    locale: document.getElementById("drp_lang").value,
    fullscreen: true,
    autosize: true,
    theme: selTheme,
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "cryptoxbot.com",
    user_id: "public_user_id",
    style: "1",
    overrides: {
      "calendar": "true",
    },
     }));
  document.getElementById("btnShowChart").innerText = "Refresh Chart";

  widget.onChartReady(function () {
    //For header
    widget.headerReady().then(function () {
      var chartContainer = document.getElementById("tv_chart_container");
      var iframe = chartContainer.firstChild;
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      function addFeaturePoint(elemIdOrDataname, tooltip) {
        var elemWhereAdd =
          innerDoc.querySelector("#" + elemIdOrDataname) ||
          innerDoc.querySelector("[data-name=" + elemIdOrDataname + "]");
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

      createHeaderButton("New order", "", function () {
        widget.chart().createOrderLine();
      });

      createHeaderButton("Clear studies", "", function () {
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


  });
};



// ----------------------------------------------------------------------------------------------------------------
// Indicators

window.LoadStudiesBB = function () {
  widget
    .chart()
    .createStudy("Bollinger Bands", false, false, [
      10 + parseInt(Math.random() * 10),
      3 + parseInt(Math.random() * 3),
    ]);

};

window.LoadStudiesMACD = function () {
  widget
    .chart()
    .createStudy("MACD", false, false, [
      10 + parseInt(Math.random() * 10),
      3 + parseInt(Math.random() * 3),
    ]);

};

window.LoadStudiesRSI = function () {
  widget
    .chart()
    .createStudy("Relative Strength Index", false, false, [14])
  { align: "left" }

};


window.LoadStudiesVWAMP = function () {
  widget
    .chart()
    .createStudy("VWAMP", false, false,);

};

window.RemoveAllStudies = function () {
  document.getElementById("chk_vwamp").checked = false;
  document.getElementById("chk_rsi").checked = false;
  document.getElementById("chk_MACD").checked = false;
  document.getElementById("chk_bolinger").checked = false;

  widget.chart().removeAllStudies();
};



// ----------------------------------------------------------------------------------------------------------------
// Shapes

function CustomCreateShape(time, shape, text) {
  widget.activeChart().createMultipointShape([{ time: time }], {
    shape: shape,
    lock: false,
    disableSelection: true,
    disableSave: false,
    disableUndo: false,
    text: text,
    overrides: { showLabel: true, fontsize: 12 },

  });

}
function CustomCreateShapeWithDefault(time, shape, text) {
  widget.activeChart().createMultipointShape([{ time: time }], {
    shape: shape,
    text: text,
  });

}
function CustomCreateLine(timeto, timefrom, shape, text, price1, price2) {
  widget
    .activeChart()
    .createMultipointShape([{ time: timeto, price: price1 }, { time: timefrom, price: price2 }], {
      shape: shape,
      lock: false,
      disableSelection: true,
      disableSave: false,
      disableUndo: false,
      text: text,
      overrides: { showLabel: true, fontsize: 12 },

    });


}
function toTimestamp(strDate) {
  var datum = Date.parse(strDate + ' ' + 'UTC') / 1000;
  return datum;
}
window.LoadChartShapes = function () {

  CustomCreateShape(toTimestamp('10-12-2020 09:00:00'), "arrow_up", "Buy-1");
  CustomCreateShape(toTimestamp('10-12-2020 09:06:00'), "arrow_down", "Sell-1");

  CustomCreateShape(toTimestamp('10-11-2020 14:46:00'), "arrow_up", "Buy-2");
  CustomCreateShape(toTimestamp('10-11-2020 14:50:00'), "arrow_down", "Sell-2");


  CustomCreateShape(toTimestamp('10-11-2020 15:46:00'), "arrow_up", "Buy-3");
  CustomCreateShape(toTimestamp('10-11-2020 15:56:00'), "arrow_down", "Sell-3");


  CustomCreateShape(toTimestamp('10-11-2020 16:05:00'), "arrow_up", "Buy-4");
  CustomCreateShape(toTimestamp('10-11-2020 16:15:00'), "arrow_down", "Sell-4");

  CustomCreateLine(toTimestamp('10-12-2020 09:00:00'), toTimestamp('10-12-2020 09:06:00'), "trend_line", "Line1");
  CustomCreateLine(toTimestamp('10-11-2020 14:46:00'), toTimestamp('10-11-2020 14:50:00'), "trend_line", "Line2");
  CustomCreateLine(toTimestamp('10-11-2020 15:46:00'), toTimestamp('10-11-2020 15:56:00'), "trend_line", "Line3");
  CustomCreateLine(toTimestamp('10-11-2020 16:05:00'), toTimestamp('10-11-2020 16:15:00'), "trend_line", "Line4");


  CustomCreateShapeWithDefault(1602523536, "long_position");
  CustomCreateShapeWithDefault(1602534229, "short_position");
  CustomCreateShapeWithDefault(1602523536, "note", "This is test note");
  CustomCreateShapeWithDefault(1602534229, "balloon", "This is test balloon note");

  CustomCreateShapeWithDefault(1602523536, "text", "Sample text");
  CustomCreateShapeWithDefault(1602534229, "anchored_text", "Sample anchored_text");
  CustomCreateShapeWithDefault(1602523536, "anchored_note", "This is test anchored_note");
  CustomCreateLine(1602580590, 1602580690, "callout", "This is test callout");


  CustomCreateShapeWithDefault(1602536141, "price_label");
  CustomCreateShape(1602535189, "arrow_marker", "test arrow_marker");
  CustomCreateShape(1602535189, "flag");
  // CustomCreateShape(1602535189,"xabcd_pattern",);
  CustomCreateShape(1602580182, "vertical_line"); 
  CustomCreateShape(1602580302, "horizontal_line");
  widget
    .activeChart()
    .createMultipointShape(
      [
        { time: 1602573536, },
        { time: 1602574536, },
        { time: 1602574836, },
        { time: 1602575136, },
        { time: 1602575336, }
      ],
      {
        shape: 'xabcd_pattern'
      }
    );

    widget
    .activeChart()
    .createMultipointShape(
      [
        { time: 1602563536, },
        { time: 1602564536, },
        { time: 1602564836, },
        { time: 1602565136, },
      
      ],
      {
        shape: 'abcd_pattern'
      }
    );

    widget
    .activeChart()
    .createMultipointShape(
      [
        { time: toTimestamp('10-13-2020 02:34:00'), },
        { time: toTimestamp('10-13-2020 02:44:00'), },
        { time: toTimestamp('10-13-2020 02:54:00'), },
        { time: toTimestamp('10-13-2020 02:24:00'), },
      ],
      {
        shape: 'triangle_pattern'
      }
    );
    widget
    .activeChart()
    .createMultipointShape(
      [
        { time: 1602563536, },
        { time: 1602564536, },
        { time: 1602564836, },
        { time: 1602565136, },
        { time: 1602565336, },
        
        { time: 1602565136, },
        { time: 1602565336, }
      ],
      {
        shape: '3divers_pattern'
      }
    );
    
   widget
    .activeChart()
    .createMultipointShape(
      [
        { time: toTimestamp('10-12-2020 21:34:00'), },
        { time:  toTimestamp('10-12-2020 21:41:00'), },
        { time:  toTimestamp('10-12-2020 21:54:00'), },
        { time:  toTimestamp('10-12-2020 22:25:00'), },
        { time:  toTimestamp('10-12-2020 22:50:00'), },
        { time:  toTimestamp('10-12-2020 23:01:00'), },
        { time:  toTimestamp('10-12-2020 23:13:00'), }
      ],
      {
        shape: 'head_and_shoulders'
      }
    );
      
   widget
    .activeChart()
    .createMultipointShape(
      [
        { time: 1602563536, },
        { time: 1602564536, },
        { time: 1602564836, },
        { time: 1602565136, },
        { time: 1602565336, }
      ],
      {
        shape: 'cypher_pattern'
      }
    );


         
   widget.activeChart().createMultipointShape(
     [ {time: 1602580840}],
     {  shape: '0xf118',      
        color:'#3d85c6',     
        scale:1,    
        icon :'f118' ,  
       }   );
}


// ----------------------------------------------------------------------------------------------------------------
// OtherFUnctions
window.ChangeAPIDriver = function () {
  alert(document.getElementById("drp_APIDriver").value);
};

widget.activeChart().getSeries().setVisible(true);