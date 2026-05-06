import aboutData from '../data/about.json';
import { Button, Icon, Text, Card } from '../components/ui';

const RewriteContact = () => {
  const { email, location, linkedin, github } = aboutData;

  return (
    <section id="contact" className="py-20 px-4">
      <Text display="h1" className="text-gray-100 mb-4 text-center">
        Get In Touch
      </Text>
      <Text display="body" className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Have a question or want to work together? Feel free to reach out!
      </Text>

      <div className="max-w-2xl mx-auto">
        <Card size="wide" type="outline" tone="neutral">
          <Text display="h2" className="text-gray-100 mb-6 text-center">
            Contact Information
          </Text>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Icon name="Mail" />
              <div>
                <Text display="h4" className="text-gray-100 mb-1">
                  Email
                </Text>
                <Button display="link" href={`mailto:${email}`} tone="info">
                  <Text display="caption">{email}</Text>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Icon name="MapPin" />
              <div>
                <Text display="h4" className="text-gray-100 mb-1">
                  Location
                </Text>
                <Text display="caption" className="text-gray-400">
                  {location}
                </Text>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Icon name="Linkedin" />
              <div>
                <Text display="h4" className="text-gray-100 mb-1">
                  LinkedIn
                </Text>
                <Button
                  display="link"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="info"
                >
                  <Text display="caption">{linkedin.replace('https://www.', '')}</Text>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Icon name="Github" />
              <div>
                <Text display="h4" className="text-gray-100 mb-1">
                  GitHub
                </Text>
                <Button
                  display="link"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="info"
                >
                  <Text display="caption">{github.replace('https://', '')}</Text>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default RewriteContact;
