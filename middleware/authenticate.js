const jwt = require("jsonwebtoken");
// token-based authentication using JSON Web Tokens (JWT).

module.exports = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("Token:", token); // Log the token for showcasing in interview

  // Check if the token is provided
  if (!token) return res.status(401).json({ error: "No token provided" });

  // Verify the token using the secret key stored in the environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If there's an error during verification, return 401
    if (err)
      return res.status(401).json({ error: "Failed to authenticate token" });

    console.log("Decoded Token:", decoded); // Log the decoded token for debugging

    // Attach the decoded token payload (user information) to the request object
    req.user = decoded;

    // Call next() to pass control to the next middleware or route handler
    next();
  });
};
