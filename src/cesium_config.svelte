// code snippet from the old react baced repository. not integrated yet. just copied here

<script lang="ts">

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



</script>
