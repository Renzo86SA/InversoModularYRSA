document.getElementById('generateButton').addEventListener('click', generateKeys);

function gcdExtended(a, b) {
    if (a == 0) {
        return { gcd: b, x: 0, y: 1 };
    }
    let result = gcdExtended(b % a, a);
    let x = result.y - Math.floor(b / a) * result.x;
    let y = result.x;
    return { gcd: result.gcd, x: x, y: y };
}

function modInverse(e, phi) {
    let result = gcdExtended(e, phi);
    if (result.gcd != 1) {
        return null; // Inverso modular no existe si gcd != 1
    } else {
        let modInv = (result.x % phi + phi) % phi;
        return modInv;
    }
}

function generateKeys() {
    let p = parseInt(document.getElementById('p').value);
    let q = parseInt(document.getElementById('q').value);

    if (isNaN(p) || isNaN(q) || p <= 1 || q <= 1) {
        alert("Por favor ingresa números primos válidos.");
        return;
    }

    let n = p * q;
    let phi = (p - 1) * (q - 1);

    // Elegir e (usualmente un pequeño primo como 3 o 65537)
    let e = 3;
    while (gcdExtended(e, phi).gcd != 1) {
        e++;
    }

    let d = modInverse(e, phi);

    if (d === null) {
        alert("No se pudo encontrar el inverso modular.");
        return;
    }

    // Mostrar claves en la interfaz
    document.getElementById('publicKey').value = `(${e}; ${n})`;
    document.getElementById('privateKey').value = `(${d}; ${n})`;
}

//encriptar

document.getElementById('encryptButton').addEventListener('click', encryptMessage);

function encryptMessage() {
    let message = document.getElementById('message').value;
    let publicKey = document.getElementById('publicKey').value; // Clave pública obtenida en formato (e; n)

    if (!message) {
        alert("Por favor ingresa un mensaje para encriptar.");
        return;
    }

    if (!publicKey) {
        alert("Por favor genera las claves públicas antes de encriptar.");
        return;
    }

    // Extraer los valores de e y n de la clave pública
    let [e, n] = publicKey.replace(/[()]/g, '').split(';').map(Number);

    // Encriptar el mensaje
    let encrypted = rsaEncrypt(message, e, n);
    document.getElementById('encryptedMessage').value = encrypted;
}

// Función para encriptar con RSA
function rsaEncrypt(message, e, n) {
    let encryptedMessage = [];

    for (let i = 0; i < message.length; i++) {
        let charCode = message.charCodeAt(i);
        let encryptedChar = modExp(charCode, e, n);
        encryptedMessage.push(encryptedChar);
    }

    return encryptedMessage.join(" ");
}

// Exponenciación modular
function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;

    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }

    return result;
}
