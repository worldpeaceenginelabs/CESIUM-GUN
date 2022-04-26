import React, { Fragment, useEffect, useState } from 'react'
import {
    createDefaultImageryProviderViewModels,
    Ion,
    Viewer,
    Cartesian3,
    Math,
    Color,
    LabelStyle,
    VerticalOrigin,
    Cartesian2,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    defined,
    Entity,
} from 'cesium'
import { makeStyles } from '@material-ui/core'
import useStateRef from 'react-usestateref'

import appConfig from 'src/getConfig'
import addToggleZoomToUserLocation from 'src/Components/views/actions/addToggleZoomToUserLocation'
import addUserLocationInteraction from 'src/Components/views/actions/addUserLocationInteraction'
import useHasMouseSupport from 'src/hooks/useHasMouseSupport'
import addGlobeAutoRotation from 'src/Components/views/actions/addGlobeAutoRotation'
import ModeToggleButton from '../buttons/modeToggle/modeToggle'
import CreateMissionModal from '../createMission/MissionModal'
import ViewMissionModal from '../viewMission/MissionModal'
import { fetchAllMissions } from 'src/actions/mission'

const getLocationFromNavigator = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position)
                },
                (error) => {
                    reject(error)
                }
            )
        } else {
            reject(new Error('Geolocation is not supported by this browser.'))
        }
    })
}

const styles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    },
})

let userLocationCartesian: Cartesian3 | null
const containerId = 'cesiumContainer'
const userLocationPointId = 'user-location'

const CesiumMap: React.FunctionComponent = () => {
    const [viewer, setViewer, viewerRef] = useStateRef<Viewer>()
    const [moveHandler, setMoveHandler] = useState<ScreenSpaceEventHandler>()
    const [mode, setMode, modeRef] = useStateRef('view')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [selectedMission, setSelectedMission] = useState<String | null>(null)
    const [modelActiveFormStep, setModalActiveFormStep] = useState(0)
    const [missions, setMissions] = useState([])

    const hasMouseSupport = useHasMouseSupport()

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setModalActiveFormStep(0)
    }

    const handleViewModalClose = () => {
        setIsViewModalOpen(false)
        setSelectedMission(null)
    }

    useEffect(() => {
        fetchAllMissions().then((response) => {
            setMissions(response.data)
        })
    }, [])

    useEffect(() => {
        if (missions.length < 1) {
            return
        }

        void (async (): Promise<void> => {
            let userLocation: GeolocationPosition | null = null

            try {
                userLocation = await getLocationFromNavigator()
            } catch (error) {
                // Ignore user decline
            }

            // Set custom token
            Ion.defaultAccessToken = appConfig.app.cesium.accessToken

            // Get the index of OpenStreetMap provider to select it first
            const viewModels = createDefaultImageryProviderViewModels()
            const openStreetMapModelIndex = viewModels.findIndex((model) =>
                model.iconUrl.includes('openStreetMap')
            )

            setViewer(
                new Viewer(containerId, {
                    ...appConfig.app.cesium,
                    shouldAnimate: true,
                    selectedImageryProviderViewModel:
                        openStreetMapModelIndex === -1
                            ? viewModels[0]
                            : viewModels[openStreetMapModelIndex],
                })
            )
            viewerRef.current!.scene.screenSpaceCameraController.enableTilt = false

            viewerRef.current!.selectedEntityChanged.addEventListener(
                (selectedEntity: Entity) => {
                    if (defined(selectedEntity)) {
                        console.log(selectedEntity)
                        setIsViewModalOpen(true)
                        setSelectedMission(selectedEntity.id)
                    } else {
                        console.log('Deselected')
                    }
                }
            )

            if (userLocation !== null) {
                userLocationCartesian = Cartesian3.fromDegrees(
                    userLocation.coords.longitude,
                    userLocation.coords.latitude,
                    appConfig.app.zoomHeightUser * 1000
                )

                addUserLocationInteraction(
                    viewerRef.current!,
                    userLocation,
                    userLocationCartesian,
                    userLocationPointId
                )
            }

            addToggleZoomToUserLocation(
                viewerRef.current!,
                userLocationPointId,
                userLocationCartesian
            )

            if (hasMouseSupport && appConfig.app.enableGlobeAutoRotation) {
                addGlobeAutoRotation(
                    viewerRef.current!,
                    appConfig.app.globeRotationSpeed
                )
            }

            viewerRef.current!.canvas.addEventListener(
                'click',
                (event: MouseEvent) => {
                    canvasEvent(event)
                }
            )

            missions.forEach((mission: any) => {
                const missionDetails = mission[mission.missionType]

                viewerRef.current!.entities.add({
                    id: mission.uid,
                    name: missionDetails.title,
                    position: Cartesian3.fromDegrees(
                        Number(mission.longitude),
                        Number(mission.latitude)
                    ),
                    point: {
                        pixelSize: 5,
                        color: Color.RED,
                        outlineColor: Color.WHITE,
                        outlineWidth: 2,
                    },
                    label: {
                        text: missionDetails.title,
                        font: '14pt monospace',
                        style: LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        verticalOrigin: VerticalOrigin.BOTTOM,
                        pixelOffset: new Cartesian2(0, -9),
                    },
                })
            })
        })()
    }, [hasMouseSupport, missions])

    const classes = styles()

    const onChangeMode = () => {
        if (mode === 'view') {
            setMode('edit')
        } else if (mode === 'edit') {
            setMode('view')
        }
    }

    const canvasEvent = (event: MouseEvent) => {
        if (modeRef.current == 'edit') {
            const ellipsoid = viewerRef.current!.scene.globe.ellipsoid
            const cartesian = viewerRef.current!.camera.pickEllipsoid(
                new Cartesian3(event.clientX, event.clientY),
                ellipsoid
            )
            if (cartesian) {
                const cartographic = ellipsoid.cartesianToCartographic(
                    cartesian
                )
                const longitudeString = Math.toDegrees(
                    cartographic.longitude
                ).toFixed(10)
                const latitudeString = Math.toDegrees(
                    cartographic.latitude
                ).toFixed(10)

                console.log(longitudeString, latitudeString)

                setLongitude(longitudeString)
                setLatitude(latitudeString)

                handleModalOpen()
            }
        }
    }

    return (
        <Fragment>
            {missions.length < 1 ? (
                <Fragment>Loading...</Fragment>
            ) : (
                <Fragment>
                    <div id={containerId} className={classes.container} />
                    <CreateMissionModal
                        open={isModalOpen}
                        longitude={longitude}
                        latitude={latitude}
                        handleClose={handleModalClose}
                    />
                    <ViewMissionModal
                        open={isViewModalOpen}
                        missionId={selectedMission}
                        handleClose={handleViewModalClose}
                    />
                    <div>
                        <ModeToggleButton onClick={() => onChangeMode()} />
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default CesiumMap
