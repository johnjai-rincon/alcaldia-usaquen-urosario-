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

        /* Busca en el titulo, el enfasis y las palabras clave de la tarjeta,
           para que terminos del tema (ej. "turismo" cuando el titulo dice
           "turisticos") tambien encuentren el programa. */
        function textoDe(card) {
            var t = card.querySelector('.card-curso-titulo');
            var d = card.querySelector('.card-curso-enfasis');
            return normalizar((t ? t.textContent : '') + ' ' +
                (d ? d.textContent : '') + ' ' +
                (card.getAttribute('data-keywords') || ''));
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
