import { redirect, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Page() {
  const router = useRouter();

  // trpc.authCallback.useQuery(undefined, {
  //   onSuccess: ({ success }) => {
  //     if (success) {
  //       // user is synced to db
  //       router.push(origin ? `/${origin}` : "/search");
  //     }
  //   },
  //   onError: (err) => {
  //     if (err.data?.code === "UNAUTHORIZED") {
  //       router.push("/sign-in");
  //     }
  //   },
  //   retry: true,
  //   retryDelay: 500,
  // });

  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin" />
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
}
