function dspModal(title, body) {
    var modalElement = window.modal;

    // Asignar el título y el cuerpo del modal
    document.getElementById("title_modal").innerHTML = title;
    document.getElementById("body_modal").innerHTML = body;

    // Mostrar el modal
    modalElement.showModal();

    // Desplazar el scroll hacia el modal
    modalElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
