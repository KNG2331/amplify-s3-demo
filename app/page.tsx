"use client";

import "@aws-amplify/ui-react/styles.css";
import "@aws-amplify/ui-react-storage/storage-browser-styles.css";
import outputs from "@/amplify_outputs.json";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import { StorageBrowser } from "@aws-amplify/ui-react-storage";
import { Amplify } from "aws-amplify";

Amplify.configure({
  outputs,
  storage: {
    aws_region: "ap-northeast-1",
    bucket_name: "kokui-test-sb-s3",
    buckets: [
      {
        name: "kokui-test-sb-s3",
        bucket_name: "kokui-test-sb-s3",
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

export default function App() {
  return (
    <Authenticator hideSignUp={true}>
      {({ signOut }) => (
        <>
          <Button onClick={signOut}>Sign Out</Button>
          <StorageBrowser />
        </>
      )}
    </Authenticator>
  );
}
