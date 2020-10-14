//import Datafeed from "./datafeed.js";
// function loadjsfile(filename){
  
//     var fileref=document.createElement('script')
//     fileref.setAttribute("type","text/javascript")
//     fileref.setAttribute("src", filename)

// if (typeof fileref!="undefined")
//     document.getElementsByTagName("head")[0].appendChild(fileref)
// }

// loadjsfile("charting_library_clonned_data/datafeeds/lib/udf-compatible-datafeed.js" ) //dynamically load and add this .js file

//import DatafeedCryptoxBot from './DatafeedCryptoxBot.js'
/* <script type="text/javascript" src="datafeeds/udf/dist/polyfills.js"></script>
<script type="text/javascript" src="datafeeds/udf/dist/bundle.js"></script> */
//  import UDFCompatibleDatafeed from "/charting_library_clonned_data/datafeeds/lib/udf-compatible-datafeed.js";
// console.log(UDFCompatibleDatafeed);
//  var Datafeed = new UDFCompatibleDatafeed.UDFCompatibleDatafeed("https://demo_feed.tradingview.com");

// var api=document.getElementById("drp_APIDriver").value;
// console.log(api);
// //var Datafeed=null;
// const Datafeed = (api=="TradingView") ? udf_datafeed : DatafeedCryptoCompare; 

// window.ChangeAPIDriver = function () {
//       alert(api);
//        Datafeed = (api=="TradingView") ? udf_datafeed : DatafeedCryptoCompare; 
//      // export default Datafeed;
//  };  

import Datafeed from "./charting_library_clonned_data/datafeeds/udf/lib/udf-compatible-datafeed.js"
alert("api");
console.log(Datafeed);
export default Datafeed