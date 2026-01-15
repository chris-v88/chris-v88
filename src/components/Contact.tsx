import aboutData from '../data/about.json';
import { Button, Icon } from './ui';

const Contact = () => {
  const { email, location, linkedin, github } = aboutData;

  return (
    <section id="contact" className="py-20 px-4 bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-100 mb-4 text-center">Get In Touch</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <div className="bg-neutral-900 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-100 mb-6 text-center">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="Mail" />
                <div>
                  <h4 className="font-semibold text-gray-100">Email</h4>
                  <Button display="link" href={`mailto:${email}`}>
                    {email}
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="MapPin" />
                <div>
                  <h4 className="font-semibold text-gray-100">Location</h4>
                  <p className="text-gray-400">{location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="Linkedin" />
                <div>
                  <h4 className="font-semibold text-gray-100">LinkedIn</h4>
                  <Button display="link" href={linkedin} target="_blank" rel="noopener noreferrer">
                    {linkedin.replace('https://www.', '')}
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="Github" />
                <div>
                  <h4 className="font-semibold text-gray-100">GitHub</h4>
                  <Button display="link" href={github} target="_blank" rel="noopener noreferrer">
                    {github.replace('https://', '')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
