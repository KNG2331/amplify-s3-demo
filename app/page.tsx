"use client";

import { Authenticator, Button } from "@aws-amplify/ui-react";
import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from "@aws-amplify/ui-react-storage/browser";
import "@aws-amplify/ui-react-storage/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify/outputs.json";

Amplify.configure({
  ...outputs,
  storage: {
    aws_region: "ap-northeast-1",
    bucket_name: "ali-blog-sb-s3",
    buckets: [
      {
        name: "ali-blog-sb-s3",
        bucket_name: "ali-blog-sb-s3",
        aws_region: "ap-northeast-1",
        paths: {
          "admin/*": {
            groupsadmin: ["read", "write", "delete"],
          },
          "user/*": {
            groupsadmin: ["read", "write", "delete"],
            groupsuser: ["read"],
          },
        },
      },
    ],
  },
});

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

export default function Home() {
  return (
    <Authenticator className="h-screen">
      {({ signOut }) => (
        <>
          <Button onClick={signOut}>Sign Out</Button>
          <StorageBrowser />
        </>
      )}
    </Authenticator>
  );
}
