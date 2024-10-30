"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { QuickForm } from "./Quickform";
export default function Home() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdOanAqAAAAANW1H8to012ctmV80Gi8K7aY2JFW">
      <QuickForm />
    </GoogleReCaptchaProvider>
  );
}
