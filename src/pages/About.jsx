import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Heart, Users, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import { MISSION, VISION, VALUES, BOARD_MEMBERS } from '@/utils/constants';

const About = () => {
  const [expandedHistory, setExpandedHistory] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  return (
    <div className="pt-20">
      {/* ═══════════════════════════════════════════════
          Hero — mejorado con orbes animados, badge,
          subrayado animado en título y wave inferior
      ═══════════════════════════════════════════════ */}
      <section className="relative gradient-primary py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 120, 0], x: [0, 30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0], y: [0, 25, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [0, 180, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-24 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl"
          />
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.4 }}
              className="absolute w-1.5 h-1.5 bg-white/25 rounded-full"
              style={{ left: `${10 + i * 13}%`, top: `${15 + (i % 3) * 28}%` }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge — NUEVO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-full mb-8 border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              Nuestra historia y propósito
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Quiénes{' '}
              <span className="relative inline-block">
                Somos
                {/* Subrayado animado — NUEVO */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-white/40 rounded-full origin-left"
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              El gremio líder en la representación empresarial del Sur de Santander
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
          Mission & Vision — mejorado con decoraciones
          internas en Misión y hover animado en Visión
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Label de sección — NUEVO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full">
              Identidad institucional
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {/* Misión — mejorado con overlay decorativo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full gradient-primary text-white relative overflow-hidden group">
                {/* Decoraciones internas animadas — NUEVO */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full blur-xl -translate-x-5 translate-y-5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold">Nuestra Misión</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-white/95">{MISSION}</p>
                </div>
              </Card>
            </motion.div>

            {/* Visión — mejorado con hover de borde e icono */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-primary-100 hover:border-primary-300 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                    <Eye className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary-600">Nuestra Visión</h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">{VISION}</p>
              </Card>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════
              History — mejorado con badge flotante en
              imagen, marcos decorativos, estadísticas
              rápidas y botón "Leer más" expandible
          ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Imagen con decoraciones — MEJORADO */}
              <div className="relative">
                <div className="relative h-96 rounded-2xl image-placeholder overflow-hidden shadow-xl">
                  [IMAGEN: Historia de Fenalco / San Gil antiguo]
                </div>
                {/* Badge flotante — NUEVO */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-2xl px-5 py-4 border border-gray-100"
                >
                  <p className="text-3xl font-black text-primary-600 leading-none">30+</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Años de historia</p>
                </motion.div>
                {/* Marcos decorativos — NUEVO */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-primary-300 rounded-tl-xl opacity-60 pointer-events-none" />
                <div className="absolute -bottom-3 right-14 w-12 h-12 border-b-4 border-r-4 border-primary-200 rounded-br-xl opacity-40 pointer-events-none" />
              </div>

              {/* Texto — MEJORADO */}
              <div>
                {/* Label — NUEVO */}
                <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                  Nuestra trayectoria
                </span>
                <h2 className="text-4xl font-bold mb-6">
                  Más de <span className="text-gradient">30 años</span> de historia
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  FENALCO Sur de Santander ha sido el pilar fundamental del desarrollo
                  comercial en la región, representando los intereses de cientos de
                  empresarios desde su fundación.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  A lo largo de nuestra trayectoria, hemos sido testigos y protagonistas
                  del crecimiento económico de San Gil y los municipios aledaños,
                  trabajando incansablemente por el fortalecimiento del tejido empresarial.
                </p>

                {/* Párrafo expandible — NUEVO */}
                <AnimatePresence>
                  {expandedHistory && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-lg text-gray-700 leading-relaxed overflow-hidden mb-4"
                    >
                      Hoy continuamos comprometidos con nuestra misión de representar,
                      defender y promover el desarrollo sostenible del sector comercio
                      en todo el Sur de Santander.
                    </motion.p>
                  )}
                </AnimatePresence>
                {!expandedHistory && (
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Hoy continuamos comprometidos con nuestra misión de representar,
                    defender y promover el desarrollo sostenible del sector comercio
                    en todo el Sur de Santander.
                  </p>
                )}

                {/* Botón "Leer más" — NUEVO */}
                <button
                  onClick={() => setExpandedHistory(!expandedHistory)}
                  className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all mt-2 mb-8"
                >
                  {expandedHistory ? 'Ver menos' : 'Leer más sobre nuestra historia'}
                  <motion.div animate={{ rotate: expandedHistory ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Estadísticas rápidas — NUEVO */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  {[
                    { value: '500+', label: 'Afiliados' },
                    { value: '19+', label: 'Convenios' },
                    { value: '6', label: 'Eventos/año' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="text-center p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors cursor-default"
                    >
                      <p className="text-2xl font-black text-primary-600">{stat.value}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Values — mejorado con hover por card:
          bullet animado que se vuelve círculo sólido
          y borde de color al hacer hover
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        {/* Línea decorativa superior — NUEVO */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent pointer-events-none" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
              <Heart className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían nuestro actuar y compromiso con la región
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* Card con border animado — MEJORADO */}
                <div className={`h-full bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                  hoveredValue === index
                    ? 'border-primary-200 shadow-xl -translate-y-1'
                    : 'border-gray-100 shadow-sm'
                }`}>
                  <div className="flex items-start gap-3 mb-3">
                    {/* Bullet mejorado que se anima en hover — MEJORADO */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-300 ${
                      hoveredValue === index ? 'bg-primary-500' : 'bg-primary-100'
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        hoveredValue === index ? 'bg-white scale-125' : 'bg-primary-500'
                      }`} />
                    </div>
                    <h3 className={`font-bold text-lg text-gray-800 leading-tight transition-colors duration-300 ${
                      hoveredValue === index ? 'text-primary-600' : ''
                    }`}>
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-11">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Board Members — mejorado con hover que cambia
          avatar a gradiente y eleva la card
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Equipo Directivo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Liderazgo comprometido con el desarrollo empresarial de la región
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOARD_MEMBERS.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Card mejorada — MEJORADO */}
                <div className={`bg-white rounded-2xl p-6 text-center border-2 transition-all duration-300 ${
                  hoveredMember === index
                    ? 'border-primary-200 shadow-2xl -translate-y-2'
                    : 'border-gray-100 shadow-sm'
                }`}>
                  {/* Avatar con gradiente animado — MEJORADO */}
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-500 ${
                    hoveredMember === index
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 scale-110 shadow-lg shadow-primary-200'
                      : 'bg-gradient-to-br from-primary-100 to-primary-200'
                  }`}>
                    <Users className={`w-10 h-10 transition-colors duration-300 ${
                      hoveredMember === index ? 'text-white' : 'text-primary-600'
                    }`} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className={`text-sm font-semibold transition-colors duration-300 ${
                    hoveredMember === index ? 'text-primary-700' : 'text-primary-600'
                  }`}>
                    {member.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — mejorado con orbes animados y botón
          con flecha pulsante
      ═══════════════════════════════════════════════ */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -120, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Únete a nuestra familia empresarial
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Forma parte del gremio más importante del Sur de Santander
            </p>
            {/* Botón con flecha pulsante — MEJORADO */}
            <motion.a
              href="/afiliate"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-white text-primary-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all"
            >
              Afiliarme ahora
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;