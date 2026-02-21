import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, X, Phone, Mail, Sparkles, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const events = [
    {
      id: 1,
      day: '16',
      month: 'ABRIL',
      title: 'Asamblea General Ordinaria de Afiliados',
      date: '16 de Abril, 2026',
      time: '2:00 PM - 7:00 PM',
      location: 'Por definir',
      description: 'Encuentro anual donde se presentan los resultados de gestión, se aprueban presupuestos y se toman decisiones estratégicas para el gremio.',
      image: '[IMAGEN: Asamblea General]',
      color: 'from-blue-500 to-blue-600',
      accent: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      id: 2,
      day: '15-16-17',
      month: 'MAYO',
      title: 'EXPOMOTOS 2026',
      date: '15, 16 y 17 de Mayo, 2026',
      time: '11:00 AM - 7:00 PM',
      location: 'CENFER',
      description: 'La feria más importante del sector automotriz en Santander. Exhibición de las últimas novedades en motocicletas, accesorios y tecnología del sector.',
      image: '[IMAGEN: EXPOMOTOS]',
      color: 'from-red-500 to-red-600',
      accent: 'bg-red-50 border-red-200 text-red-700',
    },
    {
      id: 3,
      day: '04',
      month: 'JUNIO',
      title: 'ENLACE SANTANDER',
      date: '04 de Junio, 2026',
      time: '11:00 AM - 7:00 PM',
      location: 'CENFER',
      description: 'Evento de networking empresarial que conecta emprendedores, empresarios y marcas de la región para generar oportunidades de negocio.',
      image: '[IMAGEN: ENLACE SANTANDER]',
      color: 'from-primary-500 to-primary-600',
      accent: 'bg-primary-50 border-primary-200 text-primary-700',
    },
    {
      id: 4,
      day: '10-11-12',
      month: 'JULIO',
      title: 'Santander Sobre Ruedas 2026',
      date: '10, 11 y 12 de Julio, 2026',
      time: '9:00 AM - 7:00 PM',
      location: 'CENFER',
      description: 'Feria del sector automotriz con exhibición de vehículos nuevos y usados, accesorios, tecnología y servicios relacionados.',
      image: '[IMAGEN: Santander Sobre Ruedas]',
      color: 'from-orange-500 to-orange-600',
      accent: 'bg-orange-50 border-orange-200 text-orange-700',
    },
    {
      id: 5,
      day: '26',
      month: 'JULIO',
      title: 'Día del Tendero 2026',
      date: '26 de Julio, 2026',
      time: '11:00 AM - 7:00 PM',
      location: 'NEOMUNDO',
      description: 'Reconocimiento y celebración a los tenderos de Santander, pilares fundamentales del comercio de barrio y la economía regional.',
      image: '[IMAGEN: Día del Tendero]',
      color: 'from-yellow-500 to-yellow-600',
      accent: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    },
    {
      id: 6,
      day: '26',
      month: 'NOVIEMBRE',
      title: 'Noche De Los Mejores',
      date: '26 de Noviembre, 2026',
      time: '5:00 PM - 9:00 PM',
      location: 'NEOMUNDO - GRAN SALÓN',
      description: 'Gala de premiación que reconoce la excelencia empresarial, liderazgo y contribución al desarrollo económico de Santander.',
      image: '[IMAGEN: Noche de los Mejores]',
      color: 'from-purple-500 to-purple-600',
      accent: 'bg-purple-50 border-purple-200 text-purple-700',
    },
  ];

  return (
    <div className="pt-20">
      {/* ═══════════════════════════════════════════════
          Hero — mejorado con orbes, badge de "Agenda
          2026", subrayado animado y wave inferior
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
          {/* Partículas flotantes — NUEVO */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{ left: `${10 + i * 18}%`, top: `${30 + (i % 2) * 30}%` }}
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
              <Sparkles className="w-4 h-4" /> Agenda 2026
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Eventos{' '}
              <span className="relative inline-block">
                Fenalco
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
              Espacios de formación, networking y celebración empresarial
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
          Events Grid — mejorado con:
          - Label de sección con pill
          - Overlay de color propio en imagen
          - Badge "Ver detalles" en hover
          - Elevación mayor en hover (-translate-y-2)
          - Badge de fecha con scale en hover
      ═══════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Label — NUEVO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Próximos eventos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Agenda del <span className="text-gradient">año</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Card
                  className={`h-full group cursor-pointer transition-all duration-300 ${
                    hoveredId === event.id ? 'shadow-2xl -translate-y-2' : ''
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Imagen con overlay de color propio — MEJORADO */}
                  <div className="relative h-48 image-placeholder overflow-hidden rounded-t-2xl -m-6 mb-6">
                    {event.image}
                    {/* Overlay de color del evento — NUEVO */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-50 group-hover:opacity-65 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Badge "Ver detalles" en hover — NUEVO */}
                    <AnimatePresence>
                      {hoveredId === event.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1"
                        >
                          Ver detalles <ChevronRight className="w-3 h-3" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Badge fecha con scale en hover — MEJORADO */}
                  <div className={`inline-flex flex-col items-center bg-gradient-to-br ${event.color} text-white px-6 py-4 rounded-2xl shadow-xl mb-6 transition-transform duration-300 ${
                    hoveredId === event.id ? 'scale-105' : ''
                  }`}>
                    <span className="text-3xl font-black leading-none mb-1">{event.day}</span>
                    <span className="text-sm font-bold uppercase tracking-wider">{event.month}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary-600 transition-colors leading-tight">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500 flex-shrink-0" />
                      <span className="text-sm font-semibold">{event.location}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full group-hover:shadow-md transition-shadow"
                    onClick={(e) => { e.stopPropagation(); setSelectedEvent(event); }}
                  >
                    INFORMACIÓN
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Modal — mejorado con:
          - Spring animation (rebote natural)
          - Overlay de color del evento en header
          - Decoraciones internas animadas
          - Botón de cierre con rotación en hover
          - Highlights con colores del evento
          - Pasos de lista animados
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 30 }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header con color del evento — MEJORADO */}
                <div className={`relative bg-gradient-to-br ${selectedEvent.color} text-white p-8 rounded-t-3xl overflow-hidden`}>
                  {/* Decoraciones internas — NUEVO */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-x-10 -translate-y-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full blur-xl -translate-x-6 translate-y-6 pointer-events-none" />

                  {/* Botón cerrar con rotación hover — MEJORADO */}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:rotate-90 duration-300 z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-start gap-6 relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl text-center border border-white/20 flex-shrink-0">
                      <div className="text-4xl font-black leading-none mb-1">{selectedEvent.day}</div>
                      <div className="text-sm font-bold uppercase tracking-wide">{selectedEvent.month}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-3xl font-black mb-4 leading-snug">{selectedEvent.title}</h2>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-white/90">{selectedEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-white/90">{selectedEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-semibold text-white/90">{selectedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8">
                  {/* Imagen */}
                  <div className="h-64 image-placeholder rounded-2xl mb-6 overflow-hidden">
                    {selectedEvent.image}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-800">Sobre el evento</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{selectedEvent.description}</p>

                  {/* Highlights con color del evento — MEJORADO */}
                  <div className={`border-2 rounded-2xl p-6 mb-6 ${selectedEvent.accent}`}>
                    <h4 className="font-bold mb-4">Destacados del evento:</h4>
                    <ul className="space-y-3">
                      {[
                        'Visibilidad y posicionamiento de marca',
                        'Conexiones empresariales e informe de gestión',
                        'Panorama económico y perspectivas',
                        'Liderazgo empresarial - El arte de ser más para servir mejor',
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                            ✓
                          </div>
                          <span className="text-sm leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Botones */}
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      onClick={() => window.open('https://fenalcosantander.com.co', '_blank')}
                    >
                      CONOCE MÁS
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => window.location.href = 'tel:+576076972297'}
                    >
                      CONTÁCTANOS
                    </Button>
                  </div>

                  {/* Contacto — MEJORADO con fondo */}
                  <div className="mt-6 pt-6 border-t border-gray-100 bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 text-center">
                      <strong className="text-gray-800">Fenalco Santander</strong><br />
                      Teléfono: (607) 697 2297 EXT 120<br />
                      Cra. 20 #36 – 49 Centro, Bucaramanga, Santander
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════
          CTA — mejorado con orbes animados y botones
          con whileHover/whileTap
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
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Quieres participar en nuestros eventos?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Contáctanos para más información sobre patrocinios, stands y participación
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a href="tel:+576076972297" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button variant="secondary" size="lg" icon={<Phone className="w-5 h-5" />}>
                  Llamar ahora
                </Button>
              </motion.a>
              <motion.a href="mailto:eventos@fenalcosantander.com.co" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="ghost"
                  size="lg"
                  icon={<Mail className="w-5 h-5" />}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Enviar Email
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;