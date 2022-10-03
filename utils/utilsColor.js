const arrayColor = [
    'blue',
    'green',
    'red',
    'orange',
    'purple',
    'yellow',
    'black',
]

let setColor=[]
function utilsColor(x, y, mode){
    if ( !setColor[x]) {
        setColor[x] = []
    }
    if ( !setColor[x][y] ) {
        setColor[x][y] = useColor(mode, x , y);
    }
    return setColor[x][y]
}

function useColor(modeColor, X, Y){
    if (modeColor=='random') {
        const index = Math.floor(Math.random() * arrayColor.length)
        return arrayColor[index]
    }
    if (modeColor=='row')
        return arrayColor[X]
    if (modeColor=='column')
        return arrayColor[Y]
    
    return arrayColor[0]
}