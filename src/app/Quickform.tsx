"use client";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function QuickForm() {
  const [googleRes, setGoogleRes] = useState<unknown | null>("");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    company: "",
    jobTitle: "",
    website: "",
    age: "",
    gender: "",
    interests: "",
    favoriteColor: "",
    feedback: "",
    additionalNotes: "",
    referral: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("form clicked?");
    if (!executeRecaptcha) {
      // It takes a small amount of time for the script to be available and connect etc so it could in theory be undefined
      console.error("no recaptcha yet");
      return null;
    }

    // e.preventDefault();
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

      setGoogleRes(data);

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
    <>
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

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="zip">Zip Code:</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="website">Website:</label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="interests">Interests:</label>
        <input
          type="text"
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="favoriteColor">Favorite Color:</label>
        <input
          type="text"
          id="favoriteColor"
          name="favoriteColor"
          value={formData.favoriteColor}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="additionalNotes">Additional Notes:</label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="referral">How did you hear about us?</label>
        <input
          type="text"
          id="referral"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
        />
        <br />
      </form>

      <button id="submit" onClick={handleSubmit}>
        Submit
      </button>
      <code>{JSON.stringify(googleRes)}</code>
    </>
  );
}
