// Esperamos a que todo el HTML esté cargado antes de ejecutar el JS
document.addEventListener('DOMContentLoaded', function () {

    const formRegistro = document.getElementById('formRegistro');
    const contenedorMascotas = document.getElementById('contenedorMascotas');
    const btnAnadirMascota = document.getElementById('btnAnadirMascota');
    let contadorMascotas = 0;

    // Muestra un mensaje de error en el span correspondiente
    function mostrarError(idSpan, mensaje) {
        const span = document.getElementById(idSpan);
        span.textContent = mensaje;
    }

    // Limpia el mensaje de error
    function limpiarError(idSpan) {
        const span = document.getElementById(idSpan);
        span.textContent = '';
    }

    // Valida el campo Nombre Completo
    function validarNombre() {
        const input = document.getElementById('nombreCompleto');
        const valor = input.value.trim();
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        if (valor === '') {
            mostrarError('errorNombre', 'El nombre completo es obligatorio.');
            return false;
        }

        if (!soloLetras.test(valor)) {
            mostrarError('errorNombre', 'El nombre solo puede contener letras y espacios.');
            return false;
        }

        if (valor.length > 50) {
            mostrarError('errorNombre', 'El nombre no puede superar los 50 caracteres.');
            return false;
        }

        limpiarError('errorNombre');
        return true;
    }

    // Valida el campo Correo Electrónico
    function validarCorreo() {
        const input = document.getElementById('correo');
        const valor = input.value.trim();
        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (valor === '') {
            mostrarError('errorCorreo', 'El correo electrónico es obligatorio.');
            return false;
        }

        if (!formatoCorreo.test(valor)) {
            mostrarError('errorCorreo', 'Ingresa un correo con formato válido (ej: usuario@duoc.cl).');
            return false;
        }

        if (!valor.toLowerCase().endsWith('@duoc.cl')) {
            mostrarError('errorCorreo', 'Solo se aceptan correos institucionales @duoc.cl.');
            return false;
        }

        limpiarError('errorCorreo');
        return true;
    }

    // Valida el campo Contraseña
    function validarContrasena() {
        const input = document.getElementById('contrasena');
        const valor = input.value;

        if (valor === '') {
            mostrarError('errorContrasena', 'La contraseña es obligatoria.');
            return false;
        }

        if (valor.length < 8) {
            mostrarError('errorContrasena', 'La contraseña debe tener al menos 8 caracteres.');
            return false;
        }

        if (!/[A-Z]/.test(valor)) {
            mostrarError('errorContrasena', 'Debe incluir al menos una letra mayúscula.');
            return false;
        }

        if (!/[a-z]/.test(valor)) {
            mostrarError('errorContrasena', 'Debe incluir al menos una letra minúscula.');
            return false;
        }

        if (!/[0-9]/.test(valor)) {
            mostrarError('errorContrasena', 'Debe incluir al menos un número.');
            return false;
        }

        if (!/[@#$%^&+=!*.]/.test(valor)) {
            mostrarError('errorContrasena', 'Debe incluir al menos un carácter especial (ej: @#$%).');
            return false;
        }

        limpiarError('errorContrasena');
        return true;
    }

    // Valida que las contraseñas coincidan
    function validarConfirmarContrasena() {
        const contrasena = document.getElementById('contrasena').value;
        const confirmar = document.getElementById('confirmarContrasena').value;

        if (confirmar === '') {
            mostrarError('errorConfirmarContrasena', 'Debes confirmar la contraseña.');
            return false;
        }

        if (contrasena !== confirmar) {
            mostrarError('errorConfirmarContrasena', 'Las contraseñas no coinciden.');
            return false;
        }

        limpiarError('errorConfirmarContrasena');
        return true;
    }

    // Valida el campo Teléfono (opcional)
    function validarTelefono() {
        const input = document.getElementById('telefono');
        const valor = input.value.trim();

        if (valor === '') {
            limpiarError('errorTelefono');
            return true;
        }

        const formatoTelefono = /^\+?[0-9\s]{8,15}$/;

        if (!formatoTelefono.test(valor)) {
            mostrarError('errorTelefono', 'Ingresa un número de teléfono válido (ej: +56912345678).');
            return false;
        }

        limpiarError('errorTelefono');
        return true;
    }

    // Crea un nuevo bloque de mascota y lo agrega al contenedor
    function agregarMascota() {
        contadorMascotas++;
        const idUnico = contadorMascotas;

        const div = document.createElement('div');
        div.className = 'mascota-item';
        div.setAttribute('data-id', idUnico);

        div.innerHTML = `
            <div class="form-group">
                <label for="nombreMascota${idUnico}">Nombre de la mascota</label>
                <input 
                    type="text" 
                    id="nombreMascota${idUnico}" 
                    class="input-nombre-mascota"
                    maxlength="50"
                    placeholder="Ej: Firulais">
                <span class="error-mensaje" id="errorNombreMascota${idUnico}"></span>
            </div>

            <div class="form-group">
                <label for="tipoMascota${idUnico}">Tipo de mascota</label>
                <select id="tipoMascota${idUnico}" class="input-tipo-mascota">
                    <option value="">-- Seleccione un tipo --</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Otro">Otro</option>
                </select>
                <span class="error-mensaje" id="errorTipoMascota${idUnico}"></span>
            </div>

            <button type="button" class="btn-eliminar">Eliminar</button>
        `;

        contenedorMascotas.appendChild(div);

        const btnEliminar = div.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', function () {
            div.remove();
        });
    }

    // Conecta el botón "Añadir Nuevo Registro" con la función de crear mascota
    btnAnadirMascota.addEventListener('click', agregarMascota);

    // Agrega una mascota por defecto al cargar la página
    agregarMascota();

    // Evento que se dispara al hacer clic en "Registrar"
    formRegistro.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const nombreValido = validarNombre();
        const correoValido = validarCorreo();
        const contrasenaValida = validarContrasena();
        const confirmarValida = validarConfirmarContrasena();
        const telefonoValido = validarTelefono();
        const mascotasValidas = validarMascotas();

        if (nombreValido && correoValido && contrasenaValida && confirmarValida && telefonoValido && mascotasValidas) {
            alert('¡Registro exitoso! Bienvenido a Guau&Miau 🐾');
            formRegistro.reset();
        }

            // Valida que cada bloque de mascota tenga nombre y tipo completos
    function validarMascotas() {
        const bloques = contenedorMascotas.querySelectorAll('.mascota-item');
        let todasValidas = true;

        if (bloques.length === 0) {
            todasValidas = false;
        }

        bloques.forEach(function (bloque) {
            const idUnico = bloque.getAttribute('data-id');
            const inputNombre = bloque.querySelector('.input-nombre-mascota');
            const selectTipo = bloque.querySelector('.input-tipo-mascota');

            const nombreValor = inputNombre.value.trim();
            const tipoValor = selectTipo.value;

            if (nombreValor === '') {
                mostrarError('errorNombreMascota' + idUnico, 'El nombre de la mascota es obligatorio.');
                todasValidas = false;
            } else if (nombreValor.length > 50) {
                mostrarError('errorNombreMascota' + idUnico, 'Máximo 50 caracteres.');
                todasValidas = false;
            } else {
                limpiarError('errorNombreMascota' + idUnico);
            }

            if (tipoValor === '') {
                mostrarError('errorTipoMascota' + idUnico, 'Debes seleccionar un tipo de mascota.');
                todasValidas = false;
            } else {
                limpiarError('errorTipoMascota' + idUnico);
            }
        });

        return todasValidas;
    }
    });

});