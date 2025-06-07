import { Helmet } from "react-helmet-async";
import { FaBrain, FaMobileAlt, FaServer, FaCloud } from "react-icons/fa";
import Button from "../components/UI/Button";
import { useI18n } from "../contexts/i18nContext";

/**
 * Services.jsx
 *  - Lists main services with icons and descriptions.
 *  - “Get a Free Quote” button scrolls to Contact or navigates there.
 */
export default function Services() {
  const { t } = useI18n();

  const services = [
    {
      icon: <FaBrain className="text-5xl text-primary mb-4" />,
      title: t("AI Integration"),
      description: t(
        "Harness state-of-the-art AI to generate content, chatbots, and predictive insights."
      ),
    },
    {
      icon: <FaMobileAlt className="text-5xl text-primary mb-4" />,
      title: t("Mobile App Development"),
      description: t(
        "Build performant, responsive mobile apps with React Native and Flutter."
      ),
    },
    {
      icon: <FaServer className="text-5xl text-primary mb-4" />,
      title: t("Full-Stack Engineering"),
      description: t(
        "Scalable backends (Node.js, GraphQL) and modern frontends (React, Next.js) for millions of users."
      ),
    },
    {
      icon: <FaCloud className="text-5xl text-primary mb-4" />,
      title: t("Cloud & DevOps"),
      description: t(
        "CI/CD pipelines, container orchestration (Kubernetes), and 24/7 monitoring."
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>UltraProfile+ | Services</title>
        <meta
          name="description"
          content="UltraProfile+ offers AI, mobile, cloud, and full-stack development services."
        />
      </Helmet>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{t("Our Services")}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            {t(
              "From AI to cloud-native, we cover every aspect of modern software development."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl transition"
              >
                {svc.icon}
                <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {svc.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {svc.description}
                </p>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/contact")}
                  className="mt-2"
                >
                  {t("Learn More")}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/contact")}
            >
              {t("Get a Free Quote")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
