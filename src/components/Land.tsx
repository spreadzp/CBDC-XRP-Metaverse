import React, { useEffect, useRef } from 'react';
import Chat from './Chat';
import MarketPlace from './MarketPlace';

function Land() {
    const pathname = window.location.pathname;
    const pathParams = pathname.split('/');
    const ratingLand = +(pathParams[pathParams.length - 1].slice(-1))
    const landImage = localStorage.getItem('land') ?? ""
    // const [plotContext, setPlotContext] = useState(JSON.parse(landContext) as CanvasRenderingContext2D);
    // const plotCtxRef = useRef < HTMLCanvasElement > (null);
    // useEffect(() => {
    //     if (landContext) {
    //         const lc = JSON.parse(landContext);
    //         plotCtxRef?.drawImage(lc , 50, 50);
    //     } 
    // }, [landContext]);  

    return (
        <>
            <div style={{ backgroundImage: `url(${landImage})`, backgroundSize: "cover"}}>
                <Chat rating={ratingLand} />
                {ratingLand > 1 && <MarketPlace rating={ratingLand} />}
            </div>
        </>
    );
}

export default Land;

// <div className="chosen-land" >
            // <img src={landImage} alt="Red dot" />
            // </div>