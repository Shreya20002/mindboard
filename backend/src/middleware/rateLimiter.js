import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
     try {
        // in prod we would use userID inside the limit function
    // to limit requests per user, here we are using a static key for demo purposes
    // you can also use req.ip or req.headers['x-forwarded-for'] to get the user's IP address
    // but this is not recommended for production use as it can be spoofed
    // "my-rate-limit" will block everyone from using the API if they exceed the limit (no matter who drained it)
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
}

export default rateLimiter;