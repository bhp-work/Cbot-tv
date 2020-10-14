
// Make requests to Database API
export async function makeApiRequest(path) {
	try {
         //console.log('https://localhost:4000/'+path);
        // const response = await fetch(`https://localhost:4000/${path}`);
        const response = await fetch('/orders');
         return response.json();
       // return 1;
	} catch (error) {
        console.log(error);
		throw new Error(`Database connection request error: ${error.status}`);
	}
}


export async function getAllOrders() {
	const data = await makeApiRequest("orders");
	let orders = Object.values(data);
	
	console.log("inside database.js getAllOrders"+orders);
	return orders;	
  }
