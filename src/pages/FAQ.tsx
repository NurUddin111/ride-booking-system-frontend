"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const faqData = [
  {
    question: "How do I request a ride?",
    answer:
      "You can request a ride by selecting your pickup location and destination. The system will automatically match you with an available driver.",
  },
  {
    question: "How are drivers matched to riders?",
    answer:
      "Drivers are matched based on availability and proximity to the pickup location to ensure faster and more efficient rides.",
  },
  {
    question: "Can I track my ride in real time?",
    answer:
      "Yes, once a driver accepts your request, you can track the ride and driver status in real time through the system.",
  },
  {
    question: "How do drivers earn through the platform?",
    answer:
      "Drivers earn by accepting and completing ride requests. Earnings and ride history are available in the driver dashboard.",
  },
  {
    question: "What can administrators do in the system?",
    answer:
      "Administrators can monitor rides, manage users and drivers, and oversee overall system operations from a centralized dashboard.",
  },
  {
    question: "Is my data secure?",
    answer:
      "The system follows standard security practices to ensure user data, ride details, and transactions are handled securely.",
  },
];

const FAQ = () => {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 md:px-6 py-20 space-y-16">
      {/* Header */}
      <section className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground text-lg">
          Find quick answers to common questions about using the ride management
          system.
        </p>
      </section>

      {/* Search */}
      <section className="max-w-md">
        <Input
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* FAQ List */}
      <section className="max-w-3xl">
        {filteredFaqs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No questions found matching your search.
          </p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>
    </main>
  );
};

export default FAQ;
