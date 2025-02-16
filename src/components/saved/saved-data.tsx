"use client";

import { useEffect, useState } from "react";
import { Cross, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function SavedData() {
  const [saved, setSaved] = useState<any[]>([]);

  return (
    <div className="mt-5">
      <Card className="bg-secondary/70 relative shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Saved Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          {saved.length <= 0 ? (
            <h1 className="flex h-64 items-center justify-center text-xl font-semibold text-red-500">
              Sorry, there&apos;s no saved data!
            </h1>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {saved.map((tool: any) => (
                <Card
                  key={tool.id}
                  className="bg-secondary relative basis-[49%] pt-2"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-2">
                    <CardTitle className="text-xl font-bold tracking-tight">
                      {tool.type
                        .replace(/_/g, " ")
                        .replace(/(?:^|\s)\S/g, function (match: any) {
                          return match.toUpperCase();
                        })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-1">
                    <pre className="mt-2 rounded-md bg-slate-950 p-3 text-sm opacity-90">
                      <p className="mb-2 font-bold italic tracking-tight text-white">
                        Inputs
                      </p>
                      <p className="text-white">
                        {JSON.stringify(tool.input, null, 2)}
                      </p>
                    </pre>
                    <p className="mt-3 line-clamp-4 text-sm font-medium text-black">
                      <span className="mb-1 flex text-base font-bold tracking-tight">
                        Output
                      </span>
                      {tool.output}
                    </p>
                    <Dialog>
                      <DialogTrigger
                        className={cn(
                          buttonVariants({ variant: "default" }),
                          "mt-3 text-lg font-bold"
                        )}
                      >
                        View Complete
                      </DialogTrigger>
                      <DialogContent>
                        <Card
                          key={tool.id}
                          className="relative rounded-xl bg-zinc-100 pt-2 text-black ring-1 ring-inset ring-zinc-200"
                        >
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-2">
                            <CardTitle className="text-xl font-bold tracking-tight">
                              {tool.type
                                .replace(/_/g, " ")
                                .replace(/(?:^|\s)\S/g, function (match: any) {
                                  return match.toUpperCase();
                                })}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="grid gap-1">
                            <pre className="mt-2 rounded-md bg-slate-950 p-3 text-sm opacity-90">
                              <p className="text-primary mb-2 font-bold tracking-tight">
                                Inputs
                              </p>
                              <p className="text-white">
                                {JSON.stringify(tool.input, null, 2)}
                              </p>
                            </pre>
                            <p className="mt-3 whitespace-pre-line text-sm font-medium text-black">
                              <span className="mb-1 flex text-base font-bold tracking-tight">
                                Output
                              </span>
                              {tool.output}
                            </p>
                          </CardContent>
                        </Card>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
