import { SiDiscord, SiGithub, SiGmail } from "react-icons/si";
import { FaUserTie } from "react-icons/fa";

export default function CtaSection() {
  return (
    <section className="bg-black py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-white">Connect with Kerenstake</h2>
        <p className="text-gray-400 mt-2">Explore ways to collaborate, build, and grow with our validator network.</p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
        {/* Card */}
        {[
          {
            icon: <SiGithub className="w-8 h-8 text-white mb-3" />,
            title: "GitHub",
            text: "Explore our open-source validator tools and scripts on GitHub.",
            btn: "View GitHub →",
          },
          {
            icon: <SiDiscord className="w-8 h-8 text-white mb-3" />,
            title: "Discord",
            text: "Join our community to discuss validator setups and network updates.",
            btn: "Join Discord →",
          },
          {
            icon: <FaUserTie className="w-8 h-8 text-white mb-3" />,
            title: "Talk to an Expert",
            text: "Get in touch with us to discuss your project or validator collaboration.",
            btn: "Get Support →",
          },
        ].map(({ icon, title, text, btn }) => (
          <div key={title} className="bg-neutral-900 rounded-xl p-6 text-left border border-white/5 hover:border-white/10 transition">
            <div className="text-2xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 mb-5 text-sm leading-relaxed">{text}</p>
            <button className="bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/20 transition">{btn}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
