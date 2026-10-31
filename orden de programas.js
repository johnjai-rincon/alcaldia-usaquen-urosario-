    (function () {
        'use strict';

        var CARDS_INICIAL = 3;

        var buscador = document.getElementById('buscadorCursos');
        var btnLimpiar = document.getElementById('btnLimpiar');
        var contadorEl = document.getElementById('contadorResultados');
        var sinResultados = document.getElementById('sinResultados');
        var btnVerMas = document.getElementById('btnVerMas');
        var gridContainer = document.getElementById('gridContainer');
        var chips = document.querySelectorAll('.chip-filtro');
        var countTodosEl = document.getElementById('countTodos');
        var countCursoEl = document.getElementById('countCurso');
        var countTallerEl = document.getElementById('countTaller');

        var filtroActivo = 'todos';
        var textoBusqueda = '';
        var expandido = false;

        function getCards() {
            return Array.prototype.slice.call(gridContainer.querySelectorAll('.card-curso'));
        }

        function normalizar(str) {
            return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        }

        /* Busca en el titulo, las palabras clave y el contenido de la modal, para que
           terminos del tema (ej. "turismo" cuando el titulo dice "turisticos", o el
           nombre de una unidad) tambien encuentren el programa. */
        function textoDe(card) {
            var t = card.querySelector('.card-curso-titulo');
            var d = card.querySelector('.detalle-programa');
            return normalizar((t ? t.textContent : '') + ' ' +
                (card.getAttribute('data-keywords') || '') + ' ' +
                (d ? d.textContent : ''));
        }

        function pasaBusqueda(card) {
            return textoBusqueda === '' ||
                textoDe(card).indexOf(normalizar(textoBusqueda)) !== -1;
        }

        function cumpleCriterios(card) {
            var tipo = card.getAttribute('data-tipo') || '';
            var pasaFiltro = (filtroActivo === 'todos') || (tipo === filtroActivo);
            return pasaFiltro && pasaBusqueda(card);
        }

        function actualizarContadores() {
            var total = 0, curso = 0, taller = 0;
            getCards().forEach(function (card) {
                if (!pasaBusqueda(card)) return;
                total++;
                var tipo = card.getAttribute('data-tipo') || '';
                if (tipo === 'curso') curso++;
                if (tipo === 'taller') taller++;
            });
            if (countTodosEl) countTodosEl.textContent = total;
            if (countCursoEl) countCursoEl.textContent = curso;
            if (countTallerEl) countTallerEl.textContent = taller;
        }

        function renderizar() {
            var cards = getCards();
            var visibles = cards.filter(cumpleCriterios);
            var limite = expandido ? visibles.length : CARDS_INICIAL;

            cards.forEach(function (card) {
                card.classList.add('oculta-grid');
                card.classList.remove('visible');
            });

            visibles.slice(0, limite).forEach(function (card, idx) {
                card.classList.remove('oculta-grid');
                setTimeout(function () { card.classList.add('visible'); }, idx * 55);
            });

            var mostrando = Math.min(visibles.length, limite);
            if (contadorEl) {
                contadorEl.innerHTML =
                    'Mostrando <strong>' + mostrando + '</strong> de <strong>' +
                    visibles.length + '</strong> programa' +
                    (visibles.length !== 1 ? 's' : '');
            }
            if (sinResultados) {
                sinResultados.style.display = visibles.length === 0 ? 'block' : 'none';
            }
            if (btnVerMas) {
                if (visibles.length <= CARDS_INICIAL) {
                    btnVerMas.style.display = 'none';
                } else {
                    btnVerMas.style.display = 'inline-flex';
                    var sp = btnVerMas.querySelector('span');
                    if (expandido) {
                        if (sp) sp.textContent = 'Ver menos programas';
                        btnVerMas.classList.add('expandido');
                    } else {
                        if (sp) sp.textContent = 'Ver todos los programas';
                        btnVerMas.classList.remove('expandido');
                    }
                }
            }
            actualizarContadores();
        }

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                chips.forEach(function (c) { c.classList.remove('activo'); });
                chip.classList.add('activo');
                filtroActivo = chip.getAttribute('data-filtro') || 'todos';
                expandido = false;
                renderizar();
            });
        });

        if (buscador) {
            buscador.addEventListener('input', function () {
                textoBusqueda = buscador.value.trim();
                expandido = false;
                if (btnLimpiar)
                    btnLimpiar.classList.toggle('visible', textoBusqueda.length > 0);
                renderizar();
            });
        }

        if (btnLimpiar) {
            btnLimpiar.addEventListener('click', function () {
                if (buscador) buscador.value = '';
                textoBusqueda = '';
                btnLimpiar.classList.remove('visible');
                expandido = false;
                renderizar();
            });
        }

        if (btnVerMas) {
            btnVerMas.addEventListener('click', function () {
                expandido = !expandido;
                renderizar();
                if (!expandido && gridContainer)
                    gridContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        /* ------------------------------------------------------------------
           Modal de "Mas informacion"
           ------------------------------------------------------------------ */
        var modal = document.getElementById('modalPrograma');
        var modalTipo = document.getElementById('modalProgramaTipo');
        var modalTitulo = document.getElementById('modalProgramaTitulo');
        var modalCuerpo = document.getElementById('modalProgramaCuerpo');
        var ultimoBoton = null;

        /* Cada nodo se comprueba antes de usarlo: el filtro de CKEditor en Drupal
           borra elementos del bloque (los <span> vacios, por ejemplo), y si falta
           uno no puede impedir que la modal se abra. */
        function abrirModal(card, boton) {
            if (!modal) return;
            var titulo = card.querySelector('.card-curso-titulo');
            var detalle = card.querySelector('.detalle-programa');
            var tipo = card.getAttribute('data-tipo') === 'taller' ? 'taller' : 'curso';

            if (modalTitulo) modalTitulo.textContent = titulo ? titulo.textContent.trim() : '';
            if (modalTipo) {
                modalTipo.textContent = tipo === 'taller' ? 'Taller' : 'Curso';
                modalTipo.className = 'modal-tipo badge-' + tipo;
            }
            if (modalCuerpo) modalCuerpo.innerHTML = detalle ? detalle.innerHTML : '';

            ultimoBoton = boton || null;
            modal.hidden = false;
            document.body.classList.add('modal-abierta');
            /* El foco entra a la modal para que el teclado no siga en la pagina. */
            var cerrar = modal.querySelector('.modal-cerrar');
            if (cerrar) cerrar.focus();
        }

        function cerrarModal() {
            if (!modal || modal.hidden) return;
            modal.hidden = true;
            document.body.classList.remove('modal-abierta');
            if (ultimoBoton) { ultimoBoton.focus(); ultimoBoton = null; }
        }

        /* Delegacion: las tarjetas se ocultan y se muestran, asi que no conviene
           registrar un listener por boton. */
        if (gridContainer) {
            gridContainer.addEventListener('click', function (ev) {
                var boton = ev.target.closest ? ev.target.closest('.btn-mas-info') : null;
                if (!boton) return;
                var card = boton.closest('.card-curso');
                if (card) abrirModal(card, boton);
            });
        }

        if (modal) {
            modal.addEventListener('click', function (ev) {
                if (ev.target.closest && ev.target.closest('[data-cerrar-modal]')) cerrarModal();
            });
            /* El boton de inscripcion lleva al formulario: hay que cerrar primero. */
            var irAlForm = modal.querySelector('.btn-inscripcion-modal');
            if (irAlForm) irAlForm.addEventListener('click', cerrarModal);
        }

        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape' || ev.key === 'Esc') cerrarModal();
        });

        /* Drupal agrega clase .lazyload con opacity:0 a todas las imagenes.
           Esta funcion elimina esa clase y restaura src si fue convertido a data-src. */
        function cargarImagenes() {
            var section = document.querySelector('.seccion-oferta');
            if (!section) return;
            section.querySelectorAll('img.card-curso-img').forEach(function (img) {
                var realSrc = img.getAttribute('data-src');
                if (realSrc) {
                    img.setAttribute('src', realSrc);
                    img.removeAttribute('data-src');
                }
                img.classList.remove('lazyload');
                img.classList.add('lazyloaded');
            });
        }

        function init() {
            if (!gridContainer) {
                console.warn('Oferta Alcaldia: no se encontro #gridContainer');
                return;
            }
            cargarImagenes();
            gridContainer.classList.add('js-oferta-activa');
            actualizarContadores();
            renderizar();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    })();
