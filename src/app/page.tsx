"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { QuickForm } from "./Quickform";
export default function Home() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdcQ3AqAAAAAIVv1wj80McZxJJCmOonG9mfmgHg">
      <QuickForm />
    </GoogleReCaptchaProvider>
  );
}
