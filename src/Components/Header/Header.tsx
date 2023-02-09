import React from "react";
import { useLocation } from "react-router-dom";

import primaryLogo from "../../assests/image/mahindra-new-logo.webp";
import secondaryLogo from "../../assests/image/logoMahindra.png";
import SearchIcon from "../../assests/image/img-search.webp";
import AccountIcon from "../../assests/image/user-inactive.webp";

import headerStyles from "./index.module.scss";

const Header = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className={headerStyles.app_header}>
      {pathname !== "/singleVehicle" ? (
        <>
          <div className={headerStyles.nav_bar}>
            <div className={headerStyles.dark_nav}>
              <span>
                <img src={primaryLogo} className={headerStyles.primary_logo} />
              </span>
              <div className={headerStyles.nav_item}>Vehicles</div>
              <div className={headerStyles.nav_item}>Buy</div>
              <div className={headerStyles.nav_item}>Service</div>
              <div className={headerStyles.nav_item}>Experience</div>
              <div className={headerStyles.nav_item}>Global Markets</div>
            </div>
            <div className={headerStyles.middle_border} />
            <div className={headerStyles.greay_nav}>
              <div className={headerStyles.nav_item}>Test Drive</div>
              <div className={headerStyles.nav_item}>Locate Us</div>
              <div className={headerStyles.nav_item}>
                <span className={headerStyles.nav_item_textIcon_container}>
                  <img className={headerStyles.nav_icon} src={SearchIcon} />
                  Search
                </span>
              </div>
              <div className={headerStyles.nav_item}>
                <span className={headerStyles.nav_item_textIcon_container}>
                  <img className={headerStyles.nav_icon} src={AccountIcon} />
                  Login
                </span>
              </div>
              <span>
                <img
                  src={secondaryLogo}
                  className={headerStyles.secondary_logo}
                />
              </span>
            </div>
          </div>

          <div className={headerStyles.secondary_navBar}>
            <div className={headerStyles.header_dropdown_container}>
              <span>
                <select
                  defaultValue="ownScorpio"
                  className={headerStyles.header_dropdown}
                >
                  <option
                    className={headerStyles.dropdown_item}
                    value="ownScorpio"
                  >
                    OWN SCORPIO-N
                  </option>
                  <option
                    className={headerStyles.dropdown_item}
                    value="bookNow"
                  >
                    Book Now
                  </option>
                  <option
                    className={headerStyles.dropdown_item}
                    value="testDrive"
                  >
                    Test Drive
                  </option>
                  <option
                    className={headerStyles.dropdown_item}
                    value="enquireNow"
                  >
                    Enquire Now
                  </option>
                  <option
                    className={headerStyles.dropdown_item}
                    value="downloadBrochure"
                  >
                    Download Brochure
                  </option>
                </select>
              </span>
            </div>
            <div className={headerStyles.secondary_navbar_item}>
              <div className={headerStyles.secondary_nav_items}>
                Meet Scorpio-N
              </div>
              <div className={headerStyles.secondary_nav_items}>
                Advanced Tech
              </div>
              <div className={headerStyles.secondary_nav_items}>
                Key Highlights
              </div>
              <div className={headerStyles.secondary_nav_items}>
                Variants and Pricing
              </div>
              <div className={headerStyles.secondary_nav_items}>Features</div>
              <div className={headerStyles.secondary_nav_items}>Xplore 360</div>
              <div className={headerStyles.secondary_nav_items}>Gallery</div>
              <div className={headerStyles.secondary_nav_items}>
                Press Release
              </div>
              <div className={headerStyles.secondary_nav_items}>Our Tribe</div>
            </div>
          </div>
        </>
      ) : (
        <div className={headerStyles.single_vehicle_header}>
          <div className={`${headerStyles.icon_bar_container} c-p`}>
            <span className={headerStyles.icon_bar}></span>
            <span className={headerStyles.icon_bar}></span>
            <span className={headerStyles.icon_bar}></span>
          </div>
          <img src={secondaryLogo} className={headerStyles.primary_logo} />
        </div>
      )}
    </div>
  );
};

export default Header;
