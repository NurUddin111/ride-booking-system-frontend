"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulated submission
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="container mx-auto px-4 md:px-6 py-20">
      {/* Header */}
      <section className="max-w-2xl space-y-4 mb-16">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground text-lg">
          Have questions, feedback, or need assistance? Send us a message and
          we’ll get back to you.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-xl">
        {success && (
          <Alert className="mb-6">
            <AlertDescription>
              Your message has been sent successfully. We’ll respond shortly.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Your email address"
            value={form.email}
            onChange={handleChange}
          />

          <Textarea
            name="message"
            placeholder="Your message"
            rows={5}
            value={form.message}
            onChange={handleChange}
          />

          <Button type="submit">Send Message</Button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
