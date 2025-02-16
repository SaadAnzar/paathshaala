import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/tools",
  "/saved",
  "/billing",
  "/lesson-plan-generator",
  "/activity-generator",
  "/worksheet-generator",
  "/concept-simplifier",
  "/feedback-generator",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req))
    auth().protect({
      unauthenticatedUrl: `${process.env.WEBSITE_URL}/sign-in`,
    });
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
