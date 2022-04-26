// code snippet from the old react baced repository. not integrated yet. just copied here

import jsonConfig from '../app.config.json';

interface IGlobalAppConfiguration {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  FACEBOOK_APP_ID: string;
  APPLE_APP_ID: string;

  app: {
    // https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
    cesium: {
      accessToken: string;
      animation: boolean;
      baseLayerPicker: boolean;
      fullscreenButton: boolean;
      vrButton: boolean;
      geocoder: boolean;
      homeButton: boolean;
      infoBox: boolean;
      sceneModePicker: boolean;
      selectionIndicator: boolean;
      timeline: boolean;
      navigationHelpButton: boolean;
    };
    /**
     * The height in kilometer the camera will fly to after the user clicked
     * on its location marker
     */
    zoomHeightUser: number;
    /**
     * The height in kilometer the camera will fly to after the user clicked
     * the second time on its location marker
     */
    zoomHeightStart: number;

    /**
     * True if the globe should auto rotate while the user doesn't hover the globe.
     * Only available on devices with mouse support (desktop)
     */
    enableGlobeAutoRotation: boolean;
    /**
     * Rotation speed for the globe during auto rotation (mouse hover on space).
     *
     * A negative value creates a rotation from right to left.
     * A positive value creates a rotation from left to right.
     */
    globeRotationSpeed: number;
  };
}

const getConfig = (): IGlobalAppConfiguration => {
  return {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID as string,
    APPLE_APP_ID: process.env.APPLE_APP_ID as string,

    app: jsonConfig,
  };
};

export default getConfig();
