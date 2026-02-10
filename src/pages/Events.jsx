import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, X, Phone, Mail } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      color: 'from-blue-500 to-blue-600'
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
      color: 'from-red-500 to-red-600'
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
      color: 'from-primary-500 to-primary-600'
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
      color: 'from-orange-500 to-orange-600'
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
      color: 'from-yellow-500 to-yellow-600'
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
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative gradient-primary py-32 wave-divider">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Eventos Fenalco
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Espacios de formación, networking y celebración empresarial
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group cursor-pointer" onClick={() => setSelectedEvent(event)}>
                  {/* Image Placeholder */}
                  <div className="relative h-48 image-placeholder overflow-hidden rounded-t-2xl -m-6 mb-6">
                    {event.image}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Date Badge */}
                  <div className={`inline-flex flex-col items-center bg-gradient-to-br ${event.color} text-white px-6 py-4 rounded-2xl shadow-xl mb-6`}>
                    <span className="text-3xl font-black leading-none mb-1">
                      {event.day}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wider">
                      {event.month}
                    </span>
                  </div>

                  {/* Event Info */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="text-sm font-semibold">{event.location}</span>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                  >
                    INFORMACIÓN
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className={`relative bg-gradient-to-br ${selectedEvent.color} text-white p-8 rounded-t-3xl`}>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-start gap-6">
                    <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl text-center">
                      <div className="text-4xl font-black leading-none mb-1">
                        {selectedEvent.day}
                      </div>
                      <div className="text-sm font-bold uppercase">
                        {selectedEvent.month}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-3xl font-black mb-4">
                        {selectedEvent.title}
                      </h2>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-3" />
                          <span>{selectedEvent.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-3" />
                          <span>{selectedEvent.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-3" />
                          <span className="font-semibold">{selectedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8">
                  {/* Image */}
                  <div className="h-64 image-placeholder rounded-2xl mb-6 overflow-hidden">
                    {selectedEvent.image}
                  </div>

                  {/* Description */}
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    Sobre el evento
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedEvent.description}
                  </p>

                  {/* Highlights */}
                  <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">
                      Destacados del evento:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">✓</span>
                        <span className="text-gray-700">Visibilidad y posicionamiento de marca</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">✓</span>
                        <span className="text-gray-700">Conexiones empresariales e informe de gestión</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">✓</span>
                        <span className="text-gray-700">Panorama económico y perspectivas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">✓</span>
                        <span className="text-gray-700">Liderazgo empresarial - El arte de ser más para servir mejor</span>
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
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

                  {/* Contact Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                      <strong>Fenalco Santander</strong><br />
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

      {/* CTA Section */}
      <section className="section-padding gradient-primary">
        <div className="container-custom">
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
              <a href="tel:+576076972297">
                <Button variant="secondary" size="lg" icon={<Phone className="w-5 h-5" />}>
                  Llamar ahora
                </Button>
              </a>
              <a href="mailto:eventos@fenalcosantander.com.co">
                <Button 
                  variant="ghost" 
                  size="lg"
                  icon={<Mail className="w-5 h-5" />}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
                >
                  Enviar Email
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Events;