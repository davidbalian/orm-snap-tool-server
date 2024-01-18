const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Handle POST requests to /serpapi-proxy
app.post("/serpapi-proxy", async (req, res) => {
  try {
    const { serpapiUrl } = req.body;

    // Make a request to the Serpapi URL using Axios
    const response = await axios.get(serpapiUrl);

    // Forward the Serpapi response to the client
    res.json(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({ error: "Proxy error occurred" });
  }
});

// Handle POST requests to /zapier-proxy
app.post("/zapier-proxy", async (req, res) => {
  try {
    const { zapierUrl, data } = req.body;

    // Make a request to the Zapier URL using Axios
    const response = await axios.post(zapierUrl, data["form-contents"]);
    console.log(data["form-contents"]);

    // Forward the Zapier response to the client
    res.json(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({ error: "Proxy error occurred" });
  }
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Node.js server listening on port ${PORT}`);
});
