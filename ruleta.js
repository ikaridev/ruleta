
let options = ['amarillo', 'verde', 'azul', 'violeta', 'rosa', 'rojo', 'naranja'];

let roulette = document.getElementById('ruleta');
let rouletteRotation = 0;

let isSpinning = null;
let spinForce = 0;


document.getElementById('pin').addEventListener('click', spin);

function spin()
{
    if(isSpinning != null) return;

    spinForce = Math.round(Math.random() * 360 * 4) + 360;
    isSpinning = setInterval(rotateRoulette, 1);
}

function rotateRoulette()
{
    if(spinForce <= 0)
    {
        clearInterval(isSpinning);
        isSpinning=null;
        getOption();
        return;
    }

    let rotateTo = 1 + (spinForce / 360);

    spinForce -= rotateTo;
    rouletteRotation += rotateTo;

    if (rouletteRotation > 360) rouletteRotation -= 360;

    roulette.style.transform = 'translateX(-50%) translateY(-50%) rotate('+rouletteRotation+'deg)';
}
function getOption()
{
    //let lastAngle = 0; //Usarlo en caso de que la ruleta comience justo en el medio y no sobre la mitad de una opción.
    let lastAngle = 360-Math.round((360/options.length)/2); //Usarlo en caso de que la flecha comience apuntando una opción.
    let anglePerOption = Math.round(360/options.length);
    let option = "No encontrado";

    let currentRotation = Math.round(rouletteRotation);

    // NO FUE TESTEADO QUE LA CONDICIÓN FUNCIONE EMPEZANDO CON EL ÁNGULO EN 0.

    for (let index = 0; index < options.length; index++) {
        if ((currentRotation >= lastAngle && currentRotation <= (lastAngle + anglePerOption)) || (currentRotation + 360 >= lastAngle && currentRotation <= (lastAngle + anglePerOption)%360))
        {
            option = options[index];
            break;
        }

        lastAngle += anglePerOption;
        if (lastAngle>360) lastAngle -= 360;
    }
    alert(option);    
}
