function dfs(nodo, k, A, visitados, bordes) {
    for (let i = 0; i < k; ++i) {
        const str = nodo + A[i];
        if (!visitados.has(str)) {
            visitados.add(str);
            dfs(str.substr(1), k, A, visitados, bordes);
            bordes.push(i);
        }
    }
}

function deBruijn(orden, k, A) {
    const visitados = new Set();
    const bordes = [];
    const nodoInicial = A[0].repeat(orden - 1);
    dfs(nodoInicial, k, A, visitados, bordes);
    const secuencia = [];
    const longitud = Math.pow(k, orden);
    for (let i = 0; i < longitud; ++i)
        secuencia.push(A[bordes[i]]);
    secuencia.push(...nodoInicial.split(''));
    return secuencia;
}

function generarSecuencia() {
    const n = parseInt(document.getElementById('orden').value);
    const k = 2;
    const A = "01";
    const s = deBruijn(n, k, A);
    const cT = document.getElementById('contenedor-tabla');
    cT.innerHTML = '';
    const t = document.createElement('table');
    const r = document.createElement('tr');
    for (let i = 0; i < s.length; i++) {
        const c = document.createElement('td');
        c.textContent = s[i];
        r.appendChild(c);
    }
    t.appendChild(r);
    cT.appendChild(t);
    const celdas = r.querySelectorAll('td');
    let index = 0;
    setInterval(() => {
        celdas.forEach((celda, i) => {
            celda.classList.remove('pintado');
            if ((i >= index && i < index + n) || (index + n > s.length && i < (index + n) % s.length)) {
                celda.classList.add('pintado');
            }
        });
        index = (index + 1) % s.length;
    }, 80); // Reducido el intervalo a 500ms para que la celda avance más rápido

    // Limpiar la tabla del contador y el reloj
    for (let i = 1; i <= 10; i++) {
        document.getElementById("combinaciones" + i).textContent = "";
        document.getElementById("tiempo" + i).textContent = "";
    }
}

function generarCombinaciones() {
    var n = parseInt(document.getElementById("numeroN").value);
    var combinaciones = [];
    var lista = document.getElementById("resultado");
    lista.innerHTML = "";
    var tiempoInicio = performance.now();
    var tiempoActual = 0;
    var intervaloTiempo;

    // Función para generar combinaciones
    function generarCombinacion(actual, longitud) {
        if (longitud === n) {
            combinaciones.push(actual);
            return;
        }
        generarCombinacion(actual + '0', longitud + 1);
        generarCombinacion(actual + '1', longitud + 1);
    }

    // Generar combinaciones
    generarCombinacion('', 0);

    combinaciones.sort(); // Ordenar combinaciones

    var i = 0;
    var tablaCombinaciones = document.getElementById("combinaciones");
    tablaCombinaciones.innerHTML = "<tr><th>Combinaciones</th><th>Combinaciones</th><th>Combinaciones</th><th>Combinaciones</th><th>Combinaciones</th></tr>";

    var intervaloCombinaciones = setInterval(function() {
        if (i < combinaciones.length) {
            var fila = tablaCombinaciones.insertRow();
            for (var j = 0; j < 5; j++) {
                if (i < combinaciones.length) {
                    fila.insertCell(j).textContent = combinaciones[i];
                    i++;
                } else {
                    break;
                }
            }
        } else {
            clearInterval(intervaloCombinaciones);
            clearInterval(intervaloTiempo);
            var tiempoFin = performance.now();
            var tiempoTranscurrido = (tiempoFin - tiempoInicio) / 1000;
            document.getElementById("tiempo" + n).textContent = tiempoTranscurrido.toFixed(2) + " segundos";
            document.getElementById("combinaciones" + n).textContent = combinaciones.length;
        }
    }, 10);

    intervaloTiempo = setInterval(function() {
        tiempoActual = (performance.now() - tiempoInicio) / 1000;
        document.getElementById("tiempo" + n).textContent = tiempoActual.toFixed(2) + " segundos";
    }, 100); // Dejamos el intervalo de actualización del tiempo más lento
}