import "dotenv/config";
import axios from "axios";

// Cloudflare API credentials
const CLOUDFLARE_API_TOKEN = process.env.KEY;
const ZONE_ID = process.env.ZONE_ID;
const DOMAIN_NAME = process.env.DOMAIN_NAME;
const SUBDOMAIN_NAME = "test2"; // Replace with your desired subdomain
const IP_ADDRESS = process.env.DOMAIN_IP; // Replace with the IP address for the subdomain
async function addSubdomain() {
  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`,
      {
        type: "A", // Type of DNS record (A record in this case)
        name: `${SUBDOMAIN_NAME}.${DOMAIN_NAME}`, // Full subdomain name
        content: IP_ADDRESS, // IP address for the subdomain
        ttl: 1, // TTL (1 means automatic)
        proxied: true, // Set to true if you want Cloudflare proxying enabled
      },
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      console.log("Subdomain added successfully:", response.data.result);
    } else {
      console.error("Failed to add subdomain:", response.data.errors);
    }
  } catch (error) {
    console.error(
      "Error adding subdomain:",
      error.response ? error.response.data : error.message
    );
  }
}

addSubdomain();
