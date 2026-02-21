import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MapPin, Tag, Sparkles, Search, X } from 'lucide-react';

const conveniosRegionales = [
  {
    id: 'futura',
    nombre: 'FUTURA',
    descripcion: 'Agencia de Seguros que busca la mejor alternativa de protección de acuerdo con las necesidades de los clientes.',
    beneficio: '4% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Seguros',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'ass',
    nombre: 'A.S.S',
    descripcion: 'Aliados en organizaciones en proyectos y servicios de formación y consultoría en Seguridad y Salud en el Trabajo, Educación Ambiental y Gestión del Riesgo. Incursionando en nuevas tecnologías como la realidad aumentada y la realidad virtual.',
    beneficio: 'Descuento especial para afiliados.',
    whatsapp: '573185840599',
    categoria: 'Consultoría',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'leeche',
    nombre: 'LEECHE',
    descripcion: 'Supermercado digital de la canasta familiar. Brinda facilidad en la forma de comprar sus productos, sin perder tiempo, sin gastar dinero de más.',
    beneficio: 'Descuento especial para afiliados.',
    whatsapp: '573185840599',
    categoria: 'Retail Digital',
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'ingesp',
    nombre: 'INGESP CONSULTING S.A.S',
    descripcion: 'Empresa de consultoría estratégica. Ayudamos a sus clientes a descubrir oportunidades, gestionar sus riesgos y proteger su patrimonio.',
    beneficio: '10% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Consultoría',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'nutriendo',
    nombre: 'LABORATORIO NUTRIENDO',
    descripcion: 'Aliado estratégico para tu organización. Cuenta con más de 10 años de experiencia acompañando y ayudando a las empresas en la construcción de un ambiente sano y saludable para sus trabajadores y colaboradores.',
    beneficio: 'Tarifa especial para afiliados.',
    whatsapp: '573185840599',
    categoria: 'Salud Empresarial',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'digitalexp',
    nombre: 'DIGITAL EXP.',
    descripcion: 'Creamos conceptos que se adaptan a cada forma de comunicar una idea o servicio. Ofrecemos servicios de desarrollo tecnológico personalizado, marketing digital, branding y motion graphics: apps móviles, plataformas web responsive, e-commerce, software empresarial a la medida, creación de contenido digital y videos con animación 2D.',
    beneficio: 'Tarifa especial para afiliados.',
    whatsapp: '573185840599',
    categoria: 'Marketing Digital',
    color: 'from-pink-500 to-pink-600',
  },
];

const conveniosNacionales = [
  {
    id: 'inelco',
    nombre: 'INELCO',
    descripcion: 'Empresa de eficiencia energética y energías renovables. Brinda financiación para el ahorro de energía de hasta un 60%, maquinaria e instalación y su respectivo mantenimiento.',
    beneficio: '4% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Energía',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    id: 'eatcloud',
    nombre: 'EATCLOUD',
    descripcion: 'A través de su operación, EatCloud busca transformar la industria de alimentos, utilizando tecnologías exponenciales para gestionar las mermas alimenticias, generando impacto económico, social y ambiental.',
    beneficio: '10% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Tecnología Alimentaria',
    color: 'from-lime-500 to-lime-600',
  },
  {
    id: 'cobre',
    nombre: 'COBRE',
    descripcion: 'Empresa de tecnología que a través de su plataforma genera cualquier tipo de dispersión con mayor eficiencia. Entre sus servicios están: pagos de nóminas, proveedores y todas las obligaciones financieras de las empresas.',
    beneficio: '15% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Fintech',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'instaleap',
    nombre: 'INSTA LEAP',
    descripcion: 'Empresa que cuenta con tecnología de última milla para los delivery. Se enfoca en brindar una sincronía total para entregas sin retraso, especializado para supermercados.',
    beneficio: '5% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Logística',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'tpaga',
    nombre: 'TPAGA',
    descripcion: 'Billetera móvil disponible para teléfonos inteligentes. Cuenta con link de cobro, código QR, consulta en tiempo real de pagos, amparada con una cuenta bancaria.',
    beneficio: 'Tarifa del 2.5% para afiliados.',
    whatsapp: '573185840599',
    categoria: 'Fintech',
    color: 'from-violet-500 to-violet-600',
  },
  {
    id: 'taxxa',
    nombre: 'TAXXA',
    descripcion: 'A través de una plataforma multidireccional brinda soluciones para personas naturales y jurídicas sobre facturación electrónica, nómina electrónica, módulo de proveedores y factoring electrónico.',
    beneficio: 'Precio diferenciador al del mercado regular para afiliados Fenalco.',
    whatsapp: '573185840599',
    categoria: 'Software Contable',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 'pipeline',
    nombre: 'PIPELINE',
    descripcion: 'Integrador de servicios logísticos y comerciales con experiencia en innovación y soluciones de comercio electrónico efectivas, flexible y técnicamente diseñadas para funcionar con cualquier oferta de producto, servicio o entorno geográfico.',
    beneficio: '10% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Logística',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'urazan',
    nombre: 'URAZAN',
    descripcion: 'Compañía especializada en prestación de servicios de alta calidad en áreas y temas de insolvencia, negociación con acreedores, crisis financieras, flujos de caja y reorganización empresarial.',
    beneficio: '10% de descuento sobre los honorarios del servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Legal & Financiero',
    color: 'from-red-500 to-red-600',
  },
  {
    id: 'mslegal',
    nombre: 'MS LEGAL',
    descripcion: 'Expertos en materia comercial, corporativa y en Protección de Datos Personales. Participación activa en el desarrollo de la normativa local y su implementación conexa con la regulación internacional.',
    beneficio: 'Del 10% al 15% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Legal',
    color: 'from-slate-500 to-slate-600',
  },
  {
    id: 'eude',
    nombre: 'EUDE',
    descripcion: 'Escuela Europea de Postgrado con enfoque de dirección y negocios, por siete años consecutivos entre las mejores business school de habla hispana. Sus áreas principales son: Logística, Marketing, Recursos Humanos, Finanzas y Dirección.',
    beneficio: 'Entre el 35% y 45% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Educación',
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: 'ceccol',
    nombre: 'CECCOL',
    descripcion: 'Su objetivo principal es trabajar de manera conjunta en la implementación, estructuración y ejecución del Plan de Gestión Ambiental de Residuos de Envases y Empaques, con la resolución 1407 del 2018 emitida por el ministerio de ambiente.',
    beneficio: '10% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Medio Ambiente',
    color: 'from-green-600 to-green-700',
  },
  {
    id: 'bankamoda',
    nombre: 'BANKAMODA',
    descripcion: 'Fintech de crédito digital para pymes de la industria de la moda que se atreven a crecer. Generan oportunidades de inclusión inteligente para micro y pequeñas empresas que hoy no tienen acceso al crédito formal.',
    beneficio: 'Tasa favorable del 2.0% y 2.1% para afiliados.',
    whatsapp: '573185840599',
    categoria: 'Fintech',
    color: 'from-rose-500 to-rose-600',
  },
  {
    id: 'checktools',
    nombre: 'CHECK TOOLS',
    descripcion: 'Procesa miles de transacciones y califica el nivel de riesgo de: certificaciones de incapacidad, auditoría de servicios médicos, reclamaciones y dispersión de medicamentos.',
    beneficio: '10% de descuento sobre el servicio adquirido.',
    whatsapp: '573185840599',
    categoria: 'Salud & Tecnología',
    color: 'from-orange-600 to-orange-700',
  },
];

// ─── Card mejorada ────────────────────────────────────────────────────────────

const ConvenioCard = ({ convenio, index }) => {
  const [hovered, setHovered] = useState(false);
  const whatsappUrl = `https://wa.me/${convenio.whatsapp}?text=Hola,%20soy%20afiliado%20de%20Fenalco%20Sur%20de%20Santander%20y%20me%20interesa%20el%20convenio%20con%20${encodeURIComponent(convenio.nombre)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
        hovered ? 'shadow-2xl -translate-y-2' : ''
      }`}
    >
      {/* Header con color — MEJORADO con decoración interna */}
      <div className={`bg-gradient-to-r ${convenio.color} p-5 relative overflow-hidden`}>
        {/* Decoración interna — NUEVO */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-6 -translate-y-6 pointer-events-none" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <h3 className="text-white font-bold text-lg leading-tight">{convenio.nombre}</h3>
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 border border-white/20">
            {convenio.categoria}
          </span>
        </div>
      </div>

      {/* Cuerpo */}
      <div className="p-5 flex flex-col gap-4 h-[calc(100%-80px)]">
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {convenio.descripcion}
        </p>

        {/* Beneficio — MEJORADO con animación en hover */}
        <motion.div
          animate={{ scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-xl p-3"
        >
          <Tag className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-green-700 text-sm font-semibold leading-snug">
            Nuestro afiliado obtendrá: {convenio.beneficio}
          </p>
        </motion.div>

        {/* Botón WhatsApp — MEJORADO con motion */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          Contacto WhatsApp
        </motion.a>
      </div>
    </motion.div>
  );
};

// ─── Página principal ─────────────────────────────────────────────────────────

const Convenios = () => {
  const [tabActiva, setTabActiva] = useState('regionales');
  const [busqueda, setBusqueda] = useState('');

  const conveniosActivos = tabActiva === 'regionales' ? conveniosRegionales : conveniosNacionales;

  // Filtro por búsqueda — NUEVO
  const conveniosFiltrados = busqueda.trim()
    ? conveniosActivos.filter(c =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      )
    : conveniosActivos;

  return (
    <div className="pt-20">
      {/* ═══════════════════════════════════════════════
          Hero — mejorado con orbes, badge, stats
          y wave inferior
      ═══════════════════════════════════════════════ */}
      <section className="relative gradient-primary py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          />
          {[...Array(5)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{ left: `${12 + i * 17}%`, top: `${25 + (i % 2) * 35}%` }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge — NUEVO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-full mb-6 border border-white/20"
            >
              <Sparkles className="w-4 h-4" /> Beneficios exclusivos para afiliados
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Nuestros{' '}
              <span className="relative inline-block">
                Convenios
                {/* Subrayado animado — NUEVO */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-1 left-0 right-0 h-1.5 bg-white/40 rounded-full origin-left"
                />
              </span>
            </h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed">
              Como afiliado de Fenalco Sur de Santander, accede a descuentos y tarifas
              preferenciales con empresas aliadas a nivel regional y nacional.
            </p>
          </motion.div>

          {/* Stats — MEJORADO con hover sutil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { value: `${conveniosRegionales.length}`, label: 'Convenios Regionales' },
              { value: `${conveniosNacionales.length}`, label: 'Convenios Nacionales' },
              { value: `${conveniosRegionales.length + conveniosNacionales.length}+`, label: 'Aliados Totales' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 cursor-default"
              >
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-white/80 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Wave inferior — NUEVO */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-16 block">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Tabs sticky ── */}
      <section className="bg-white py-6 sticky top-20 z-30 shadow-sm">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-2xl p-1.5 flex gap-1">
              {[
                { id: 'regionales', label: 'Regionales', icon: <MapPin className="w-4 h-4" />, count: conveniosRegionales.length },
                { id: 'nacionales', label: 'Nacionales', icon: <MapPin className="w-4 h-4" />, count: conveniosNacionales.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setTabActiva(tab.id); setBusqueda(''); }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    tabActiva === tab.id
                      ? 'bg-white text-primary-600 shadow-md'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors duration-300 ${
                    tabActiva === tab.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid de convenios ── */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Convenios{' '}
              <span className="text-gradient">
                {tabActiva === 'regionales' ? 'Regionales' : 'Nacionales'}
              </span>
            </h2>
            <p className="text-gray-500 text-lg mb-6">
              {tabActiva === 'regionales'
                ? 'Empresas aliadas de la región Sur de Santander'
                : 'Aliados estratégicos a nivel nacional'}
            </p>

            {/* Buscador — NUEVO */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o categoría..."
                className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-2xl text-sm focus:border-primary-400 focus:outline-none transition-colors bg-white shadow-sm"
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Resultados de búsqueda — NUEVO */}
            {busqueda && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 mt-3"
              >
                {conveniosFiltrados.length === 0
                  ? 'No se encontraron convenios'
                  : `${conveniosFiltrados.length} convenio${conveniosFiltrados.length !== 1 ? 's' : ''} encontrado${conveniosFiltrados.length !== 1 ? 's' : ''}`}
              </motion.p>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tabActiva + busqueda}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {conveniosFiltrados.length > 0 ? (
                conveniosFiltrados.map((convenio, index) => (
                  <ConvenioCard key={convenio.id} convenio={convenio} index={index} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No se encontraron convenios</p>
                  <button
                    onClick={() => setBusqueda('')}
                    className="mt-3 text-primary-600 font-semibold text-sm hover:underline"
                  >
                    Limpiar búsqueda
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Aún no eres afiliado?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Únete a Fenalco Sur de Santander y accede a todos estos beneficios exclusivos
              más representación gremial, capacitaciones y mucho más.
            </p>
            <motion.a
              href="/afiliate"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-white text-primary-600 font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
            >
              Afiliarme ahora
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Convenios;