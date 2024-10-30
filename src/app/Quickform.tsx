"use client";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function QuickForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: { target: { name: unknown; value: unknown } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: unknown) => {
    if (!executeRecaptcha) {
      // It takes a small amount of time for the script to be available and connect etc so it could in theory be undefined
      console.error("no recaptcha yet");
      return null;
    }

    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const recaptchaToken = await executeRecaptcha();

    console.log(recaptchaToken); // don't need this, just left in to show something in console for demo purposes
    const response = await createItem(recaptchaToken);
    console.log(response);
  };

  // createItem.ts
  async function createItem(token: string): Promise<unknown> {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create item");
      }

      return data;
    } catch (error) {
      console.error("Error creating item:", error);
      return {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <br />
      <br />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <br />
      <br />

      <label htmlFor="message">Message:</label>
      <br />
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
      <br />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}
