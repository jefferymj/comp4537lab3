/* 
    ChatGPT Acknowledgement:
    This is to acknowledge that I have used the assistance of ChatGPT for various explainations and code generation whenever I found myself stuck and in need of help.
*/

import http from 'http';
import url from 'url';
import { getDate } from './modules/utils.js';  // Import getDate function
import { greeting } from './lang/en/en.js';     // Import greeting message

// Create the server
const server = http.createServer((req, res) => {
    // Parse the request URL to get the query parameters
    const queryObject = url.parse(req.url, true).query;

    // Check if the URL path is "/getDate" and the "name" parameter exists
    if (req.url.startsWith('/getDate') && queryObject.name) {
        const name = queryObject.name;      // Get the name from the query
        const currentDateTime = getDate();  // Get the current server date and time

        // Create the response message with inline CSS to color the text blue
        const responseMessage = `
            <div style="color: blue;">
                ${greeting.replace('%1', name)} ${currentDateTime}
            </div>
        `;

        // Return the response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(responseMessage);
    } else {
        // Handle case where the URL or query parameters are incorrect
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>Don't forget the GET call</h1>");
    }
});

// Start the server
const port = 8080;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
