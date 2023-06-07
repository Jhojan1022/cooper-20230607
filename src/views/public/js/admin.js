const btnCrearUsuarioM = document.getElementById("crear_usuario"),

    btnCrearUsuario = document.getElementById("btn_crear_usuario")




function ModalCreateUser() {

    let html = `

  <br>
<div class='grid_form'>
  <div>
    <label for='id'>Ingrese usuario</label>
    <input type="text" id='id_u' name="id_user" required>
  </div>
  <div>
    <label for='pnombre_u'>Ingrese el primer nombre</label>
    <input type="text" id='pnombre_u' name="pnombre_u" required>
  </div>
  <div>
    <label for='snombre_u'>Ingrese el segundo nombre</label>
    <input type="text" id='snombre_u' name="snombre_u" required>
  </div>
  <div>
    <label for='papellido_u'>Ingrese el primer apellido</label>
    <input type="text" id='papellido_u' name="papellido_u" required>
  </div>
  <div>
    <label for='sapellido_u'>Ingrese el segundo apellido</label>
    <input type="text" id='sapellido_u' name="sapellido_u" required>
  </div>
  <div>
    <label for='rol_u'>Seleccione el rol del usuario</label>
    <select name="rol_u" id="rol_u" required>
      <option value="value1">Administrador</option>
      <option value="value2">Colaborador</option>
    </select>
  </div>
  <div>
    <label for='cargo_u'>Seleccione el cargo</label>
    <select name="cargo_u" id="cargo_u" required>
      <option value="value1">Auxiliar de base de datos</option>
      <option value="value2">Auxiliar de acreditación</option>
    </select>
  </div>
  <div>
    <label for='coordinacion_u'>Seleccione la coordinación</label>
    <select name="coordinacion_u" id="coordinacion_u" required>
      <option value="value1">Cuentas</option>
      <option value="value2">Recaudo</option>
    </select>
  </div>
  <div>
    <label for='horario_u'>Seleccione el horario</label>
    <select name="horario_u" id="horario_u" required>
      <option value="value1">Cuentas</option>
      <option value="value2">Recaudo</option>
    </select>
  </div>
  <div>
    <label for='contrasena'>Ingrese la contraseña</label>
    <input type="text" id='contrasena' name="contrasena" required>
  </div>
  <div style='display: flex'>
    </br></br>
    <button onclick="window.modal.close()" class="sendform">Cerrar</button>
    <button class='sendform' id="btn_crear_usuario" onclick="createUser()">Crear usuario</button>
  </div>
</div>

  `

    dspModal("Crear usuario", html)

}




function createUser() {
    const data = {
        "id_usuario": document.getElementById("id_u").value,
        "primer_nombre": document.getElementById("pnombre_u").value,
        "segundo_nombre": document.getElementById("snombre_u").value,
        "primer_apellido": document.getElementById("papellido_u").value,
        "segundo_apellido": document.getElementById("sapellido_u").value,
        "rol": document.getElementById("rol_u").value,
        "cargo": document.getElementById("cargo_u").value,
        "coordinacion": document.getElementById("coordinacion_u").value,
        "horario": document.getElementById("horario_u").value,
        "contrasena": document.getElementById("contrasena").value
    }
    fetch("/createUser", {
        method: 'POST',
        headers: data
    })
    alert("usuario creado")
}





btnCrearUsuarioM.addEventListener("click", () => {

    ModalCreateUser()

})