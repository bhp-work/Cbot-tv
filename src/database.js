// // Make requests to Database API
// export async function makeApiRequest(path) {
// 	try {	console.log("inside database.js makeApiRequest"+path);
//          //console.log('https://localhost:4000/'+path);
// 		// const response = await fetch(`https://localhost:4000/${path}`);
// 		const fetch = require("node-fetch");
// 		const response = await fetch(`http://localhost:4000/${path}`);
// 		console.log(response);
//          return response.json();
//        // return 1;
// 	} catch (error) {
//         console.log(error);
// 		throw new Error(`Database connection request error: ${error.status}`);
// 	}
// }

// export async function getAllOrders() {
// 	console.log("inside database.js getAllOrders");
// 	const data = await makeApiRequest("orders");
// 	let orders = Object.values(data);
//    //console.log(orders[0]);

// 	return orders;
//   }
 // getAllOrders();



 export async function getAllOrders() {
  console.log("getAllOrders");
  try {
    const axios = require("axios");

  //   const config = {
  //     method: "get",
  //     url: "http://localhost:4000/orders",
  //   };

  //   let res = await axios(config);

	// //console.log(res.status);
	// console.log(res.data);
	// return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Database connection request error: ${error.status}`);
  }
}
getAllOrders();
//makeRequest();
