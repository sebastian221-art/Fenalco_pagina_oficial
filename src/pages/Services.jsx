import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Award,
  Briefcase,
  Scale,
  GraduationCap,
  Megaphone,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Shield,
  HeartHandshake,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredSolution, setHoveredSolution] = useState(null);

  const mainServices = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Conexiones Empresariales',
      description:
        'Brindamos un espacio de encuentro y concentración con sus colegas empresarios para conocer, discutir y analizar las necesidades y experiencias de su sector, que traduce en programas y proyectos de beneficio empresarial.',
      color: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50 text-blue-600',
      hoverBorder: 'hover:border-blue-200',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Representación Gremial',
      description:
        'Nuestro objetivo misional más importante es el de respaldar y representar efectivamente sus intereses frente a cualquier institución pública o privada, en los diversos temas que puedan afectar individual o colectivamente el óptimo desempeño de su actividad comercial.',
      color: 'from-primary-500 to-primary-600',
      light: 'bg-primary-50 text-primary-600',
      hoverBorder: 'hover:border-primary-200',
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Converso',
      description:
        'CON-VERSO #SinCorbataNiTacones, el espacio de relacionamiento e intercambio de experiencias de empresarios insignia de la región.',
      color: 'from-purple-500 to-purple-600',
      light: 'bg-purple-50 text-purple-600',
      hoverBorder: 'hover:border-purple-200',
    },
  ];

  const solutions = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Vifenalco',
      description: 'Soluciones integrales para tu empresa',
      color: 'bg-blue-500',
      light: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <HeartHandshake className="w-7 h-7" />,
      title: 'Fenalcobra',
      description: 'Gestión de cobros y cartera',
      color: 'bg-green-500',
      light: 'bg-green-50 text-green-600',
    },
    {
      icon: <Lightbulb className="w-7 h-7" />,
      title: 'Fenalco Solidario',
      description: 'Responsabilidad social empresarial',
      color: 'bg-orange-500',
      light: 'bg-orange-50 text-orange-600',
    },
  ];

  const experts = [
    {
      area: 'Área Jurídica',
      icon: <Scale className="w-8 h-8" />,
      name: 'Gustavo Andrés Velásquez Velasco',
      position: 'Jefe Jurídico',
      description:
        'Fenalco Santander tiene el servicio de Asesoría Jurídica gratuita e ilimitada para nuestros afiliados.',
      details:
        'Consulte a nuestro Abogado sobre temas laborales, comerciales, administrativos, Derecho consumo, Propiedad Intelectual y Protección de Datos y resuelva de manera oportuna sus dudas e inquietudes jurídicas, en Fenalco Santander le brindamos la asesoría y el acompañamiento que requiere.',
      schedule: 'Lunes a viernes: 8 a 12 a.m. y de 2 a 6 p.m.',
      color: 'from-blue-600 to-blue-700',
      accent: 'bg-blue-50 border-blue-100 text-blue-700',
    },
    {
      area: 'Formación Empresarial',
      icon: <GraduationCap className="w-8 h-8" />,
      name: 'Leydi Cala Riatiga',
      position: 'Gerente Formación Empresarial',
      description:
        'Ofrecemos al Talento Humano la mejor opción de aprendizaje y formación, con el fin de fortalecer la productividad, conocimiento y competitividad del empresario en la región.',
      modalities: ['Seminarios', 'Diplomados', 'Conferencias', 'Cursos especializados', 'Talleres', 'Foros'],
      color: 'from-primary-600 to-primary-700',
      accent: 'bg-primary-50 border-primary-100 text-primary-700',
    },
    {
      area: 'Comunicaciones',
      icon: <Megaphone className="w-8 h-8" />,
      name: 'Fiorella Borge Rizzo',
      position: 'Gerente Comunicaciones',
      description:
        'Informamos y comunicamos las novedades actuales de interés común tales como: temas (laborales, comerciales, tributarias, administrativas) y actualidad del comercio.',
      details: 'Informes y balances sobre el comportamiento del comercio regional.',
      color: 'from-purple-600 to-purple-700',
      accent: 'bg-purple-50 border-purple-100 text-purple-700',
    },
  ];

  return (
    <div className="pt-20">
      {/* ═══════════════════════════════════════════════
          Hero — mejorado con orbes animados, badge,
          subrayado animado en título y wave inferior
      ═══════════════════════════════════════════════ */}
      <section className="relative gradient-primary py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{ left: `${12 + i * 17}%`, top: `${25 + (i % 2) * 35}%` }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge — NUEVO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-full mb-8 border border-white/20"
            >
              <Sparkles className="w-4 h-4" /> Lo que hacemos por ti
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Nuestros{' '}
              <span className="relative inline-block">
                Servicios
                {/* Subrayado animado — NUEVO */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-white/40 rounded-full origin-left"
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Soluciones completas para el desarrollo y fortalecimiento de tu empresa
            </p>
          </motion.div>
        </div>

        {/* Wave inferior — NUEVO */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-16 block">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Main Benefits — mejorado con color propio por
          servicio, borde animado y elevación en hover
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Label — NUEVO */}
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Beneficios principales
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros <span className="text-gradient">Beneficios</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Servicios principales que fortalecen tu empresa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Card con borde de color propio y elevación — MEJORADO */}
                <div className={`h-full bg-white rounded-2xl p-8 border-2 transition-all duration-300 group ${
                  hoveredService === index
                    ? `border-gray-200 shadow-2xl -translate-y-2 ${service.hoverBorder}`
                    : 'border-gray-100 shadow-sm'
                }`}>
                  {/* Icono con gradiente propio del servicio — MEJORADO */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 text-white transition-transform duration-300 shadow-lg ${
                    hoveredService === index ? 'scale-110 shadow-xl' : ''
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                    hoveredService === index ? 'text-primary-600' : 'text-gray-800'
                  }`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                  <button className={`text-primary-600 font-semibold flex items-center gap-2 transition-all duration-300 ${
                    hoveredService === index ? 'gap-3' : ''
                  }`}>
                    Descubre más
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Solutions — mejorado con icono de color propio
          por solución, hover elevación y fondo suave
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Label — NUEVO */}
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Programas especializados
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestras <span className="text-gradient">Soluciones</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Programas especializados para cada necesidad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredSolution(index)}
                onMouseLeave={() => setHoveredSolution(null)}
              >
                {/* Card con icono de color propio — MEJORADO */}
                <div className={`bg-white rounded-2xl p-8 text-center border-2 transition-all duration-300 ${
                  hoveredSolution === index
                    ? 'border-gray-100 shadow-2xl -translate-y-2'
                    : 'border-gray-100 shadow-sm'
                }`}>
                  {/* Icono con fondo de color suave que cambia a sólido — MEJORADO */}
                  <div className={`w-20 h-20 ${
                    hoveredSolution === index ? solution.color + ' !text-white shadow-xl' : solution.light
                  } rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                    hoveredSolution === index ? 'scale-110' : ''
                  }`}>
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  <button className={`text-primary-600 font-semibold inline-flex items-center gap-2 transition-all duration-300 ${
                    hoveredSolution === index ? 'gap-3' : ''
                  }`}>
                    Descubre más
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Expert Team — mejorado con:
          - Header con decoraciones internas
          - Botones de contacto más visibles
          - Schedule con color propio del área
          - Hover sutil en la card completa
          - Chips de modalidades mejorados
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Label — NUEVO */}
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Equipo especializado
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros <span className="text-gradient">Expertos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Equipo especializado para asesorarte
            </p>
          </motion.div>

          <div className="space-y-8">
            {experts.map((expert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Card con hover sutil — MEJORADO */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                  {/* Header coloreado con decoraciones internas — MEJORADO */}
                  <div className={`bg-gradient-to-r ${expert.color} p-8 text-white relative overflow-hidden`}>
                    {/* Decoraciones — NUEVO */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full blur-xl -translate-x-6 translate-y-6 pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
                      <div className="flex items-center gap-6">
                        {/* Icono con borde — MEJORADO */}
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 flex-shrink-0">
                          {expert.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold mb-1">{expert.area}</h3>
                          <p className="text-xl font-semibold text-white/90">{expert.name}</p>
                          <p className="text-white/75 text-sm">{expert.position}</p>
                        </div>
                      </div>
                      {/* Botones de contacto — MEJORADO con labels */}
                      <div className="flex gap-3 flex-shrink-0">
                        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2.5 rounded-xl backdrop-blur-sm transition-all text-sm border border-white/20 hover:shadow-md">
                          <Phone className="w-4 h-4" /> Llamar
                        </button>
                        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2.5 rounded-xl backdrop-blur-sm transition-all text-sm border border-white/20 hover:shadow-md">
                          <Mail className="w-4 h-4" /> Email
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6 font-semibold">
                      {expert.description}
                    </p>

                    {expert.details && (
                      <p className="text-gray-600 leading-relaxed mb-6">{expert.details}</p>
                    )}

                    {expert.modalities && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-700 mb-3 uppercase text-sm tracking-wide">Modalidades:</h4>
                        <div className="flex flex-wrap gap-2">
                          {expert.modalities.map((modality, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold hover:bg-primary-100 transition-colors cursor-default"
                            >
                              {modality}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {expert.schedule && (
                      /* Horario con color del área — MEJORADO */
                      <div className={`flex items-start gap-3 p-4 rounded-xl border-2 ${expert.accent}`}>
                        <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-sm uppercase tracking-wide mb-1">
                            Consultas vía telefónica
                          </p>
                          <p className="text-sm">{expert.schedule}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Projects and Agreements — mejorado con orbes,
          cards con hover y botones que enlazan a /convenios
      ═══════════════════════════════════════════════ */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Badge — NUEVO */}
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/20">
              Alianzas estratégicas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proyectos y Convenios
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Alianzas estratégicas para fortalecer tu negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Regionales',
                desc: 'Convenios y alianzas estratégicas en el Sur de Santander y la región.',
                delay: 0,
              },
              {
                title: 'Nacionales',
                desc: 'Red de convenios a nivel nacional para beneficio de nuestros afiliados.',
                delay: 0.1,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
              >
                {/* Card con hover más visible — MEJORADO */}
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-2xl p-8 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 group">
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/90 mb-6 text-lg leading-relaxed">{item.desc}</p>
                  <Link to="/convenios">
                    <Button variant="secondary" className="w-full group-hover:shadow-lg transition-shadow">
                      Conoce más
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA Section — mejorado con fondo degradado
          suave y botones con whileHover/whileTap
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-3xl p-12 text-center border-2 border-primary-100 shadow-sm"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              ¿Necesitas más información?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para asesorarte sobre cualquiera de nuestros servicios
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button variant="primary" size="lg">
                  Contactar ahora
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/convenios">
                  <Button variant="outline" size="lg">
                    Ver todos los convenios
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;