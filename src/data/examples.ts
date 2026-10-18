import { ExampleCase } from '../types/erp';

export const EXAMPLE_CASES: ExampleCase[] = [
  // 3 Casos base requeridos
  {
    id: 'inventario-diferencia',
    titulo: 'Diferencia de inventario',
    subtitulo: 'Discrepancia entre stock físico y teórico con transferencias pendientes',
    icono: 'Boxes',
    badge: 'Caso estándar',
    data: {
      modulo: 'inventario',
      descripcion:
        'Durante el recuento físico cíclico en el Almacén Central (Sector B), se detectó una discrepancia de 42 unidades menos en el artículo SKU-8842 (Válvula de presión industrial) en comparación con el stock teórico del sistema. Existen dos transferencias entre depósitos registradas el viernes que figuran con estatus "En tránsito" y el supervisor desconoce si fueron recepcionadas físicamente en la sucursal Norte o si quedaron pendientes de confirmación transaccional.',
      mensajeError: '',
      usuariosAfectados: 'Equipo de logística y almacén central (aprox. 4 personas)',
      tieneAlternativa: 'no',
      tono: 'profesional',
    },
  },
  {
    id: 'error-factura',
    titulo: 'Error al registrar factura',
    subtitulo: 'Bloqueo transaccional por periodo fiscal o validación contable',
    icono: 'FileText',
    badge: 'Caso estándar',
    data: {
      modulo: 'finanzas',
      descripcion:
        'La analista de Cuentas por Pagar intenta asentar la factura de proveedor F-2026-90412 por servicios de transporte, pero al presionar el botón "Contabilizar comprobante" el sistema bloquea la transacción y no genera el número de asiento contable. La orden de compra previa fue liberada la semana pasada, pero el departamento de auditoría cerró preliminarmente el periodo mensual hoy a primera hora.',
      mensajeError:
        'ERR-FIN-304: El periodo contable correspondiente a la fecha de contabilización se encuentra cerrado o bloqueado para contabilizaciones directas de proveedores.',
      usuariosAfectados: '1 usuario (Cuentas por Pagar)',
      tieneAlternativa: 'si',
      tono: 'conciliador',
    },
  },
  {
    id: 'solicitud-reporte',
    titulo: 'Solicitud de nuevo reporte',
    subtitulo: 'Petición de mejora funcional para consolidación comercial y margen',
    icono: 'BarChart3',
    badge: 'Caso estándar',
    data: {
      modulo: 'ventas',
      descripcion:
        'La gerencia comercial solicita un nuevo reporte dentro del ERP que consolide las ventas mensuales agrupadas por canal de distribución, cliente y familia de productos, calculando el margen de contribución bruto y con opción de exportar a Excel y PDF con subtotales automáticos. Hoy en día deben descargar dos listados de facturación y un listado de costos estándar para cruzarlos manualmente en una hoja de cálculo.',
      mensajeError: '',
      usuariosAfectados: 'Gerencia y equipo de ventas (aprox. 12 personas)',
      tieneAlternativa: 'si',
      tono: 'cercano',
    },
  },

  // Casos especiales de la guía de resolución Nagora
  {
    id: 'cliente-enojado-legal',
    titulo: 'Cliente muy enojado y amenaza legal',
    subtitulo: 'Furia por pago no acreditado, bloqueo de cuenta y amenaza de juicio',
    icono: 'AlertOctagon',
    badge: 'Alerta crítica',
    data: {
      modulo: 'finanzas',
      descripcion:
        'MENSAJE RECIBIDO DEL CLIENTE: "¡Son unos estafadores! Hace 4 días les transferí $450.000 por banco con comprobante adjunto y me acaban de frenar el despacho del camión diciendo que sigo con saldo deudor. Me están haciendo perder clientes y plata. Si en 1 hora no me acreditan la plata y no me liberan la mercadería, voy directo a Defensa del Consumidor e inicio demanda legal por daños y perjuicios con mis abogados. ¡Quiero que me atienda un gerente ya!"',
      mensajeError: 'Bloqueo de crédito automático por factura vencida',
      usuariosAfectados: 'Cliente mayorista estratégico y equipo de cobranzas',
      tieneAlternativa: 'no',
      tono: 'cercano',
    },
  },
  {
    id: 'mensaje-ambiguo',
    titulo: 'Mensaje ambiguo sin datos',
    subtitulo: 'Reporte confuso sin identificar pantalla, usuario ni error',
    icono: 'HelpCircle',
    badge: 'Ambigüedad',
    data: {
      modulo: 'otro',
      descripcion:
        'MENSAJE DEL USUARIO: "Hola chicos, no me anda nada el sistema, cuando quiero apretar el botón se me cuelga la máquina y la pantalla queda en blanco. No puedo seguir trabajando, arréglenmelo urgente."',
      mensajeError: '',
      usuariosAfectados: '1 usuario de sucursal',
      tieneAlternativa: 'desconocido',
      tono: 'conciliador',
    },
  },
  {
    id: 'devolucion-importante',
    titulo: 'Reclamo de devolución importante',
    subtitulo: 'Solicitud de reintegro de dinero por $890.000 y nota de crédito',
    icono: 'DollarSign',
    badge: 'Aprobación humana',
    data: {
      modulo: 'ventas',
      descripcion:
        'El cliente Comercializadora Los Andes nos devolvió 15 pallets de mercadería por un supuesto defecto de embalaje y exige que le reintegremos inmediatamente $890.000 a su cuenta corriente bancaria y que le emitamos la Nota de Crédito en el acto, porque de lo contrario no nos recibirá más pedidos.',
      mensajeError: '',
      usuariosAfectados: 'Área comercial y administración',
      tieneAlternativa: 'no',
      tono: 'cercano',
    },
  },
];
