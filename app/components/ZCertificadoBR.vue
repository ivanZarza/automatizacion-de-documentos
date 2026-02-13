<template>
	<div class="print-wrapper" data-pdf-content>
		<article class="pagina-br">
			<header class="titulo-documento">
				<h1>CERTIFICADO DE INSTALACIÓN ELÉCTRICA DE BAJA TENSIÓN</h1>
			</header>

			<section class="seccion bloque-registro" aria-label="Registro de la instalación">
				<div class="registro-logo">
					<div class="logo-placeholder">LOGO EMPRESA</div>
				</div>

				<div class="registro-info">
					<div class="registro-fila">
						<div class="registro-label">Nº REGISTRO DE LA INSTALACIÓN (1)</div>
						<div class="registro-celdas">
							<div class="celda-codigo" data-field="registro_serie">B</div>
							<div class="celda-expand" data-field="registro_numero"></div>
							<div class="celda-codigo" data-field="registro_digito">26</div>
						</div>
					</div>

					<div class="registro-fila">
						<div class="registro-label">Nº EXPEDIENTE BAJA TENSIÓN (2)</div>
						<div class="registro-celdas">
							<div class="celda-expand" data-field="expediente_bt"></div>
						</div>
					</div>
				</div>

				<div class="registro-sello">
					<span>Sello oficial<br />Registro telemático de la Junta de Andalucía</span>
				</div>
			</section>

			<section class="seccion" aria-label="Titular de la instalación">
				<div class="barra-titulo">TITULAR DE LA INSTALACIÓN</div>

				<div class="grid-2">
					<div class="campo" data-field="titular_nombre">Nombre o Razón Social</div>
					<div class="campo" data-field="titular_nif">NIF/NIE/Otro</div>
					<div class="campo" data-field="titular_domicilio">Domicilio</div>
					<div class="campo" data-field="titular_cp">Código Postal</div>
					<div class="campo" data-field="titular_localidad">Localidad</div>
					<div class="campo triple">
						<div class="subcampo" data-field="titular_provincia">Provincia</div>
						<div class="subcampo" data-field="titular_email">Correo electrónico</div>
						<div class="subcampo" data-field="titular_telefono">Teléfono</div>
					</div>
				</div>
			</section>

			<section class="seccion" aria-label="Datos de la instalación">
				<div class="barra-titulo">DATOS DE LA INSTALACIÓN</div>

				<div class="grid-datos">
					<div class="campo" data-field="emplazamiento">Emplazamiento</div>
					<div class="campo mini" data-field="numero">Número</div>
					<div class="campo mini" data-field="bloque">Bloque</div>
					<div class="campo mini" data-field="portal">Portal</div>
					<div class="campo mini" data-field="escalera">Escalera</div>
					<div class="campo mini" data-field="piso">Piso</div>
					<div class="campo mini" data-field="puerta">Puerta</div>
				</div>

				<div class="grid-2 compacta">
					<div class="campo" data-field="localidad_instalacion">Localidad</div>
					<div class="campo doble">
						<div class="subcampo" data-field="provincia_instalacion">Provincia</div>
						<div class="subcampo" data-field="cp_instalacion">Código Postal</div>
					</div>
				</div>

				<div class="grid-2 compacta">
					<div class="campo" data-field="tipo_edificacion">Tipo de instalación (3)</div>
					<div class="campo" data-field="superficie">Superficie (m²)</div>
				</div>

				<div class="campo" data-field="generador">G.3. Generadoras y convertidores: Producción de Energía Eléctrica</div>
			</section>

			<section class="seccion" aria-label="Características generales">
				<div class="barra-titulo">CARACTERÍSTICAS GENERALES DE LA INSTALACIÓN</div>

				<div class="bloque-caracteristicas">
					<div class="columna">
						<div class="campo" data-field="caja_general">Caja General de Protección - Intensidad Nominal (A)</div>
						<div class="campo" data-field="linea_general">Línea General de Alimentación</div>
						<div class="campo" data-field="potencia_prevista">Instalación - Potencia prevista (kW)</div>
						<div class="campo" data-field="derivacion_individual">Derivación individual - Potencia prevista (kW)</div>
					</div>

					<div class="columna">
						<div class="campo" data-field="conductor_lga">Conductor de la línea general de alimentación</div>
						<div class="campo" data-field="conductor_di">Conductor de la derivación individual</div>
						<div class="campo" data-field="protecciones">Protecciones instaladas / diferencial / magnetotérmico</div>
						<div class="campo" data-field="resistencia_tierra">Resistencia puesta a tierra (Ω)</div>
					</div>
				</div>
			</section>

			<section class="seccion" aria-label="Verificación e inspección">
				<div class="barra-titulo">VERIFICACIÓN E INSPECCIÓN DE LA INSTALACIÓN</div>

				<div class="grid-2 compacta">
					<div class="campo" data-field="director_obra">Director de Obra</div>
					<div class="campo" data-field="colegio_num">Colegio Oficial / Nº Colegiado</div>
				</div>

				<div class="grid-2 compacta">
					<div class="campo" data-field="organismo_control">Organismo de Control Autorizado</div>
					<div class="campo" data-field="fecha_inspeccion">Referencia y fecha de inspección inicial favorable</div>
				</div>

				<div class="grid-2 compacta">
					<div class="campo" data-field="empresa_instaladora">Empresa Instaladora Habilitada</div>
					<div class="campo" data-field="nif_empresa">Nº de Registro / NIF</div>
				</div>

				<div class="grid-2 compacta">
					<div class="campo" data-field="instalador">Instalador en Baja Tensión</div>
					<div class="campo" data-field="nif_instalador">NIF / NIE / Otro</div>
				</div>

				<div class="campo observaciones" data-field="observaciones">Observaciones</div>
			</section>

			<section class="seccion clausula" aria-label="Cláusula de protección de datos">
				<div class="barra-titulo">CLÁUSULA DE PROTECCIÓN DE DATOS</div>
				<div class="texto-legal">
					<p>
						Cumplimiento de lo dispuesto en el Reglamento General de Protección de Datos. Esta sección queda preparada para incluir el texto legal completo y las variables finales del documento.
					</p>
				</div>
			</section>
		</article>
	</div>
</template>

<style scoped>
.print-wrapper {
	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 8mm 0;
	background: #f0f0f0;
}

.pagina-br {
	width: 210mm;
	min-height: 297mm;
	position: relative;
	background-color: #fff;
	background-image: url('/documentos-oficiales/CetificadoBPREllenable.png');
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 110% 100%;
	color: #111;
	font-family: Arial, sans-serif;
	font-size: 7.1pt;
	line-height: 1.15;
	border: 1px solid #7e7e7e;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
	padding: 14mm 11mm 11mm;
}

.titulo-documento,
.seccion,
.barra-titulo,
.campo,
.subcampo,
.registro-logo,
.registro-info,
.registro-sello,
.registro-label,
.celda-codigo,
.celda-expand,
.registro-fila,
.columna,
.texto-legal {
	box-sizing: border-box;
}

.titulo-documento {
	height: 8.2mm;
	border: 1px solid var(--guide-color);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 3.2mm;
}

.titulo-documento h1 {
	margin: 0;
	font-size: 3.8mm;
	font-weight: 700;
	letter-spacing: 0.01em;
}

.seccion {
	margin-bottom: 1.2mm;
	border: 1px solid transparent;
}

.bloque-registro {
	height: 28.4mm;
	display: grid;
	grid-template-columns: 30% 46% 24%;
	border: 1px solid var(--guide-color);
}

.registro-logo,
.registro-info {
	border-right: 1px solid var(--guide-color);
}

.registro-logo {
	display: flex;
	align-items: center;
	justify-content: center;
}

.logo-placeholder {
	font-weight: 700;
	font-size: 2.8mm;
	color: #1c3e97;
	background: rgba(255, 255, 255, 0.68);
	padding: 1mm 1.4mm;
	border-radius: 1.2mm;
}

.registro-info {
	display: flex;
	flex-direction: column;
}

.registro-fila {
	flex: 1;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid var(--guide-color);
}

.registro-fila:last-child {
	border-bottom: 0;
}

.registro-label {
	height: 6.2mm;
	padding: 1.1mm 1.4mm;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-bottom: 1px solid var(--guide-color);
	background: rgba(255, 255, 255, 0.45);
}

.registro-celdas {
	flex: 1;
	display: flex;
	min-height: 0;
}

.celda-codigo,
.celda-expand {
	border-right: 1px solid var(--guide-color);
	padding: 1mm 1.2mm;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	background: rgba(255, 255, 255, 0.3);
}

.celda-codigo {
	width: 8mm;
}

.celda-expand {
	flex: 1;
	justify-content: flex-start;
	font-weight: 400;
}

.registro-celdas > :last-child {
	border-right: 0;
}

.registro-sello {
	padding: 2.6mm 1.5mm;
	display: flex;
	justify-content: center;
	text-align: center;
	font-size: 2.2mm;
	line-height: 1.2;
	background: rgba(255, 255, 255, 0.35);
}

.barra-titulo {
	min-height: 5.2mm;
	padding: 1.1mm 1.3mm;
	display: flex;
	align-items: center;
	font-size: 2.8mm;
	font-weight: 700;
	letter-spacing: 0.01em;
	border-bottom: 1px solid var(--guide-color);
	background: rgba(255, 255, 255, 0.5);
}

.grid-2,
.grid-datos,
.bloque-caracteristicas {
	display: grid;
}

.grid-2 {
	grid-template-columns: 72% 28%;
}

.grid-2.compacta {
	grid-template-columns: 62% 38%;
}

.grid-datos {
	grid-template-columns: 2.8fr repeat(6, 1fr);
}

.bloque-caracteristicas {
	grid-template-columns: 50% 50%;
}

.columna {
	border-right: 1px solid var(--guide-color);
}

.bloque-caracteristicas .columna:last-child {
	border-right: 0;
}

.campo,
.subcampo {
	min-height: 5.1mm;
	padding: 1mm 1.2mm;
	display: flex;
	align-items: flex-start;
	border-right: 1px solid var(--guide-color);
	border-bottom: 1px solid var(--guide-color);
	background: rgba(255, 255, 255, 0.2);
}

.grid-2 > :nth-child(2n),
.grid-datos > :last-child,
.campo.triple .subcampo:last-child,
.campo.doble .subcampo:last-child {
	border-right: 0;
}

.campo.triple,
.campo.doble {
	padding: 0;
	display: grid;
}

.campo.triple {
	grid-template-columns: 1fr 1fr 1fr;
}

.campo.doble {
	grid-template-columns: 1fr 1fr;
}

.campo.mini {
	justify-content: center;
	text-align: center;
}

.observaciones {
	min-height: 9mm;
}

.clausula {
	margin-bottom: 0;
}

.texto-legal {
	min-height: 12.3mm;
	padding: 1.4mm 1.6mm;
	font-size: 1.9mm;
	line-height: 1.2;
	background: rgba(255, 255, 255, 0.35);
}

.texto-legal p {
	margin: 0;
}

[data-field] {
	color: #0a2668;
	font-weight: 600;
	text-shadow: 0 0 0.35px rgba(10, 38, 104, 0.45);
}

[data-field]:empty::before {
	content: ' ';
}


@page {
	size: A4;
	margin: 0;
}

@media print {
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		background: #fff;
	}

	.print-wrapper {
		padding: 0;
		background: #fff;
	}

	.pagina-br {
		--guide-color: transparent;
		border: 0;
		box-shadow: none;
		margin: 0 auto;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}
}
</style>
