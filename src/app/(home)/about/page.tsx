import { config } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import ContactCard from "@/components/contact-card";
import { FaLinkedin } from "react-icons/fa";


export const metadata = {
  title: "About",
  description: "About me",
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <Avatar className="size-32 md:size-40">
            <AvatarImage src={config.developer.avatar} alt="Avatar" />
            <AvatarFallback className="text-4xl">
              {config.developer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {config.developer.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {config.developer.title}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {config.developer.bio}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ContactCard
            title="GitHub"
            href={`https://github.com/${config.social.github}`}
            icon={<FaGithub className="w-4 h-4" />}
          />

          <ContactCard
            title="LinkedIn"
            href="https://www.linkedin.com/in/nitishkumarpandittt/"
            icon={<FaLinkedin className="w-4 h-4" />}
          />

          <div className="p-6 bg-muted rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <FaMapPin className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Location</h3>
            </div>
            <p className="text-muted-foreground">{config.social.location}</p>
          </div>
        </div>

        <div className="bg-muted rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I&apos;m a passionate full-stack developer who loves building
            digital experiences that make a difference. My approach combines
            clean code, thoughtful design, and user-centered thinking.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Focused on becoming a strong backend/SDE engineer at top
            product-based companies. ​Over the last 3+ years, most of the time
            has gone into mastering data structures and algorithms, core CS
            subjects (OS, DBMS, CN, OOP), and building real projects instead of
            just completing lab assignments.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Built multiple end-to-end
            products including an AI-based expense tracker, a cloud IDE, a
            feature-rich URL shortener, a modern UI blog application, and a 2D
            shooting quiz game.​ These projects involved working with APIs,
            clean architecture, cloud deployment, and interactive frontends,
            with a constant focus on writing maintainablea code (microservices architectured) and delivering a
            smooth user experience. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
