import { Wallet, BarChart3, Shield, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Wallet,
      title: "Multiple Accounts",
      description:
        "Create separate accounts for different spending categories. Keep your rent, food, and entertainment expenses perfectly organized.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description:
        "Get instant insights into your spending patterns. See where your money goes with beautiful, easy-to-understand charts.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "AI Insights",
      description:
        "Let AI analyze your expenses and provide personalized tips to save more. Get smarter with your money every day.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Add expenses in seconds, not minutes. Our streamlined interface makes expense tracking effortless and intuitive.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Why Choose Our Expense Tracker?
          </h2>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Built for people who want to understand their money, not just track
            it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
