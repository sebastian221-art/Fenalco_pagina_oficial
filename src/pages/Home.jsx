import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, Award, Calendar, Shield, ArrowRight, MapPin, Clock, Phone } from 'lucide-react';
import Hero from '../components/home/Hero';
import ServiceCard from '../components/services/ServiceCard';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SERVICES, VALUES } from '../utils/constants';

const Home = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Crecimiento Empresarial',
      description: 'Impulsa el desarrollo de tu negocio',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      hover: 'group-hover:bg-blue-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Networking',
      description: 'Conecta con empresarios de la región',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      hover: 'group-hover:bg-emerald-500',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Representación',
      description: 'Defendemos tus intereses gremiales',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      hover: 'group-hover:bg-violet-500',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Convenios',
      description: 'Descuentos y beneficios exclusivos',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      hover: 'group-hover:bg-orange-500',
    },
  ];

  return (
    <div className="pt-20">
      {/* ── Hero ── */}
      <Hero />

      {/* ═══════════════════════════════════════════════
          Benefits Overview — mejorado con colores por
          beneficio, hover elevación y transición de icono
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Label pill — NUEVO */}
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Por qué elegirnos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Por qué elegir <span className="text-gradient">Fenalco</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de tres décadas defendiendo y fortaleciendo el comercio en la región
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                {/* Card mejorada: elevación + color propio por beneficio */}
                <div className={`bg-white rounded-2xl p-6 text-center border-2 transition-all duration-300 group cursor-default ${
                  hoveredBenefit === index
                    ? 'border-gray-100 shadow-2xl -translate-y-2'
                    : 'border-gray-100 shadow-sm'
                }`}>
                  {/* Icono con fondo de color que cambia a sólido en hover */}
                  <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 ${item.color} transition-all duration-300 group-hover:scale-110 ${
                    hoveredBenefit === index ? `${item.hover} !text-white shadow-lg` : ''
                  }`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Services Section — mejorado con orbes animados
          y wave inferior
      ═══════════════════════════════════════════════ */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        {/* Orbes animados — NUEVO */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"
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
              Lo que ofrecemos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Soluciones integrales para el desarrollo de tu empresa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/servicios">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button variant="secondary" size="lg">
                  Ver todos los servicios
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Wave inferior — NUEVO */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-14 block">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill="#F9FAFB" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Values Section — mejorado con hover interactivo
          por card y pill de sección
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
              Lo que nos define
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los principios que guían nuestro compromiso con el sector empresarial
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.slice(0, 6).map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* Card con hover de borde y bullet animado — MEJORADO */}
                <div className={`h-full bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                  hoveredValue === index
                    ? 'border-primary-200 shadow-xl -translate-y-1'
                    : 'border-gray-100 shadow-sm'
                }`}>
                  <div className="flex items-start gap-4">
                    {/* Bullet mejorado — MEJORADO */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 transition-all duration-300 ${
                      hoveredValue === index ? 'bg-primary-500' : 'bg-primary-100'
                    }`}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        hoveredValue === index ? 'bg-white scale-125' : 'bg-primary-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                        hoveredValue === index ? 'text-primary-600' : 'text-gray-800'
                      }`}>
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA Section — mejorado con orbes y botón
          con flecha pulsante
      ═══════════════════════════════════════════════ */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          {/* Partículas — NUEVO */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -18, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
              style={{ left: `${20 + i * 20}%`, top: `${25 + (i % 2) * 40}%` }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para hacer crecer tu negocio?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Únete a la comunidad empresarial más importante del Sur de Santander
                y accede a beneficios exclusivos para tu empresa.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/afiliate">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="secondary" size="lg">
                      Afiliarme ahora
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/quienes-somos">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
                    >
                      Conocer más
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Quick Contact — mejorado con badge, stats
          y botón de WhatsApp visible
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Label — NUEVO */}
              <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                Contáctanos
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Estamos aquí para{' '}
                <span className="text-gradient">ayudarte</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Visítanos en nuestras oficinas en San Gil o contáctanos para
                resolver todas tus dudas sobre afiliación y servicios.
              </p>

              {/* Info con íconos mejorados */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <Clock className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Horario de atención</p>
                    <p className="text-gray-500 text-sm">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
                {/* Botón WhatsApp — NUEVO */}
                <a
                  href="https://wa.me/573185840599"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp directo</p>
                    <p className="text-gray-500 text-sm">+57 318 584 0599</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-[#25D366] transition-colors" />
                </a>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <MapPin className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Ubicación</p>
                    <p className="text-gray-500 text-sm">San Gil, Santander</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Imagen con badge flotante — MEJORADO */}
              <div className="relative">
                <div className="relative h-96 rounded-2xl image-placeholder overflow-hidden shadow-2xl">
                  [IMAGEN: Oficinas Fenalco San Gil]
                </div>
                {/* Badge flotante — NUEVO */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 border border-gray-100"
                >
                  <p className="text-3xl font-black text-primary-600">500+</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Empresas afiliadas</p>
                </motion.div>
                <div className="absolute -top-3 -right-3 w-14 h-14 border-t-4 border-r-4 border-primary-300 rounded-tr-xl opacity-60 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;