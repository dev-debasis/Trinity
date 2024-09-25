/**
 * Class representing a standardized API response.
 * This class is used to structure responses consistently across the API.
*/

class ApiResponse {
   
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;  // The response data (could be an object, array, etc.).
        this.message = message;  // A message describing the response outcome.
        this.success = statusCode < 400;  // Boolean indicating success based on the status code (true if < 400).
    }
}

export { ApiResponse };