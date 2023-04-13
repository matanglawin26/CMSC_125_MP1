import React, { useMemo } from 'react';

// Credit to WatchMeCode: https://www.youtube.com/@WatchMeCode
function Grid(){
    const { x, y, k } = {x:0,y:0,k:1};
    const scaledGap = 35 * k;
    const patternId = useMemo(() => `pattern-${Math.floor(Math.random()*100000)}`,[]);
    return(      
        <svg 
            style={{
                position:`absolute`,
                top:0,
                left:0,
                width: `100vw`,
                height: `100vh`,
                backgroundColor:`040F15`,
                zIndex: 1
            }}
            className={`__bg`}>
            
            <pattern
                id={patternId}
                x={x%scaledGap}
                y={y%scaledGap}
                width={scaledGap}
                height={scaledGap}
                patternUnits={`userSpaceOnUse`}>
                <path
                    stroke={`#C0E2BF`}
                    strokeWidth={.5}
                    d={`M${scaledGap / 2} 0 V${scaledGap} M0 ${scaledGap / 2} H${scaledGap}`}/>
            </pattern>
            <rect
                x={0}
                y={0}
                width={`100%`}
                height={`100%`}
                fill={`url(#${patternId})`}
            />
        </svg>               
    )
}

export default Grid;