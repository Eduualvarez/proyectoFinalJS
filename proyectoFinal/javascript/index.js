document.addEventListener("DOMContentLoaded", function() {
    let main = document.createElement("main");
    main.innerHTML = `
        <div class="divContainer">
            <form>
                <label>Monto inicial</label>
                <input id="monto" placeholder="Ingrese un monto"></input>
                <label>Cuotas</label>
                <input id="cuotas" type="text" placeholder="Ingrese cuotas(1-24)"></input>
                <button id="submit">enviar</button>
                <label>Monto final</label>
                <input id="007" readonly></input>
                <button id="get">Obtener</button>
            </form>
        </div>
    `;
let body = document.getElementById("body");
body.appendChild(main);




const arrayCuotas = [];
let interesesBase = 1;

const intereses= function (num) //funcion para agregar cuotas e intereses al array ===> la hace reutilizable :) .
{
    
for(let i = 0; i <=num; i++){
    let cuotas=i;
    let intereses = ((interesesBase+(i*0.02))).toFixed(2);
    let id=i;
    let objArray =
    { id: id,
      cuotas: cuotas,
      intereses: intereses        
    };
     arrayCuotas.push(objArray);
}}
intereses(24);// diferentes casos segun las cuotas que deseemos tener... 

const validarMonto = () =>
{
    const montoInput = document.getElementById("monto");
    const monto = Number(montoInput.value);
    return (!isNaN(monto) && monto>0)? monto : null;
    
};
const validarCuotas = ()=>
{
        const cuotasInput = document.getElementById("cuotas");
        const cuotas = Number(cuotasInput.value);
        return (cuotas>=1 && cuotas<=24)? cuotas : null;
};

let guardarDatos = () =>{
    document.getElementById("submit").addEventListener("click",
     async(event)=>{
    event.preventDefault();
    const montoValido = validarMonto();
    const cuotasValidas = validarCuotas();
    if(montoValido!==null && cuotasValidas!==null)
    {
        localStorage.setItem("monto",montoValido);
        localStorage.setItem("cuotas",cuotasValidas);
     
         await procesarPrestamo(montoValido,cuotasValidas);
        
        
    }else{console.error("error")}


})};
guardarDatos();


const procesarPrestamo = async function (monto, cuotas) {

    
    const IVA = 1.21;
    const montoFinal = (monto*arrayCuotas[cuotas].intereses)*IVA;
    localStorage.setItem("montoFinal", montoFinal);
 
    
}; 

 async function mostrarMonto ()
{
    document.getElementById("get").addEventListener("click", async(event)=>{
        event.preventDefault();
       document.getElementById("007").value = `${Number(localStorage.getItem("montoFinal")).toFixed(0)} $`;

    })
};
mostrarMonto();



const divTexto = document.createElement("div");
divTexto.classList.add("textoInformativo");
divTexto.innerHTML=`
                        <strong>El saldo que solicite, va a ser acreditado en su cuenta, para poder comprar en la siguiente seccion.</strong>

                    `
                    main.appendChild(divTexto)

});
