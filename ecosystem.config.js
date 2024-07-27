module.exports = {
  apps: [
    {
      name: "PayPawa_Callback_Url", // A descriptive name for your app in PM2
      script: "npm",          // We'll use npm to execute the NestJS start script
      args: "run start:prod", // This runs the specific "start:prod" script defined in your package.json
      cwd: "./",              // Set the current working directory to the project root (adjust if needed)
      instances: 1,           // Use a single instance for simplicity
      exec_mode: "fork",      // Use fork mode instead of cluster mode
      watch: true,            // Enable file watching for development
      env: {                  
        NODE_ENV: "development" // Set the NODE_ENV environment variable to "development"
      },                 // Combine error and output logs
    }
  ]
};
