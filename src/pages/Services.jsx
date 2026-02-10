import React from 'react';
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
  Lightbulb
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Services = () => {
  const mainServices = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Conexiones Empresariales',
      description: 'Brindamos un espacio de encuentro y concentración con sus colegas empresarios para conocer, discutir y analizar las necesidades y experiencias de su sector, que traduce en programas y proyectos de beneficio empresarial.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Representación Gremial',
      description: 'Nuestro objetivo misional más importante es el de respaldar y representar efectivamente sus intereses frente a cualquier institución pública o privada, en los diversos temas que puedan afectar individual o colectivamente el óptimo desempeño de su actividad comercial.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Converso',
      description: 'CON-VERSO #SinCorbataNiTacones, el espacio de relacionamiento e intercambio de experiencias de empresarios insignia de la región.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const solutions = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Vifenalco',
      description: 'Soluciones integrales para tu empresa',
      color: 'bg-blue-500'
    },
    {
      icon: <HeartHandshake className="w-7 h-7" />,
      title: 'Fenalcobra',
      description: 'Gestión de cobros y cartera',
      color: 'bg-green-500'
    },
    {
      icon: <Lightbulb className="w-7 h-7" />,
      title: 'Fenalco Solidario',
      description: 'Responsabilidad social empresarial',
      color: 'bg-orange-500'
    }
  ];

  const experts = [
    {
      area: 'Área Jurídica',
      icon: <Scale className="w-8 h-8" />,
      name: 'Gustavo Andrés Velásquez Velasco',
      position: 'Jefe Jurídico',
      description: 'Fenalco Santander tiene el servicio de Asesoría Jurídica gratuita e ilimitada para nuestros afiliados.',
      details: 'Consulte a nuestro Abogado sobre temas laborales, comerciales, administrativos, Derecho consumo, Propiedad Intelectual y Protección de Datos y resuelva de manera oportuna sus dudas e inquietudes jurídicas, en Fenalco Santander le brindamos la asesoría y el acompañamiento que requiere.',
      schedule: 'Lunes a viernes: 8 a 12 a.m. y de 2 a 6 p.m.',
      color: 'from-blue-600 to-blue-700'
    },
    {
      area: 'Formación Empresarial',
      icon: <GraduationCap className="w-8 h-8" />,
      name: 'Leydi Cala Riatiga',
      position: 'Gerente Formación Empresarial',
      description: 'Ofrecemos al Talento Humano la mejor opción de aprendizaje y formación, con el fin de fortalecer la productividad, conocimiento y competitividad del empresario en la región.',
      modalities: ['Seminarios', 'Diplomados', 'Conferencias', 'Cursos especializados', 'Talleres', 'Foros'],
      color: 'from-primary-600 to-primary-700'
    },
    {
      area: 'Comunicaciones',
      icon: <Megaphone className="w-8 h-8" />,
      name: 'Fiorella Borge Rizzo',
      position: 'Gerente Comunicaciones',
      description: 'Informamos y comunicamos las novedades actuales de interés común tales como: temas (laborales, comerciales, tributarias, administrativas) y actualidad del comercio.',
      details: 'Informes y balances sobre el comportamiento del comercio regional.',
      color: 'from-purple-600 to-purple-700'
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
              Nuestros Servicios
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Soluciones completas para el desarrollo y fortalecimiento de tu empresa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
              >
                <Card className="h-full group hover:shadow-2xl">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <button className="text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Descubre más
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
              >
                <Card className="text-center group hover:shadow-2xl">
                  <div className={`w-20 h-20 ${solution.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {solution.description}
                  </p>
                  <button className="text-primary-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Descubre más
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
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
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${expert.color} p-8 text-white`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          {expert.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold mb-2">{expert.area}</h3>
                          <p className="text-xl font-semibold text-white/90">{expert.name}</p>
                          <p className="text-white/80">{expert.position}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors">
                          <Mail className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6 font-semibold">
                      {expert.description}
                    </p>
                    
                    {expert.details && (
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {expert.details}
                      </p>
                    )}

                    {expert.modalities && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-800 mb-3">MODALIDADES:</h4>
                        <div className="flex flex-wrap gap-2">
                          {expert.modalities.map((modality, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold"
                            >
                              {modality}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {expert.schedule && (
                      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                        <Clock className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">
                            CONSULTAS VÍA TELEFÓNICA
                          </p>
                          <p className="text-gray-600">{expert.schedule}</p>
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

      {/* Projects and Agreements */}
      <section className="section-padding gradient-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proyectos y Convenios
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Alianzas estratégicas para fortalecer tu negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 transition-all">
                <h3 className="text-3xl font-bold mb-4">Regionales</h3>
                <p className="text-white/90 mb-6 text-lg">
                  Convenios y alianzas estratégicas en el Sur de Santander y la región.
                </p>
                <Button variant="secondary" className="w-full">
                  Conoce más
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 transition-all">
                <h3 className="text-3xl font-bold mb-4">Nacionales</h3>
                <p className="text-white/90 mb-6 text-lg">
                  Red de convenios a nivel nacional para beneficio de nuestros afiliados.
                </p>
                <Button variant="secondary" className="w-full">
                  Conoce más
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              ¿Necesitas más información?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para asesorarte sobre cualquiera de nuestros servicios
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg">
                Contactar ahora
              </Button>
              <Button variant="outline" size="lg">
                Ver todos los convenios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;