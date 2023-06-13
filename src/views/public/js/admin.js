const btnCrearUsuarioM = document.getElementById("crear_usuario"),
  btnCrearUsuario = document.getElementById("btn_crear_usuario"),
  roles = JSON.parse(document.getElementById("roles").textContent),
  cargos = JSON.parse(document.getElementById("cargos").textContent),
  coordinaciones = JSON.parse(document.getElementById("coordinaciones").textContent),
  horarios = JSON.parse(document.getElementById("horarios").textContent),
  usuariosBD = JSON.parse(document.getElementById("usuariosM").textContent);

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

  // agregar opciones a formulario
  let rolesHTML = undefined,
    cargosHTML = undefined,
    coordinacionesHTML = undefined,
    horariosHTML = undefined;

  roles.roles.forEach(rol => {
    rolesHTML += '<option value="'+rol.id_rol+'">'+rol.nombre_rol+'</option>';
  });

  coordinaciones.coordinaciones.forEach(coordinacion => {
    coordinacionesHTML += '<option value="'+coordinacion.id_coordinacion+'">'+coordinacion.nombre_coordinacion+'</option>';
  });

  cargos.cargos.forEach(cargo => {
    cargosHTML += '<option value="'+cargo.id_cargo+'">'+cargo.nombre_cargo+'</option>';
  });

  horarios.horarios.forEach(horario => {
    horariosHTML += '<option value="'+horario.id_horario+'">'+horario.hora_ingreso+ " - " + horario.hora_salida +'</option>';
  });

  document.getElementById("rol_u").innerHTML = rolesHTML;
  document.getElementById("cargo_u").innerHTML = cargosHTML;
  document.getElementById("coordinacion_u").innerHTML = coordinacionesHTML;
  document.getElementById("horario_u").innerHTML = horariosHTML;
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
  alert("usuario creado");
  window.location.reload()
}





btnCrearUsuarioM.addEventListener("click", () => {

  ModalCreateUser()

})