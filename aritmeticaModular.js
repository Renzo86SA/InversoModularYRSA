function calcular() {
    let a = parseInt(document.getElementById('numero1').value);
    let n = parseInt(document.getElementById('numero2').value);

    // Función para el algoritmo extendido de Euclides
    function euclidesExtendido(a, b) {
        let r0 = a, r1 = b;
        let s0 = 1, s1 = 0;
        let t0 = 0, t1 = 1;

        while (r1 !== 0) {
            let q = Math.floor(r0 / r1);

            let temp = r0 - q * r1;
            r0 = r1;
            r1 = temp;

            temp = s0 - q * s1;
            s0 = s1;
            s1 = temp;

            temp = t0 - q * t1;
            t0 = t1;
            t1 = temp;
        }

        return { mcd: r0, x: s0, y: t0 };
    }

    let resultado = euclidesExtendido(a, n);

    // Si el MCD es 1, hay inverso modular
    if (resultado.mcd === 1) {
        let inverso = resultado.x % n;
        if (inverso < 0) {
            inverso += n;
        }

        document.getElementById('mcd').value = resultado.mcd;
        document.getElementById('coef_r').value = resultado.x;
        document.getElementById('coef_s').value = resultado.y;
        document.getElementById('inverso').value = inverso;
    } else {
        document.getElementById('mcd').value = resultado.mcd;
        document.getElementById('coef_r').value = "No hay inverso";
        document.getElementById('coef_s').value = "No hay inverso";
        document.getElementById('inverso').value = "No hay inverso";
    }
}
