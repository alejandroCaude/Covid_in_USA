let areas;
let codigo;
let notaInf;
window.onload = async function () {
    fondo = document.getElementById("fondo");
    fondo.addEventListener("click", mostrar);
    modal = document.getElementById("modal");
    info = document.getElementById("info");
    notasinf = document.getElementById("notas");
    notasinf.classList.add("descripcion");
    muertos = document.getElementById("muertos");
    incrementosMuer = document.getElementById("incrementosMuer");
    hospitalizaciones = document.getElementById("hospitalizaciones");
    incrementosHos = document.getElementById("incrementosHos");
    tests = document.getElementById("tests");
    incrementosTest = document.getElementById("incrementosTest");
    positivos = document.getElementById("positivos");
    incrementoPos = document.getElementById("incrementoPos");
    negativos = document.getElementById("negativos");
    incrementoNeg = document.getElementById("incrementoNeg");
    titulo = document.getElementById("titulo");
    fecha = document.getElementById("fecha");

    areas = document.getElementsByTagName('area');

    for (let i = 0; i < areas.length; i++) {
        areas[i].addEventListener("click", cargarInformacion);
    }
}

//nota de la descripcion
async function datos1(est) {
    codigo = est.dataset.cod.toLowerCase();

    let url = `https://api.covidtracking.com/v1/states/${codigo}/info.json`;
    return await fetch(url).then(response => response.json()).then(data => data);
}
// informacion
async function notas(est) {
    codigo = est.dataset.cod.toLowerCase();

    let url = `https://api.covidtracking.com/v1/states/${codigo}/current.json`;
    return await fetch(url).then(response => response.json()).then(data => data);
}
async function cargarInformacion() {
    fondo.classList.remove("oculto");
    modal.classList.remove("oculto");

    datos1Inf = await datos1(this);
    notaInf = await notas(this);



    titulo.innerHTML = datos1Inf.name;
    notasinf.innerHTML = datos1Inf.notes;
    fecha.innerHTML = (notaInf.dateChecked.split(['T'])[0]);
    muertos.innerHTML = notaInf.death;
    incrementosMuer.innerHTML = notaInf.deathIncrease;
    hospitalizaciones.innerHTML = notaInf.hospitalizedCurrently;
    incrementosHos.innerHTML = notaInf.hospitalizedIncrease;
    tests.innerHTML = notaInf.totalTestResults;
    incrementosTest.innerHTML = notaInf.totalTestResultsIncrease;
    positivos.innerHTML = notaInf.positive;
    incrementoPos.innerHTML = notaInf.positiveIncrease;
    negativos.innerHTML = notaInf.negative;
    incrementoNeg.innerHTML = notaInf.negativeIncrease;

    //poblacion total
    let url = `https://api.census.gov/data/2019/pep/charagegroups?get=POP&HISP=0&for=state:${notaInf.fips}`;
    poblacion=fetch(url).then(response => response.json()).then(data => data);
    console.log(poblacion)
    //NO hispanos total
    let url2 = `https://api.census.gov/data/2019/pep/charagegroups?get=POP&HISP=1&for=state:${notaInf.fips}`;
    Nhispanos=fetch(url2).then(response => response.json()).then(data2 => data2);
    console.log(Nhispanos)
     //hispanos total
     let url3 = `https://api.census.gov/data/2019/pep/charagegroups?get=POP&HISP=2&for=state:${notaInf.fips}`;
     hispanos=fetch(url3).then(response => response.json()).then(data3 => data3);
     console.log(hispanos)
}


function mostrar(){
    fondo.classList.add("oculto");
    modal.classList.add("oculto");
}

