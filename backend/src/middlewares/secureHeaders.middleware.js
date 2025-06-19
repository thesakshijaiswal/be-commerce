const secureHeaders = (req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "img-src 'self' https://res.cloudinary.com data:",
      "script-src 'self' https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "frame-src https://js.stripe.com",
      "object-src 'none'",
      "base-uri 'none'",
    ].join("; ")
  );

  if (isProd) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Referrer-Policy", "no-referrer");

  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  next();
};

export default secureHeaders;
