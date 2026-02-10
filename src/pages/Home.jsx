import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, Award, Calendar, Handshake } from 'lucide-react';
import Hero from '@/components/home/Hero';
import ServiceCard from '@/components/services/ServiceCard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SERVICES, AFFILIATION_BENEFITS, VALUES } from '@/utils/constants';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Hero />

      {/* Benefits Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Por qué elegir <span className="text-gradient">Fenalco</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de tres décadas defendiendo y fortaleciendo el comercio en la región
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Crecimiento Empresarial',
                description: 'Impulsa el desarrollo de tu negocio',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Networking',
                description: 'Conecta con empresarios de la región',
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Representación',
                description: 'Defendemos tus intereses gremiales',
              },
              {
                icon: <Handshake className="w-8 h-8" />,
                title: 'Convenios',
                description: 'Descuentos y beneficios exclusivos',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center group">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding gradient-primary wave-divider relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
              <Button variant="secondary" size="lg">
                Ver todos los servicios
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
              >
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-800">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
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
                  <Button variant="secondary" size="lg">
                    Afiliarme ahora
                  </Button>
                </Link>
                <Link to="/quienes-somos">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
                  >
                    Conocer más
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Estamos aquí para{' '}
                <span className="text-gradient">ayudarte</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Visítanos en nuestras oficinas en San Gil o contáctanos para
                resolver todas tus dudas sobre afiliación y servicios.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-primary-500" />
                  <div>
                    <p className="font-semibold">Horario de atención</p>
                    <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-96 rounded-2xl image-placeholder overflow-hidden shadow-2xl">
                [IMAGEN: Oficinas Fenalco San Gil]
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
