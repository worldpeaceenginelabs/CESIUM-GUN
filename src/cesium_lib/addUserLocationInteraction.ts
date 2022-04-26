import { Cartesian3, Color, Viewer } from 'cesium';
import createPulsatingPoint from 'src/utils/cesium/createPulsatingPoint';

const addUserLocationInteraction = (
  viewer: Viewer,
  userLocation: GeolocationPosition,
  userLocationCartesian: Cartesian3,
  userLocationPointId: string
) => {
  viewer.entities.add(
    createPulsatingPoint(
      viewer,
      userLocationPointId,
      Cartesian3.fromDegrees(
        userLocation.coords.longitude,
        userLocation.coords.latitude,
        0
      ),
      Color.CORNFLOWERBLUE
    )
  );

  // Fly to the destination if the user presses the home button
  viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
    (e: { cancel: boolean }) => {
      if (!userLocationCartesian) {
        return;
      }

      e.cancel = true;

      viewer.camera.flyTo({
        destination: userLocationCartesian,
      });
    }
  );
};

export default addUserLocationInteraction;
