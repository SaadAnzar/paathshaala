import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export default function Pricing() {
  let plan: "free" | "basic" | "pro" = "free";

  return (
    <Card className="bg-secondary/70 flex flex-col space-y-6 p-4 shadow-md md:p-8">
      <CardTitle className="p-2 text-2xl font-bold sm:text-3xl">
        Manage Subscription
      </CardTitle>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-12 sm:gap-4 md:grid-cols-3 lg:gap-8">
          <div className="bg-secondary flex flex-col justify-between rounded-lg border border-gray-300 p-6 shadow-lg">
            <div>
              <h3 className="text-center text-2xl font-bold">Free</h3>
              <div className="mt-4 text-center text-zinc-600">
                <span className="text-4xl font-bold">$0</span> / month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 rounded-full bg-green-500 p-1 text-xs text-white" />
                  30 credits
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 rounded-full bg-green-500 p-1 text-xs text-white" />
                  High quality responses
                </li>
                {/* <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Basic Video Templates
                </li> */}
              </ul>
            </div>
            <div className="mt-6">
              <Button variant="outline" className="pointer-events-none w-full">
                {plan === "free" ? "Current Plan" : "Let's Explore"}
              </Button>
            </div>
          </div>
          <div className="bg-secondary relative flex flex-col justify-between rounded-lg border border-purple-500 p-6 shadow-lg">
            <div className="absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white">
              Popular
            </div>
            <div>
              <h3 className="text-center text-2xl font-bold">Basic</h3>
              <div className="mt-4 text-center text-zinc-600">
                <span className="text-4xl font-bold">$8</span> / month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="text-2xs mr-2 rounded-full bg-green-500 p-1 text-white" />
                  250 credits
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 rounded-full bg-green-500 p-1 text-xs text-white" />
                  Premium quality responses
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 rounded-full bg-green-500 p-1 text-xs text-white" />
                  Priority support
                </li>
                {/* <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Collaboration Tools
                </li> */}
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
                Upgrade to Basic
              </Button>
            </div>
          </div>
          <div className="bg-secondary flex flex-col justify-between rounded-lg border border-gray-300 p-6 shadow-lg">
            <div>
              <h3 className="text-center text-2xl font-bold">Pro</h3>
              <div className="mt-4 text-center text-zinc-600">
                <span className="text-4xl font-bold">$15</span> / month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 rounded-full bg-green-500 p-1 text-xs text-white" />
                  500 credits
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 rounded-full bg-green-500 p-1 text-xs text-white" />
                  Premium quality responses
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 rounded-full bg-green-500 p-1 text-xs text-white" />
                  Priority support
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button className="w-full">Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
