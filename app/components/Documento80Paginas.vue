<script setup>
defineProps({
  nombre: {
    type: String,
    default: 'Alejandra Klitzke Chacón'
  },
  direccion: {
    type: String,
    default: 'Calle Dolores, N.º 14 Es:1 Pl:00 Pt:01'
  },
  referenciaCatastral: {
    type: String,
    default: '56317070QA5653B0001SG'
  },
  dia: {
    type: String,
    default: '16'
  },
  mes: {
    type: String,
    default: 'Octubre'
  },
  anio: {
    type: String,
    default: '2025'
  },
  localidad: {
    type: String,
    default: 'Sevilla'
  },
  provincia: {
    type: String,
    default: 'Sevilla'
  },
  dni: {
    type: String,
    default: ''
  },
  codigoPostal: {
    type: String,
    default: '41940'
  },
  presupuesto: {
    type: String,
    default: '7.024,79 €'
  },
  potencia: {
    type: String,
    default: '5.0'
  },
  potenciaTotal: {
    type: String,
    default: '5.0'
  },
  potenciaModulos: {
    type: String,
    default: '3210'
  }
})
</script>

<template>
  <div class="contenedor-pdf">
    <div data-pdf-content class="contenedor-principal">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <div class="caja-destacada caja-instalacion">
          Instalación Solar Fotovoltaica de
          <span class="texto-rojo">{{ potencia }}</span> (kW) para Autoconsumo Individual
          con Excedentes Acogido a Compensación en Vivienda
        </div>

        <h1 class="titulo-principal">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</h1>

        <div class="tabla-info">
          <table class="tabla-datos">
            <tbody>
              <tr>
                <td class="etiqueta-tabla">Promotor</td>
                <td class="valor-tabla">
                  <span class="texto-rojo">{{ nombre }}</span>
                </td>
              </tr>
              <tr>
                <td class="etiqueta-tabla">Dirección</td>
                <td class="valor-tabla">
                  <span class="texto-rojo"
                    >{{ direccion }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="etiqueta-tabla">Autor Proyecto</td>
                <td class="valor-tabla">Eduardo Rivera Cabezas</td>
              </tr>
              <tr>
                <td class="etiqueta-tabla">Ref. Catastral</td>
                <td class="valor-tabla">
                  <span class="texto-rojo">{{ referenciaCatastral }}</span>
                </td>
              </tr>
              <tr>
                <td class="etiqueta-tabla">Fecha</td>
                <td class="valor-tabla">
                  A {{ dia }} de {{ mes }} de {{ anio }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="logos-footer">
          <img
            src="/logos/Icono renovables 1.png"
            alt="Epym"
            class="logo-pequeno"
          />
          <img
            src="/logos/Icono renovables 2.png"
            alt="EIC"
            class="logo-pequeno"
          />
          <img
            src="/logos/Icono renovables 3.png"
            alt="Junta"
            class="logo-pequeno"
          />
          <img
            src="/logos/Icono renovables 4.png"
            alt="Energia 100%"
            class="logo-pequeno"
          />
          <img
            src="/logos/Icono renovables 5.png"
            alt="Energia 100%"
            class="logo-pequeno"
          />
        </div>

        <p class="texto-pie" style="text-align:right">Página 1</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>

    <!-- Página 2: Logos (captura 2) -->
    <div data-pdf-content class="contenedor-principal no-break">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <div class="logos-footer">
          <img
            src="/logos/Icono renovables 1.png"
            alt="Epym"
            class="logo-pequeno"
          />
          <img
            src="/logos/Icono renovables 2.png"
            alt="EIC"
            class="logo-pequeno"
          />
          <img
            src="/logos/Icono renovables 3.png"
            alt="Junta"
            class="logo-pequeno"
          />
          <img
            src="/logos/Icono renovables 4.png"
            alt="Energia 100%"
            class="logo-pequeno"
          />
          <img
            src="/logos/Icono renovables 5.png"
            alt="Energia 100%"
            class="logo-pequeno"
          />
        </div>

        <p class="texto-pie" style="text-align:right">Página 2</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>

    <!-- Página 3: Índice (transcripción de la captura 3) -->
    <div data-pdf-content class="contenedor-principal no-break">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <div class="indice-seccion">
          <h2 class="titulo-indice">ÍNDICE</h2>
          <div class="indice-contenido">
            <div class="indice-item no-break"><span>1. ANTECEDENTE Y OBJETO</span><span>4</span></div>
            <div class="indice-item no-break"><span>2. IDENTIFICACIÓN DE LA OBRA</span><span>4</span></div>
            <div class="indice-item no-break"><span>2.1. TIPO DE INSTALACIÓN PROYECTADA</span><span>4</span></div>
            <div class="indice-item no-break"><span>2.2. UBICACIÓN DE LA INSTALACIÓN</span><span>5</span></div>
            <div class="indice-item no-break"><span>2.3. ACCESOS, COMUNICACIONES E INFRAESTRUCTURAS</span><span>5</span></div>
            <div class="indice-item no-break"><span>2.4. SERVICIOS Y REDES DE DISTRIBUCIÓN AFECTADAS POR LA OBRA</span><span>5</span></div>
            <div class="indice-item no-break"><span>2.5. PROMOTOR</span><span>6</span></div>
            <div class="indice-item no-break"><span>2.6. AUTOR DEL ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</span><span>6</span></div>
            <div class="indice-item no-break"><span>2.7. PRESUPUESTO TOTAL DE EJECUCIÓN DE LA OBRA</span><span>6</span></div>
            <div class="indice-item no-break"><span>2.8. PLAZO DE EJECUCIÓN</span><span>6</span></div>
            <div class="indice-item no-break"><span>2.9. NÚMERO DE TRABAJADORES</span><span>7</span></div>
            <div class="indice-item no-break"><span>2.10. JUSTIFICACIÓN ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</span><span>7</span></div>
            <div class="indice-item no-break"><span>3. NORMAS DE SEGURIDAD APLICABLES A LA OBRA</span><span>8</span></div>
            <div class="indice-item no-break"><span>4. DESCRIPCIÓN, CARACTERÍSTICAS Y PROGRAMACIÓN DE LA OBRA</span><span>8</span></div>
            <div class="indice-item no-break"><span>4.1. CARACTERÍSTICAS GENERALES DE LA OBRA</span><span>8</span></div>
            <div class="indice-item no-break"><span>4.2. FASES DE EJECUCIÓN DE LA OBRA</span><span>9</span></div>
            <div class="indice-item no-break"><span>4.3. PLANIFICACIÓN DE LA OBRA</span><span>9</span></div>
            <div class="indice-item no-break"><span>4.4. OFICIOS, MAQUINARIAS Y MEDIOS AUXILIARES PREVISTOS PARA LA EJECUCIÓN DE LA OBRA</span><span>9</span></div>
            <div class="indice-item no-break"><span>5. ANÁLISIS GENERAL DE RIESGOS Y PREVENCIÓN DE LOS MISMOS</span><span>9</span></div>
            <div class="indice-item no-break"><span>5.1. MEDIDAS PREVENTIVAS DE CARÁCTER GENERAL</span><span>10</span></div>
            <div class="indice-item no-break"><span>5.2. ANÁLISIS DE RIESGOS Y PREVENCIÓN EN LOS TRABAJOS MÁS SIGNIFICATIVOS</span><span>17</span></div>
            <div class="indice-item no-break"><span>5.2.1. Armaduras Previos</span><span>17</span></div>
            <div class="indice-item no-break"><span>5.2.2. Carga, transporte y descarga de materiales</span><span>19</span></div>
            <div class="indice-item no-break"><span>5.2.3. Trabajos en cubierta</span><span>19</span></div>
            <div class="indice-item no-break"><span>5.2.4. Herramiento Manual</span><span>20</span></div>
          </div>
        </div>

        <p class="texto-pie" style="text-align:right">Página 3</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>

    <!-- Página 4: continuación del índice (captura 4) -->
    <div data-pdf-content class="contenedor-principal no-break">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <div class="indice-seccion">
          <div class="indice-contenido">
            <div class="indice-item no-break"><span>5.2.5. Montaje de soportes para paneles fotovoltaicos</span><span>22</span></div>
            <div class="indice-item no-break"><span>5.2.6. Instalaciones eléctricas</span><span>24</span></div>
            <div class="indice-item no-break"><span>5.3. ANÁLISIS DE RIESGOS Y PREVENCIÓN EN EL EMPLEO DE MAQUINARIA</span><span>29</span></div>
            <div class="indice-item no-break"><span>5.3.1. Camión Grúa Hidráulica Telescópica</span><span>30</span></div>
            <div class="indice-item no-break"><span>5.3.2. Hormigonera</span><span>32</span></div>
            <div class="indice-item no-break"><span>5.3.3. Soldador Eléctrico</span><span>33</span></div>
            <div class="indice-item no-break"><span>5.4. ANÁLISIS DE RIESGOS Y PREVENCIÓN EN EL EMPLEO DE HERRAMIENTAS</span><span>35</span></div>
            <div class="indice-item no-break"><span>5.4.1. Máquinas herramientas</span><span>35</span></div>
            <div class="indice-item no-break"><span>5.4.2. Herramientas manuales</span><span>37</span></div>
            <div class="indice-item no-break"><span>5.4.3. Herramientas manuales eléctricas</span><span>39</span></div>
            <div class="indice-item no-break"><span>5.4.4. Medios auxiliares - Plataforma Elevadora</span><span>43</span></div>
            <div class="indice-item no-break"><span>5.4.5. Medios auxiliares-escaleras de mano</span><span>46</span></div>
            <div class="indice-item no-break"><span>6. SEÑALIZACIÓN DE LOS RIESGOS</span><span>48</span></div>
            <div class="indice-item no-break"><span>7. INSTALACIONES PROVISIONALES PARA LOS TRABAJADORES</span><span>48</span></div>
            <div class="indice-item no-break"><span>8. PREVENCIÓN ASISTENCIAL EN CASO DE ACCIDENTE LABORAL</span><span>50</span></div>
            <div class="indice-item no-break"><span>8.1. PRIMEROS AUXILIOS</span><span>50</span></div>
            <div class="indice-item no-break"><span>8.2. MEDICINA PREVENTIVA</span><span>50</span></div>
            <div class="indice-item no-break"><span>8.3. EVACUACIÓN DE ACCIDENTADOS</span><span>51</span></div>
            <div class="indice-item no-break"><span>9. OBLIGACIONES DEL PROMOTOR</span><span>52</span></div>
            <div class="indice-item no-break"><span>10. COORDINADOR EN MATERIA DE SEGURIDAD Y SALUD</span><span>52</span></div>
            <div class="indice-item no-break"><span>11. PLAN DE SEGURIDAD Y SALUD EN EL TRABAJO</span><span>54</span></div>
            <div class="indice-item no-break"><span>12. OBLIGACIONES DE CONTRATISTAS Y SUBCONTRATISTAS</span><span>54</span></div>
            <div class="indice-item no-break"><span>13. OBLIGACIONES DE LOS TRABAJADORES AUTÓNOMOS</span><span>57</span></div>
            <div class="indice-item no-break"><span>14. LIBRO DE INCIDENCIAS</span><span>59</span></div>
            <div class="indice-item no-break"><span>15. PARALIZACIÓN DE LOS TRABAJOS</span><span>59</span></div>
            <div class="indice-item no-break"><span>16. DERECHOS DE LOS TRABAJADORES</span><span>59</span></div>
            <div class="indice-item no-break"><span>17. DISPOSICIONES MÍNIMAS DE SEGURIDAD Y SALUD QUE DEBEN APLICARSE EN LAS OBRAS</span><span>60</span></div>
            <div class="indice-item no-break"><span>18. RECURSOS PREVENTIVOS Y PRESENCIA EN OBRA</span><span>60</span></div>
            <div class="indice-item no-break"><span>19. PROTOCOLO DE ACTUACIÓN EN CASO DE ACCIDENTE</span><span>62</span></div>
            <div class="indice-item no-break"><span>19.1. SECUENCIA DE ACTUACIÓN ANTE UN ACCIDENTE</span><span>62</span></div>
            <div class="indice-item no-break"><span>19.2. ACCIONES A SEGUIR EN CASO DE ACCIDENTE LABORAL</span><span>63</span></div>
            <div class="indice-item no-break"><span>19.3. COMUNICACIONES INMEDIATAS EN CASO DE ACCIDENTE LABORAL</span><span>63</span></div>
            <div class="indice-item no-break"><span>19.4. CENTROS ASISTENCIALES Y TELÉFONOS DE INTERÉS</span><span>64</span></div>
            <div class="indice-item no-break"><span>20. PREVISIONES E INFORMACIONES ÚTILES PARA LOS PREVISIBLES TRABAJOS POSTERIORES</span><span>66</span></div>
            <div class="indice-item no-break"><span>20.1. ELEMENTOS PREVISTOS PARA LA SEGURIDAD DE LOS TRABAJOS</span><span>67</span></div>
            <div class="indice-item no-break"><span>20.2. OTRAS INFORMACIONES ÚTILES PARA TRABAJOS POSTERIORES</span><span>67</span></div>
          </div>
        </div>

        <p class="texto-pie" style="text-align:right">Página 4</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>

    <!-- Página 5: Contenido (captura 5) -->
    <div data-pdf-content class="contenedor-principal no-break">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <h2 class="titulo-seccion-grande">ANTECEDENTE Y OBJETO</h2>

        <p class="parrafo-contenido">Se redacta el presente Estudio Básico de Seguridad y Salud de acuerdo con lo establecido en el apartado 2 del Artículo 4 del R.D. 1627/1997 por el que se establecen disposiciones mínimas de seguridad y salud en las obras de construcción, siendo el objetivo del mismo el de analizar los posibles riesgos que durante el proceso de ejecución de obras pudieran acontecer, y en base a los mismos establecer las medidas preventivas necesarias para proteger la integridad de las personas y los bienes, indicando y recomendando los medios y métodos que habrán de emplearse a fin de minimizar, y si es posible anular, los riesgos derivados del desarrollo de los mismos.</p>

        <p class="parrafo-contenido">Se atenderá especialmente a los trabajos de mayor riesgo, y se cuidarán las medidas para las protecciones individuales y colectivas, señalizaciones, instalaciones provisionales de obra y primeros auxilios.</p>

        <p class="parrafo-contenido">En aplicación de este Estudio Básico de Seguridad y Salud, el contratista de la obra elaborará el Plan de Seguridad y Salud en el trabajo aplicable a la obra, en el que se analizarán, estudiarán, desarrollarán y complementarán las previsiones contenidas en este estudio, en función de sus propios sistemas y medios de ejecución de la obra.</p>

        <h2 class="titulo-seccion-grande">1. IDENTIFICACIÓN DE LA OBRA</h2>

        <h3 class="titulo-subseccion">1.1. TIPO DE INSTALACIÓN PROYECTADA</h3>

        <p class="parrafo-contenido">Las obras objeto del presente Estudio Básico de Seguridad y Salud, corresponden a la ejecución de una instalación solar fotovoltaica instalada en cubierta para la producción de energía eléctrica de de una potencia total de inversores de <span class="texto-rojo">{{ potencia }} kW</span> y una potencia total instalada de módulos de <span class="texto-rojo">{{ potenciaModulos }} Wp</span> con posibilidad de volcado a red para la compensación de excedentes en la factura eléctrica.</p>

        <p class="parrafo-contenido">En la Memoria Descriptiva del Proyecto se realiza una descripción completa, tanto de las características de la instalación como de los trabajos a realizar.</p>

        <p class="texto-pie" style="text-align:right">Página 5</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>

    <!-- Página 6: Contenido (captura 6) -->
    <div data-pdf-content class="contenedor-principal no-break">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <h3 class="titulo-subseccion">1.2. UBICACIÓN DE LA INSTALACIÓN</h3>
        <p class="parrafo-contenido">A continuación, se indica el emplazamiento de la instalación proyectada:</p>

        <ul class="lista-contenido">
          <li>Dirección: <span class="texto-rojo">{{ direccion }}</span></li>
          <li>Localidad: <span class="texto-rojo">{{ localidad }}</span></li>
          <li>Provincia: <span class="texto-rojo">{{ provincia }}</span></li>
        </ul>

        <h3 class="titulo-subseccion">1.3. ACCESOS, COMUNICACIONES E INFRAESTRUCTURAS</h3>
        <p class="parrafo-contenido">No se requiere la ejecución de nuevas acometidas en el presente proyecto.</p>

        <h3 class="titulo-subseccion">1.4. SERVICIOS Y REDES DE DISTRIBUCIÓN AFECTADAS POR LA OBRA</h3>
        <p class="parrafo-contenido">Las interferencias con servicios de todo tipo son causa frecuente de accidentes, por ello se considera muy importante detectar su existencia y localización, con el fin de poder evaluar y delimitar claramente los diversos riesgos.</p>

        <p class="parrafo-contenido">Los servicios afectados de cuya existencia tengamos noticias serán correctamente ubicados y señalizados, desviándonos los mismos, si ello es posible, pero en aquellas ocasiones en que sea necesario trabajar sin dejar de dar determinado sentido, se adoptarán otras medidas preventivas reflejadas en este estudio de seguridad y salud.</p>

        <p class="parrafo-contenido">En la realización de las obras, no es necesario el corte de acceso de vehículos y de peatones en la zona de cubierta de los centros de enseñanza, salvo aquella que límite al acceso exclusivo a cubierta del personal autorizado para la obra.</p>

        <p class="texto-pie" style="text-align:right">Página 6</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>

    <!-- Página 7: Contenido (captura 7) -->
    <div data-pdf-content class="contenedor-principal no-break">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <p class="parrafo-contenido">Para las instalaciones de enlace, conexión en cuadro de contador actual, etc. que, si precisa el corte de los mismos, se procederá mediante soluciones provisionales debidamente señalizadas.</p>

        <h3 class="titulo-subseccion">1.5. PROMOTOR</h3>
        <ul class="lista-contenido">
          <li>Promotor: <span class="texto-rojo">{{ nombre }}</span></li>
          <li>DNI/CIF: <span class="texto-rojo">{{ dni }}</span></li>
          <li>Dirección: <span class="texto-rojo">{{ direccion }}</span></li>
          <li>Localidad: <span class="texto-rojo">{{ localidad }}</span></li>
          <li>Provincia: <span class="texto-rojo">{{ provincia }}</span></li>
          <li>C. postal: <span class="texto-rojo">{{ codigoPostal }}</span></li>
        </ul>

        <h3 class="titulo-subseccion">1.6. AUTOR DEL ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</h3>
        <ul class="lista-contenido">
          <li>Técnico: <span class="valor-tabla">Eduardo Rivera Cabezas</span></li>
          <li>NIF: <span class="valor-tabla">28.818.007-L</span></li>
          <li>Titulación: <span class="valor-tabla">Ingeniero Industrial</span></li>
          <li>Nº Colegiado: <span class="valor-tabla">4654</span></li>
          <li>Dirección: <span class="valor-tabla">Calle El Peñón 5</span></li>
          <li>C. postal: <span class="valor-tabla">41940</span></li>
        </ul>

        <p class="texto-pie" style="text-align:right">Página 7</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>

    <!-- Página 8: Contenido (captura 9) -->
    <div data-pdf-content class="contenedor-principal no-break">
      <div class="encabezado">
        <div class="encabezado-contenido">
          <p class="subtitulo">ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</p>
          <p class="subtitulo">INSTALACIÓN DE AUTOCONSUMO FOTOVOLTAICO</p>
        </div>
        <img src="/logo-solay.png" alt="Logo Solay" class="logo" />
      </div>

      <div class="contenido-principal">
        <ul class="lista-contenido">
          <li>Localidad: Sevilla</li>
          <li>Provincia: Sevilla</li>
        </ul>

        <h3 class="titulo-subseccion">1.7. PRESUPUESTO TOTAL DE EJECUCIÓN DE LA OBRA</h3>
        <p class="parrafo-contenido">El presupuesto de ejecución material de la obra es <span class="texto-rojo">{{ presupuesto }}</span></p>

        <h3 class="titulo-subseccion">1.8. PLAZO DE EJECUCIÓN</h3>
        <p class="parrafo-contenido">El plazo de ejecución se ha previsto que sea de una semana.</p>

        <h3 class="titulo-subseccion">1.9. NÚMERO DE TRABAJADORES</h3>
        <p class="parrafo-contenido">En base al programa de desarrollo de los trabajos incluido en el documento IX del presente proyecto, se desglosa el personal previsto para la obra, con un sistema de aproximación cada 15 días, resultando un pico máximo de diversos oficios, que se supone un total 7 jornadas de trabajo, y un volumen medio de personal de la categoría profesional lo que supone un total de 7 jornadas de trabajo, y un volumen medio de personal de la categoría profesional.</p>

        <h3 class="titulo-subseccion">1.10. JUSTIFICACIÓN ESTUDIO BÁSICO DE SEGURIDAD Y SALUD</h3>
        <p class="parrafo-contenido">El Real Decreto 1627/1997 de 24 de octubre, por el que se establecen disposiciones mínimas de seguridad y salud en las obras de construcción, establece en los supuestos previstos en el apartado 2 del Artículo 4 que que los proyectos de obra no incluidos en los supuestos previstos en el apartado 1 del mismo Artículo, el promotor está obligado a que que los proyectos de obra no incluidos en los supuestos previstos en el apartado 1 del mismo Artículo, el promotor está obligado a</p>

        <p class="parrafo-contenido">Por lo tanto, hay que comprobar que se dan todos los supuestos siguientes:</p>

        <p class="texto-pie" style="text-align:right">Página 8</p>

        <div class="pie-pagina">
          <p class="texto-pie">06 - Estudio Básico de Seguridad y Salud</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* ===== estilos base extraídos y adaptados de AutorizacionRepresentacion.vue ===== */
.contenedor-pdf {
  width: 210mm;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  font-family: "Segoe UI", Arial, sans-serif;
  color: #333;
  font-size: 17px;
}

.contenedor-principal {
  height: 297mm;
  display: flex;
  flex-direction: column;
  padding: 10mm 20mm;
  box-sizing: border-box;
  background: white;
  page-break-after: always;
  page-break-inside: avoid;
  overflow: hidden;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 18px 0;
  border-bottom: 2px solid #0066cc;
  margin-bottom: 27px;
}

.encabezado-contenido {
  flex: 1;
}

.titulo-principal {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.subtitulo {
  margin: 0;
  font-size: 18px;
  color: #666;
  text-align: left;
}

.logo {
  width: 150px;
  height: auto;
  margin-left: 15px;
  flex-shrink: 0;
}

.contenido-principal {
  line-height: 1.8;
  font-size: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.caja-destacada {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.caja-instalacion {
  margin: 8px auto 18px auto;
  width: 80%;
}

.tabla-info {
  width: 75%;
  margin: 12px auto 24px auto;
  border: 1px solid #111;
  padding: 8px;
}

.tabla-datos {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.tabla-datos td {
  padding: 6px 8px;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
}

.etiqueta-tabla {
  font-weight: bold;
  width: 28%;
  background: transparent;
}

.valor-tabla {
  text-align: left;
}

.texto-rojo {
  font-weight: bold;
}

.logos-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 40px 0 20px 0;
}

.logo-pequeno {
  height: 60px !important;
  object-fit: contain;
}

.flex-fill {
  flex: 1;
  min-height: 0;
}

.pie-pagina {
  padding: 12px 0;
  border-top: 1px solid #0066cc;
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: #000;
}

.texto-pie {
  margin: 2px 0;
}

@media print {
  .contenedor-pdf {
    width: 210mm;
    margin: 0;
  }
  
  .contenedor-principal {
    height: 297mm;
    width: 210mm;
    margin: 0;
    padding: 20mm;
    box-sizing: border-box;
  }
}

/* Reglas para evitar cortes en bloques y controlar imágenes/tablas al generar PDF */
.no-break {
  page-break-inside: avoid;
  break-inside: avoid;
}

.contenido-principal img,
.logo {
  max-width: 100%;
  height: auto;
  page-break-inside: avoid;
}

table, thead, tbody, tr, td {
  page-break-inside: avoid;
  break-inside: avoid;
}

/* Estilos para índice */
.titulo-indice {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0 0 20px 0;
  letter-spacing: 1px;
}

.indice-contenido {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.indice-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px dotted #999;
  padding: 4px 0;
  font-size: 12px;
  line-height: 1.4;
}

.indice-item span:first-child {
  flex: 0 0 auto;
  padding-right: 8px;
}

.indice-item span:last-child {
  flex: 0 0 auto;
  padding-left: 8px;
  text-align: right;
  font-weight: 500;
}

.indice-seccion {
  margin-bottom: 16px;
}

.parrafo-contenido {
  text-align: justify;
}

</style>
