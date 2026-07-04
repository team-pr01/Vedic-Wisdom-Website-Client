import { IMAGES } from "../../../assets";
import { appDownloadLinks } from "../../../data/appDownloadLinks";
import Badge from "../../Reusable/Badge/Badge";
import Container from "../../Reusable/Container/Container";

const DownloadApp = () => {
  return (
    <div className="py-23 font-Manrope bg-gradient-app-features">
      <img src={IMAGES.horizontalLine} alt="" className="mx-auto" />
      <Container>
        <div className="flex flex-col items-center gap-5 text-center mt-20">
          <Badge label="Begin Today" />
          <h1 className="heading">
            Your Sacred <span className="text-primary-10">Journey</span> <br />
            Starts <span className="text-primary-10">Now.</span>
          </h1>
          <p className="description">
            Download Vedic Wisdom free today and step into a life rooted in
            dharma, wisdom, and inner peace. Ancient guidance for the modern
            seeker.
          </p>

          <div>
            <p className="text-neutral-50">Download the app</p>
            <div className="flex items-center gap-5 mt-5">
              {appDownloadLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={link?.image} alt="" />
                </a>
              ))}
            </div>
          </div>

          <img src={IMAGES.appMockup} alt="" className="mt-12" />
        </div>
      </Container>
    </div>
  );
};

export default DownloadApp;
