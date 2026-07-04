import { IMAGES } from "../../../assets";
import { Link } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import { appDownloadLinks } from "../../../data/appDownloadLinks";
import { footerLinks, socialMediaLinks } from "../../../data/footerLinks";

const Footer = () => {
  return (
    <div className="font-Manrope relative text-white w-full">
      <img
        src={IMAGES.footerBg}
        alt="Footer Background"
        className="absolute top-0 bottom-0 right-0 left-0 w-full h-full"
      />
      <Container>
        <div className="flex flex-col gap-6 font-Inter py-16 text-neutral-130 relative">
          {/* Top Section - Company Info & App Download */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Company Info */}
            <div className="flex-1">
              <Link to="/">
                <img
                  src={IMAGES.logoFooter}
                  alt="Vedic Wisdom"
                  className="h-12"
                />
              </Link>
              <p className="mt-4 font-GeneralSans max-w-xl text-neutral-55 leading-relaxed">
                Your complete Sanatan lifestyle companion. Ancient wisdom made
                accessible for the modern devotee — with love, reverence, and
                technology.
              </p>

              <div className="flex items-center gap-4 mt-6">
                {socialMediaLinks?.map((item, index) => (
                  <a
                    key={index}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={item.icon}
                      alt="Social Media"
                      className="size-6"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* App Download */}
            <div className="shrink-0">
              <p className="text-neutral-55 font-medium">Download the app</p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                {appDownloadLinks?.map((link, index) => (
                  <a
                    key={index}
                    href={link?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={link?.image}
                      alt="Download App"
                      className="h-12"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12 w-full mt-12">
            {footerLinks?.map((section) => (
              <div key={section?.heading}>
                <h3 className="font-Satoshi font-semibold text-xl text-white mb-5">
                  {section?.heading}
                </h3>

                <ul className="flex flex-col gap-3">
                  {section?.links?.map((link) => (
                    <li key={link?.label}>
                      {link?.path ? (
                        <Link
                          to={link?.path}
                          className="flex items-center gap-2 text-neutral-55 hover:text-primary-10 hover:underline transition-colors duration-300 font-GeneralSans"
                        >
                          <span>{link.label}</span>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2 text-neutral-55 font-GeneralSans">
                          <span>{link.label}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <img
            src={IMAGES.horizontalLine}
            alt="Divider"
            className="mx-auto mt-8 mb-4 w-full"
          />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-center text-neutral-55 text-sm">
              © {new Date().getFullYear()} Vedic Wisdom. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy-policy"
                className="text-neutral-55 hover:text-primary-10 hover:underline text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-neutral-55 hover:text-primary-10 hover:underline text-sm transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
