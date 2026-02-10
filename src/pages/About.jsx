import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users } from 'lucide-react';
import Card from '@/components/ui/Card';
import { MISSION, VISION, VALUES, BOARD_MEMBERS } from '@/utils/constants';

const About = () => {
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
              Quiénes Somos
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              El gremio líder en la representación empresarial del Sur de Santander
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full gradient-primary text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold">Nuestra Misión</h2>
                </div>
                <p className="text-lg leading-relaxed text-white/95">
                  {MISSION}
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-primary-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
                    <Eye className="w-8 h-8 text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary-600">Nuestra Visión</h2>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                  {VISION}
                </p>
              </Card>
            </motion.div>
          </div>

          {/* History Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-2xl image-placeholder overflow-hidden shadow-xl">
                [IMAGEN: Historia de Fenalco / San Gil antiguo]
              </div>
              <div>
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
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hoy continuamos comprometidos con nuestra misión de representar,
                  defender y promover el desarrollo sostenible del sector comercio
                  en todo el Sur de Santander.
                </p>
              </div>
            </div>
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
              >
                <Card className="h-full hover:shadow-primary transition-shadow duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <h3 className="font-bold text-lg text-gray-800 leading-tight">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Members */}
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
              >
                <Card className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-sm text-primary-600 font-semibold">
                    {member.position}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Únete a nuestra familia empresarial
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Forma parte del gremio más importante del Sur de Santander
            </p>
            <motion.a
              href="/afiliate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-primary-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Afiliarme ahora
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
