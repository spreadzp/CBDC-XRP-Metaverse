import { FC, useCallback, useEffect, useRef, useState } from "react";
import { convertStringToHex } from 'xrpl'
import { useNavigate } from 'react-router-dom';



import Demo from "./Demo";
import LandSwitch from "./LandSwitch";
import { Alert } from "react-bootstrap";
// import styled from "styled-components";

export const Map: FC = () => {

    const ref = useRef();
    const tiles = 12;
    const plots = tiles * 9;
    const roads = tiles * 2;
    const initialOffsets = plots + roads;
    const plotViewOffsets = plots + 1.5 * roads;
    const [cursorEvent, setCursorEvent] = useState({} as any);
    const [plotSize, setPlotSize] = useState({
        width: tiles * 9,
        height: tiles * 9,
    });
    useEffect(() => {
        if (window) {
            window.addEventListener("keydown", (e: any) => {
                setCursorEvent(e);
            });
        }
    }, []);

    useEffect(() => {
        if (cursorEvent) {
            move(cursorEvent?.key);
        }
    }, [cursorEvent]);

    const handleRefresh = useCallback(() => {
        //ref.current && ref.current.refresh()
    }, [ref.current]);
    const navigate = useNavigate();
    const mainCtxRef = useRef<HTMLCanvasElement>(null);
    const plotCtxRef = useRef<HTMLCanvasElement>(null);
    const [mainContext, setMainContext] = useState({} as CanvasRenderingContext2D);
    const [plotContext, setPlotContext] = useState({} as CanvasRenderingContext2D);
    const [room, setRoom] = useState("");
    const [alertMessage, setAlert] = useState({variant: "", message: ""});
    
    const [plotID, setPlotID] = useState("");
    const [landSize, setLandSize] = useState({
        width: 3 * plots + 4 * roads,
        height: 3 * plots + 4 * roads,
    });
    const [plotView, setPlotView] = useState({
        plotX: 0,
        plotY: 0,
        locationX: 0,
        locationY: 0,
    });
    type CursorViewProps = {
        locationX: number,
        locationY: number
    }
    const [cursor, setCursor] = useState({
        locationX: 0,
        locationY: 0,
    } as CursorViewProps);

    type MapViewProps = {
        mapOffsetX: number,
        mapOffsetY: number
    }

    const [mapView, setMapView] = useState({
        mapOffsetX: -1 * initialOffsets,
        mapOffsetY: -1 * initialOffsets,
    } as MapViewProps);

    const [worldImage, setWorldImage] = useState({} as CanvasImageSource);
    useEffect(() => {
        if (alertMessage.message) {
            setTimeout(() => {
                setAlert({ variant: "", message: ""  })
            }, 10000)
        }
    }, [alertMessage]);
    // useEffect(() => {
    //     console.log('cursor', cursor)
    //     const drawCursor = async () => {
    //         const ctx = await mainCtxRef?.current?.getContext('2d');
    //         if (ctx?.lineWidth && ctx?.fillStyle) {
    //             // ctx.lineWidth = 10;
    //         }
    //         // ctx?.fillRect(Math.abs(x),  Math.abs(y), plots, plots);

    //         ctx?.strokeRect(Math.abs(cursor.locationX), Math.abs(cursor.locationY),plots, plots);
    //     }
    //     drawCursor();
    // }, [cursor]);
    useEffect(() => {
        const canvas = mainCtxRef.current;
        const context: CanvasRenderingContext2D = canvas?.getContext("2d")!;
        setMainContext(context);

        const canvasPlot = plotCtxRef?.current;
        const ctxPlot: CanvasRenderingContext2D = canvasPlot?.getContext("2d")!;
        console.log("🚀 ~ file: Land.tsx ~ line 124 ~ plotContext", plotContext);
        setPlotContext(ctxPlot);
    }, []);
    useEffect(() => {
        const createImg = async () => {
            if (mainContext) {
                console.log(
                    "🚀 ~ file: Land.tsx ~ line 124 ~ mainContext",
                    mainContext
                );
                mainContext?.beginPath();
                //context.arc(50, 50, 50, 0, 2 * Math.PI);
                const image = new Image();
                //var image = document.createElement("img");

                // const image = document.createElement("IMG") as Image;
                // image.onload = drawImageActualSize;

                image.onload = () => {
                    mainContext?.drawImage(image, 0, 0);
                };
                image.src = "MetaverseLand.png";
                setWorldImage(image);
                //context.fill();
                initializeMap(mainContext, plotContext);
                if (plotContext) {

                }
            }
        };
        createImg();
    }, [mainContext, plotContext]);

    useEffect(() => {
        console.log("plotView :>> ", plotView);


        const hash = convertStringToHex(JSON.stringify(plotView));
        setPlotID(hash); // "hash" //ethers.utils.id(JSON.stringify(plotView));

        handleRoom(hash);
        isPlotAssignable(hash);

    }, [plotView]);

    const setPlotData = () => {

        const hash = convertStringToHex(JSON.stringify(plotView));
        setPlotID(hash); // "hash" //ethers.utils.id(JSON.stringify(plotView));

        handleRoom(hash);
        isPlotAssignable(hash);
        localStorage.setItem("selected-room", room);
    };
    const assignPlot = async () => {
        // const plotID = document.getElementById("plotID") as HTMLInputElement | null;
        // PlotX: document.getElementById("plotX");
        // const assigned = await isPlotAssigned(plotID?.value);
        // console.log(
        //   "🚀 ~ file: logic.js ~ line 164 ~ assignPlot ~ assigned",
        //   assigned
        // );
        // if (!assigned) {
        //   const metadata = {
        //     PlotID: plotID?.value,
        //     PlotX: document.getElementById("plotX").value,
        //     PlotY: document.getElementById("plotY").value,
        //     LocationX: document.getElementById("locationX").value,
        //     LocationY: document.getElementById("locationX").value,
        //     image:
        //       "https://moralis.io/wp-content/uploads/2021/06/Moralis-Glass-Favicon.svg",
        //   };
        // const metadataFile = new Moralis.File("metadata.json", { base64: btoa(JSON.stringify(metadata)) });
        // await metadataFile.saveIPFS();
        // const metadataURI = metadataFile.ipfs();
        // await mint(metadataURI);
        // } else {
        //   displayMessage("01", "Plot is already assigned");
        // }
    };
    const enterChat = useCallback(() => handleRefresh(), []);
    const leaveChat = useCallback(() => handleRefresh(), []);
    const mintToken = useCallback(() => handleRefresh(), []);
    type HashLand = {
        [key: string]: string
    }
    const unassignables: HashLand = {
        "7B22706C6F7458223A302C22706C6F7459223A302C226C6F636174696F6E58223A3237362C226C6F636174696F6E59223A3237367D":
            "Land1",
        "7B22706C6F7458223A312C22706C6F7459223A302C226C6F636174696F6E58223A3430382C226C6F636174696F6E59223A3237367D":
            "Land2",
        "7B22706C6F7458223A322C22706C6F7459223A302C226C6F636174696F6E58223A3534302C226C6F636174696F6E59223A3237367D":
            "Land3",
        "7B22706C6F7458223A332C22706C6F7459223A302C226C6F636174696F6E58223A3637322C226C6F636174696F6E59223A3237367D":
            "Land4",
        "7B22706C6F7458223A342C22706C6F7459223A302C226C6F636174696F6E58223A3830342C226C6F636174696F6E59223A3237367D":
            "Land5",
        "7B22706C6F7458223A352C22706C6F7459223A302C226C6F636174696F6E58223A3934382C226C6F636174696F6E59223A3238387D":
            "Land6",
        "7B22706C6F7458223A302C22706C6F7459223A312C226C6F636174696F6E58223A3238382C226C6F636174696F6E59223A3432307D":
            "Land7",
        "7B22706C6F7458223A312C22706C6F7459223A312C226C6F636174696F6E58223A3432302C226C6F636174696F6E59223A3432307D":
            "Land8",
        "7B22706C6F7458223A322C22706C6F7459223A312C226C6F636174696F6E58223A3535322C226C6F636174696F6E59223A3432307D":
            "Land9",
        "7B22706C6F7458223A332C22706C6F7459223A312C226C6F636174696F6E58223A3638342C226C6F636174696F6E59223A3432307D":
            "Land10",
        "7B22706C6F7458223A342C22706C6F7459223A312C226C6F636174696F6E58223A3831362C226C6F636174696F6E59223A3432307D":
            "Land11",
    };

    //web3 constants
    const contractAddress = ""; //your own contract



    function initializeMap(main: CanvasRenderingContext2D, plot: CanvasRenderingContext2D) {
        updatePlotLocation();
        setPlotData();
        drawMapSection(main, mapView.mapOffsetX, mapView.mapOffsetY);
        // drawCursor(plotViewOffsets, plotViewOffsets);
        drawMapSection(plot, -1 * plotView.locationX, -1 * plotView.locationY);
        setCursor({ locationX: 0, locationY: 0 });
    }

    //animate functions
    function move(direction: string) {
        const validMove = validateMove(direction);
        if (validMove) {
            // const canvas = mainCtxRef?.current;
            // const canvasPlot = plotCtxRef?.current;
            updateView(direction);
            updatePlotLocation();
            //drawCursor(mapView.mapOffsetX, mapView.mapOffsetY);
            drawMapSection(mainContext, mapView.mapOffsetX, mapView.mapOffsetY);
            drawMapSection(
                plotContext,
                -1 * plotView.locationX,
                -1 * plotView.locationY
            );
            setPlotData();
        }
    }

    function validateMove(direction: string) {
        switch (direction) {
            case "ArrowRight":
                return !(plotView.plotX == 5);
            case "ArrowUp":
                return !(plotView.plotY == 0);
            case "ArrowLeft":
                return !(plotView.plotX == 0);
            case "ArrowDown":
                return !(plotView.plotY == 5);
        }
    }


    function updateView(direction: string) {
        const plot = plotView;
        const map = mapView;
        const cursorData = cursor;
        const rate = 0.25;
        console.log("🚀 ~ file: Map.tsx ~ line 262 ~ updateView ~ cursorData", cursorData)
        switch (direction) {
            case "ArrowRight":
                plot.plotX += 1;
                map.mapOffsetX -= plots + roads;
                cursorData.locationX -= plots * rate;
                cursorData.locationY = map.mapOffsetY;
                setMapView(map);
                setPlotView(plot);
                setCursor(cursorData)
                drawCursor(cursorData);
                break;
            case "ArrowDown":
                plot.plotY += 1;
                map.mapOffsetY -= plots + roads;
                cursorData.locationY -= plots * rate;
                cursorData.locationX = map.mapOffsetX;
                setMapView(map);
                setPlotView(plot);
                drawCursor(cursorData);
                break;
            case "ArrowLeft":
                plot.plotX -= 1;
                map.mapOffsetX += plots + roads;
                cursorData.locationX += plots * rate;
                cursorData.locationY = map.mapOffsetY;
                setMapView(map);
                setPlotView(plot);
                drawCursor(cursorData);
                break;
            case "ArrowUp":
                plot.plotY -= 1;
                map.mapOffsetY += plots + roads;
                cursorData.locationY += plots * rate;
                cursorData.locationX = map.mapOffsetX;
                setMapView(map);
                setPlotView(plot);
                drawCursor(cursorData);
                break;
        }
    }

    function drawMapSection(ctx: CanvasRenderingContext2D, originX: number, originY: number) {
        ctx?.drawImage(worldImage as CanvasImageSource, originX, originY);
    }

    async function drawCursor(cursorData: CursorViewProps) {
        const ctx = await mainCtxRef?.current?.getContext('2d');
        if (ctx?.lineWidth && ctx?.fillStyle) {
            // ctx.lineWidth = 10;
        }
        // ctx?.fillRect(Math.abs(x),  Math.abs(y), plots, plots);
        const rate = 108;
        ctx?.strokeRect(Math.abs(cursorData.locationX), Math.abs(cursorData.locationY), rate, rate);
    }

    function updatePlotLocation() {
        const plot = plotView;
        console.log(
            "🚀 ~ file: Land.tsx ~ line 269 ~ updatePlotLocation ~ plot",
            plot
        );
        plot.locationX = -1 * mapView.mapOffsetX + plotViewOffsets;
        plot.locationY = -1 * mapView.mapOffsetY + plotViewOffsets;
        setPlotView(plot);
    }

    //UI Functions

    function handleRoom(plotID: string) {
        setRoom(unassignables[plotID]);
    }
    const moveToLand = () => {

        const land = plotCtxRef?.current?.toDataURL() ?? ""; 
            localStorage.setItem('land', land)
            navigate(`/land/${room}`)
        
            // setAlert({variant: "danger", message: "Need to choise a Land using arrows on the keyboard"})
        
       
    };

    function isPlotAssignable(plotID: string) {
        const _unassignable = Object.keys(unassignables).includes(plotID);
        console.log(
            "🚀 ~ file: logic.js ~ line 138 ~ isPlotAssignable ~ _unassignable",
            _unassignable
        );
        // if (_unassignable) {
        //     document.getElementById("claimButton").setAttribute("disabled", null);
        // }
        // else {
        //     document.getElementById("claimButton").removeAttribute("disabled");
        // }
    }

    function displayMessage(messageType: string, message: string) {
        type MessageType = {
            [key: string]: string
        }
        const messages: MessageType = {
            "00": `<div class= "alert alert-success"> ${message} </div>`,
            "01": `<div class= "alert alert-danger"> ${message} </div>`,
        };
        if (document?.getElementById("notifications")) {
            document!.getElementById("notifications")!.innerText = messages[messageType];
        }

    }

    //web3 Functions
    // async function login() {
    //     Moralis.Web3.authenticate().then(async function () {
    //         const chainIdHex = await Moralis.switchNetwork("0x13881");
    //     });
    // }

    async function mint(_tokenURI: string) {
        const contractOptions = {
            contractAddress: contractAddress,
            abi: "contractABI",
            functionName: "assign",
            params: {
                tokenURI: _tokenURI,
                bytesId: plotID,
            },
        };
        try {
            // const transaction = await Moralis.executeFunction(contractOptions);
            // await transaction.wait();
            // displayMessage("00", "Transaction confirmed with hash " + transaction.hash);
        } catch (error) {
            displayMessage("01", "Transaction reverted see console for details");
            console.log(error);
        }
    }

    async function isPlotAssigned(plotID: string) {
        const contractOptions = {
            contractAddress: contractAddress,
            abi: "contractABI",
            functionName: "exist",
            params: {
                bytesId: plotID,
            },
        };
        return true;
    }

    return (
        <>
            <main id="land-page">
                <div className="container ">
                    <div className="row">
                        <h1 className="display-1 text-center text-success"> CBDC METAVERSE</h1>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="text-center bg-success text-white">
                                <h1>Map</h1>
                            </div>

                            <div id="MainCanvasDiv" className="text-center">
                                <canvas
                                    ref={mainCtxRef}
                                    height={landSize.height}
                                    width={landSize.width}
                                />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="text-center bg-success text-white">
                                <h1
                                    id="current-land"
                                    className="text-center bg-success text-white"
                                >
                                    Chosen Land
                                </h1>
                            </div>
                            <div id="PlotCanvasDiv" className="claim-container">
                            {alertMessage.message.length > 0 && <Alert variant={"danger"} ></Alert>}
                                <div className="chosen-land" onClick={() => moveToLand()}>
                                    <canvas
                                        onClick={() => enterChat()}
                                        ref={plotCtxRef}
                                        height={plotSize.height}
                                        width={plotSize.width}
                                    />
                                </div> 
                                <div className="input-group mb-2">
                                    <span className="input-group-text">Plot ID</span>
                                    <div className="form-control">{unassignables[plotID]}</div>
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text">Plot ID</span>
                                    <div className="form-control land-hash">{plotID}</div>
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text">Plot Coordinates</span>
                                    <div className="form-control">{plotView.plotX}</div>

                                    <div className="form-control">{plotView.plotY}</div>
                                </div>
                                <div className="input-group mb-2">
                                    <span className="input-group-text">Location Coordinates</span>
                                    <div className="form-control">{plotView.locationX}</div>

                                    <div className="form-control">{plotView.locationY}</div>
                                </div>
                                <div className="row">
                                    <button
                                        className="btn btn-success btn-block btn-lg"
                                        id="claimButton"
                                        onClick={() => moveToLand()}
                                    >
                                        Move to {unassignables[plotID]}
                                    </button>
                                </div>
                            </div>
                             
                        </div>
                        <hr />
                        <div className="row">
                            <div className="text-center bg-success text-white">
                                <h1>Use &#8592; &#8593; &#8594; &#8595; to chose Land</h1>
                            </div>
                            <div id="notifications" className="container mt-2"></div>
                            {/* <img src="MetaverseLand.png" id="img-example" /> */}
                        </div>
                    </div>
                </div>
             
            </main>
        </>
    );
};

 