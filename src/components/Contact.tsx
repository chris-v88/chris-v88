import aboutData from '../data/about.json';
import { Icon, Button } from './ui';

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { email, location, linkedin, github } = aboutData;

  return (
    <section id="contact" className="py-20 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-100 mb-4 text-center">Get In Touch</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-100 mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="Mail" />
                <div>
                  <h4 className="font-semibold text-gray-100">Email</h4>
                  <a href={`mailto:${email}`} className="text-blue-400 hover:text-blue-300">
                    {email}
                  </a>
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
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {linkedin.replace('https://www.', '')}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Icon name="Github" />
                <div>
                  <h4 className="font-semibold text-gray-100">GitHub</h4>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {github.replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-100 mb-6">Send a Message</h3>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="info"
                className="w-full flex items-center justify-center gap-2"
              >
                <Icon name="Send" size="sm" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
