// This script would set up the necessary directories for PDF storage
// In a real implementation, you would run this on the server

const fs = require("fs")
const path = require("path")

// Create saved-orders directory
const savedOrdersDir = path.join(process.cwd(), "saved-orders")
if (!fs.existsSync(savedOrdersDir)) {
  fs.mkdirSync(savedOrdersDir, { recursive: true })
  console.log("Created saved-orders directory")
}

// Initialize last serial number file
const lastSrFile = path.join(process.cwd(), "last_sr.json")
if (!fs.existsSync(lastSrFile)) {
  fs.writeFileSync(lastSrFile, JSON.stringify({ lastSrNo: 0 }))
  console.log("Initialized last_sr.json file")
}

console.log("Setup complete!")
