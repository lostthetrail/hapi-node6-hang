# hapi-node6-hang

Issue confirmed on Node 6.3.1.

## Instructions
1. `npm install`
2. `node index.js`
3. Request: `http://localhost:8080/` (note the page loads - status code 200 with full body)
4. Request: `http://localhost:8080/` (note the page hangs & the HPE_CB_headers_complete/clientError event emitted to logs)
