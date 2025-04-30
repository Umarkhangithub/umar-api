import rateLimit from 'express-rate-limit';

// Function to calculate time left before the next request is allowed
function getTimeLeft(windowMs, currentTime, resetTime) {
  const timeLeft = resetTime - currentTime;  // Time left in milliseconds
  const minutesLeft = Math.ceil(timeLeft / 60000);  // Convert to minutes

  if (minutesLeft <= 0) {
    return 'You can try again now!';
  } else {
    return `Please try again after ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`;
  }
}

// General Rate Limiter for the whole app
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Allow 100 requests per 15 minutes per IP
  message: (req, res) => {
    // Access rate limit information
    const resetTime = req.rateLimit.resetTime; // Reset time from the limiter
    const currentTime = Date.now();

    // Dynamically adjust the message based on time left
    const timeLeftMessage = getTimeLeft(15 * 60 * 1000, currentTime, resetTime);

    return {
      status: 429,
      error: 'Too many requests',
      message: timeLeftMessage, // Updated message
    };
  },
  headers: true,
});

// Login Rate Limiter (more strict)
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Allow 5 requests from the same IP
  message: (req, res) => {
    const resetTime = req.rateLimit.resetTime; // Reset time from the limiter
    const currentTime = Date.now();
    
    // Dynamically adjust the message based on time left
    const timeLeftMessage = getTimeLeft(10 * 60 * 1000, currentTime, resetTime);

    return {
      status: 429,
      error: 'Too many login attempts',
      message: timeLeftMessage, // Updated message
    };
  },
  headers: true,
});
