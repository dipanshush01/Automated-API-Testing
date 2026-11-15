# Automated API Testing using Postman and Newman

Ready-to-run REST API automation project. It uses an in-memory product list, so no database is required.

## Requirements
- Node.js LTS and npm
- VS Code
- Postman Desktop
- Jenkins is optional for the local demo

## Install
Open this folder in VS Code and run:
```bash
npm install
```

## Start API (Terminal 1)
```bash
npm start
```
Expected: `Product API running at http://localhost:5000`
Keep this terminal open.

## Run automated tests (Terminal 2)
```bash
npm run test:api
```
Generate an HTML report:
```bash
npm run test:api:report
```
Report path: `reports/api-test-report.html`.

## Import into Postman
1. Open Postman and click Import.
2. Select `tests/postman_collection.json`.
3. Ensure the API is running at `http://localhost:5000`.
4. Open the collection and click Run.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/products` | List products |
| GET | `/api/products/1` | Get product by ID |
| POST | `/api/products` | Create product |
| PUT | `/api/products/{{createdProductId}}` | Update product |
| DELETE | `/api/products/{{createdProductId}}` | Delete product |

Example POST body:
```json
{"name":"Mouse","price":799,"category":"Accessories"}
```

## Jenkins (optional)
The included Jenkinsfile targets a Windows Jenkins agent:
1. Install the Jenkins NodeJS plugin.
2. In Manage Jenkins > Tools, configure NodeJS named `NodeJS-20`.
3. Create a Pipeline job connected to your GitHub repository.
4. Choose Pipeline script from SCM, select Git, then run Build Now.
5. Inspect Console Output for Newman results.

If Jenkins runs on Linux, replace `bat` commands with Linux-compatible `sh` commands and use an appropriate process manager to keep the API running.

## Notes
- Data is in memory and resets whenever the server restarts.
- Keep the server terminal open while Newman runs.
- Do not upload `node_modules` to GitHub.
- Take your own screenshots of the server, Postman collection, Newman output and Jenkins build.

## Viva basics
- Postman: tool to create, send and inspect HTTP requests.
- Newman: command-line runner for Postman collections.
- Assertions: checks for status codes, response values and response time.
- CI/CD: automated workflow that runs checks when code changes.
- REST API: interface exposing resources through HTTP methods such as GET, POST, PUT and DELETE.
