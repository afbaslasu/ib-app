import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useI18n } from "../contexts/i18nContext";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import Button from "../components/UI/Button";

/**
 * Contact.jsx
 *  - Displays a contact form. On submit, POSTs to /contact.
 */
export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>UltraProfile+ | Contact</title>
        <meta
          name="description"
          content="Get in touch with UltraProfile+ for inquiries and quotes."
        />
      </Helmet>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-md">
          <h1 className="text-5xl font-bold text-center mb-4">
            {t("Contact Us")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            {t(
              "Have questions? Send us a message and we’ll respond within 24 hours."
            )}
          </p>

          {status === "sending" ? (
            <LoadingSpinner />
          ) : status === "success" ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center">
              {t("Thank you! Your message has been sent.")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                >
                  {t("Name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded dark:bg-gray-700 dark:text-gray-200"
                  placeholder={t("Your Name")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                >
                  {t("Email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded dark:bg-gray-700 dark:text-gray-200"
                  placeholder={t("you@example.com")}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 font-semibold text-gray-700 dark:text-gray-200"
                >
                  {t("Message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded dark:bg-gray-700 dark:text-gray-200"
                  placeholder={t("Your message…")}
                ></textarea>
              </div>
              <Button variant="primary" type="submit" className="w-full">
                {t("Send Message")}
              </Button>
            </form>
          )}

          {status === "error" && (
            <div className="mt-4 text-center text-red-500">
              {t("Submission failed. Please try again.")}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
