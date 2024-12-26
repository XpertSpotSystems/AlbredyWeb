import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";
import FooterOne from "../wrappers/footer/FooterOne";
import * as MyConstants from "../AdminPanel/Constant/Config";

const LayoutOne = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass,
  // GeneralSettings
}) => {
  // console.log('GeneralSettings',GeneralSettings)
  // const [general_settings, setGeneralSettings] = useState([]);

  // // GetGeneralSettings
  // const GetGeneralSettings = () => {
  //   fetch(MyConstants.FrontEndHomeData, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((result) => {
  //     result.json().then((response) => {
  //       if (response.status == true) {
  //         setGeneralSettings(response.front_data.general_setting);

  //         localStorage.setItem(
  //           "general_settings",
  //           JSON.stringify(response.front_data.general_setting)
  //         );
  //       }
  //     });
  //   });
  // };

  // useEffect(() => {
  //   GetGeneralSettings();
  // }, []);

  return (
    <Fragment>
      <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
        // general_setting={GeneralSettings}
      />
      {children}
      <FooterOne
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
        // general_setting={GeneralSettings}
      />
    </Fragment>
  );
};

LayoutOne.propTypes = {
  children: PropTypes.any,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string,
};

export default LayoutOne;
