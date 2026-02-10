import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  Users, 
  Award, 
  TrendingUp, 
  FileText,
  CheckCircle,
  Phone,
  Mail,
  Building2,
  UserCheck,
  CreditCard,
  BarChart3,
  ArrowRight,
  Download,
  Upload,
  AlertCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Affiliate = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Aumentar red de contactos',
      description: 'Conecta con empresarios de tu sector y amplía tu red profesional',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Generar nuevas conexiones empresariales',
      description: 'Accede a eventos exclusivos, ruedas de negocios y networking',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Representación Gremial',
      description: 'Defiende tus intereses ante entidades públicas y privadas',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Potenciar tu dinámica comercial',
      description: 'Herramientas y asesoría para hacer crecer tu negocio',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const requirements = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Certificado de Cámara de Comercio',
      description: 'No mayor a 30 días'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Fotocopia del RUT',
      description: 'Registro Único Tributario actualizado'
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Copia documento Representante Legal',
      description: 'Cédula por ambos lados'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Declaración de Renta',
      description: 'Del último año'
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Datos completos del formulario:', data);
    toast.success('¡Solicitud de afiliación enviada exitosamente! Pronto recibirás un correo de confirmación.');
    reset();
    setStep(1);
    setIsSubmitting(false);
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 image-placeholder">
          [IMAGEN HERO: Empresarios unidos / Handshake / Equipo]
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/95 via-primary-500/90 to-primary-700/95" />

        <div className="relative z-10 container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold mb-8"
            >
              <CheckCircle className="w-5 h-5" />
              Únete a más de 500 empresarios
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
              Haz parte de la{' '}
              <span className="text-secondary-500">fuerza</span> que une
            </h1>

            <p className="text-xl md:text-2xl text-white/95 mb-10 font-light leading-relaxed">
              Fortalece tu empresa con el respaldo del gremio más importante del Sur de Santander
            </p>

            <button
              onClick={() => document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary inline-flex items-center gap-2"
            >
              Afiliarme ahora
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Cuáles son los <span className="text-gradient">beneficios</span>?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" className="inline-flex items-center gap-2">
              <Download className="w-5 h-5" />
              Descargar portafolio de servicios
            </Button>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Requisitos para <span className="text-gradient">Afiliarse</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 text-primary-600">
                    {req.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    {req.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {req.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="formulario" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Formulario de <span className="text-gradient">Afiliación</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solicitud oficial de afiliación a FENALCO Santander
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <h3 className="text-2xl font-bold mb-6">¿Necesitas ayuda?</h3>
                <p className="text-white/90 mb-8">Carolina Chacón - Coordinadora Comercial</p>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/573185840599"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="mailto:comercial@fenalco.com.co"
                    className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email</span>
                  </a>
                </div>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= s ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {s}
                      </div>
                      {s < 4 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary-500' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                {/* Step 1: Información General */}
                {step === 1 && (
                  <Card>
                    <h3 className="text-2xl font-bold mb-6">Información General de la Empresa</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Razón Social *</label>
                        <input {...register('razonSocial', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.razonSocial && <p className="text-red-500 text-sm mt-1">{errors.razonSocial.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Nombre Comercial *</label>
                        <input {...register('nombreComercial', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.nombreComercial && <p className="text-red-500 text-sm mt-1">{errors.nombreComercial.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">NIT *</label>
                        <input {...register('nit', { required: 'Campo obligatorio' })} placeholder="123456789-0" className="input-field" />
                        {errors.nit && <p className="text-red-500 text-sm mt-1">{errors.nit.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Matrícula Mercantil N° *</label>
                        <input {...register('matriculaMercantil', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.matriculaMercantil && <p className="text-red-500 text-sm mt-1">{errors.matriculaMercantil.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Código CIIU *</label>
                        <input {...register('codigoCIIU', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.codigoCIIU && <p className="text-red-500 text-sm mt-1">{errors.codigoCIIU.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Sector *</label>
                        <select {...register('sector', { required: 'Campo obligatorio' })} className="select-field">
                          <option value="">Selecciona</option>
                          <option value="alimentos">Alimentos y Bebidas</option>
                          <option value="tecnologia">Tecnología</option>
                          <option value="textil">Textil</option>
                          <option value="construccion">Construcción</option>
                          <option value="salud">Salud</option>
                          <option value="comercio">Comercio</option>
                          <option value="servicios">Servicios</option>
                          <option value="otro">Otro</option>
                        </select>
                        {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Sub Sector</label>
                        <input {...register('subSector')} className="input-field" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">N° de Empleados *</label>
                        <input type="number" {...register('numEmpleados', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.numEmpleados && <p className="text-red-500 text-sm mt-1">{errors.numEmpleados.message}</p>}
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold mb-2">Dirección *</label>
                      <input {...register('direccion', { required: 'Campo obligatorio' })} className="input-field" />
                      {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion.message}</p>}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Ciudad *</label>
                        <input {...register('ciudad', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.ciudad && <p className="text-red-500 text-sm mt-1">{errors.ciudad.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Teléfono Fijo</label>
                        <input type="tel" {...register('telefonoFijo')} className="input-field" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Celular *</label>
                        <input type="tel" {...register('celular', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.celular && <p className="text-red-500 text-sm mt-1">{errors.celular.message}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Correo Electrónico *</label>
                        <input type="email" {...register('email', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Naturaleza del Cliente</label>
                        <select {...register('naturalezaCliente')} className="select-field">
                          <option value="">Selecciona</option>
                          <option value="persona_natural">Persona Natural</option>
                          <option value="persona_juridica">Persona Jurídica</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold mb-2">Productos o Servicios Comercializados *</label>
                      <textarea {...register('productosServicios', { required: 'Campo obligatorio' })} rows="3" className="textarea-field" />
                      {errors.productosServicios && <p className="text-red-500 text-sm mt-1">{errors.productosServicios.message}</p>}
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button type="button" onClick={nextStep}>Siguiente</Button>
                    </div>
                  </Card>
                )}

                {/* Step 2: Representante Legal y Contactos */}
                {step === 2 && (
                  <Card>
                    <h3 className="text-2xl font-bold mb-6">Representante Legal y Contactos</h3>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Representante Legal</h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Primer Nombre *</label>
                        <input {...register('repPrimerNombre', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.repPrimerNombre && <p className="text-red-500 text-sm mt-1">{errors.repPrimerNombre.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Segundo Nombre</label>
                        <input {...register('repSegundoNombre')} className="input-field" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Primer Apellido *</label>
                        <input {...register('repPrimerApellido', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.repPrimerApellido && <p className="text-red-500 text-sm mt-1">{errors.repPrimerApellido.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Segundo Apellido</label>
                        <input {...register('repSegundoApellido')} className="input-field" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Cédula *</label>
                        <input {...register('repCedula', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.repCedula && <p className="text-red-500 text-sm mt-1">{errors.repCedula.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Teléfono *</label>
                        <input type="tel" {...register('repTelefono', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.repTelefono && <p className="text-red-500 text-sm mt-1">{errors.repTelefono.message}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2">E-mail *</label>
                        <input type="email" {...register('repEmail', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.repEmail && <p className="text-red-500 text-sm mt-1">{errors.repEmail.message}</p>}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Gerente</h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="md:col-span-2">
                        <input {...register('gerente')} placeholder="Nombre completo del gerente" className="input-field" />
                      </div>
                      <div>
                        <input type="tel" {...register('gerenteTelefono')} placeholder="Teléfono" className="input-field" />
                      </div>
                      <div>
                        <input type="email" {...register('gerenteEmail')} placeholder="E-mail" className="input-field" />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Asistente de Gerencia</h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="md:col-span-2">
                        <input {...register('asistenteGerencia')} placeholder="Nombre completo" className="input-field" />
                      </div>
                      <div>
                        <input type="tel" {...register('asistenteGerenciaTelefono')} placeholder="Teléfono" className="input-field" />
                      </div>
                      <div>
                        <input type="email" {...register('asistenteGerenciaEmail')} placeholder="E-mail" className="input-field" />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Dr. Recurso Humano</h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="md:col-span-2">
                        <input {...register('recursoHumano')} placeholder="Nombre completo" className="input-field" />
                      </div>
                      <div>
                        <input type="tel" {...register('recursoHumanoTelefono')} placeholder="Teléfono" className="input-field" />
                      </div>
                      <div>
                        <input type="email" {...register('recursoHumanoEmail')} placeholder="E-mail" className="input-field" />
                      </div>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Jefe/Jefa de Cartera</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <input {...register('jefeCartera')} placeholder="Nombre completo" className="input-field" />
                      </div>
                      <div>
                        <input type="tel" {...register('jefeCarteraTelefono')} placeholder="Teléfono" className="input-field" />
                      </div>
                      <div>
                        <input type="email" {...register('jefeCarteraEmail')} placeholder="E-mail" className="input-field" />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button type="button" variant="outline" onClick={prevStep}>Anterior</Button>
                      <Button type="button" onClick={nextStep}>Siguiente</Button>
                    </div>
                  </Card>
                )}

                {/* Step 3: Referencias y Documentos */}
                {step === 3 && (
                  <Card>
                    <h3 className="text-2xl font-bold mb-6">Referencias y Documentos</h3>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" {...register('serviciosSocializados')} />
                        <span className="text-sm font-semibold">
                          ¿Le fueron socializados los servicios y beneficios contenidos en el portafolio de Fenalco Santander?
                        </span>
                      </label>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Referencias Comerciales</h4>
                    <p className="text-sm text-gray-600 mb-4">Empresas con las cuales tiene relación como cliente o proveedor</p>

                    <div className="space-y-6 mb-8">
                      <div className="border-2 border-gray-200 rounded-xl p-4">
                        <h5 className="font-bold mb-3">Referencia 1</h5>
                        <div className="grid md:grid-cols-3 gap-4">
                          <input {...register('ref1Nombre')} placeholder="Nombre empresa" className="input-field" />
                          <input {...register('ref1Direccion')} placeholder="Dirección" className="input-field" />
                          <input {...register('ref1Telefono')} placeholder="Teléfono" className="input-field" />
                        </div>
                      </div>

                      <div className="border-2 border-gray-200 rounded-xl p-4">
                        <h5 className="font-bold mb-3">Referencia 2</h5>
                        <div className="grid md:grid-cols-3 gap-4">
                          <input {...register('ref2Nombre')} placeholder="Nombre empresa" className="input-field" />
                          <input {...register('ref2Direccion')} placeholder="Dirección" className="input-field" />
                          <input {...register('ref2Telefono')} placeholder="Teléfono" className="input-field" />
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Refiera una empresa a Fenalco</h4>
                    <p className="text-sm text-gray-600 mb-4">Obtenga beneficios por referir empresas</p>

                    <div className="space-y-6 mb-8">
                      <div className="border-2 border-gray-200 rounded-xl p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input {...register('refiere1Nombre')} placeholder="Nombre" className="input-field" />
                          <input {...register('refiere1Direccion')} placeholder="Dirección" className="input-field" />
                          <input {...register('refiere1Email')} placeholder="E-mail" className="input-field" />
                          <input {...register('refiere1Telefono')} placeholder="Teléfono" className="input-field" />
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Documentos Requeridos *</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">RUT *</label>
                        <input type="file" {...register('docRUT', { required: 'Documento obligatorio' })} className="input-field" />
                        {errors.docRUT && <p className="text-red-500 text-sm mt-1">{errors.docRUT.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Cámara de Comercio (No mayor a 30 días) *</label>
                        <input type="file" {...register('docCamara', { required: 'Documento obligatorio' })} className="input-field" />
                        {errors.docCamara && <p className="text-red-500 text-sm mt-1">{errors.docCamara.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Copia documento Representante Legal *</label>
                        <input type="file" {...register('docRepresentante', { required: 'Documento obligatorio' })} className="input-field" />
                        {errors.docRepresentante && <p className="text-red-500 text-sm mt-1">{errors.docRepresentante.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Declaración de Renta del último año *</label>
                        <input type="file" {...register('docRenta', { required: 'Documento obligatorio' })} className="input-field" />
                        {errors.docRenta && <p className="text-red-500 text-sm mt-1">{errors.docRenta.message}</p>}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button type="button" variant="outline" onClick={prevStep}>Anterior</Button>
                      <Button type="button" onClick={nextStep}>Siguiente</Button>
                    </div>
                  </Card>
                )}

                {/* Step 4: Autorizaciones */}
                {step === 4 && (
                  <Card>
                    <h3 className="text-2xl font-bold mb-6">Forma de Pago y Autorizaciones</h3>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Forma de Pago</h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Periodicidad de Facturación *</label>
                        <select {...register('periodicidad', { required: 'Campo obligatorio' })} className="select-field">
                          <option value="">Selecciona</option>
                          <option value="mensual">Mensual</option>
                          <option value="trimestral">Trimestral</option>
                          <option value="semestral">Semestral</option>
                          <option value="anual">Anual</option>
                        </select>
                        {errors.periodicidad && <p className="text-red-500 text-sm mt-1">{errors.periodicidad.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Ventas Anuales *</label>
                        <input type="number" {...register('ventas', { required: 'Campo obligatorio' })} className="input-field" placeholder="Valor en pesos" />
                        {errors.ventas && <p className="text-red-500 text-sm mt-1">{errors.ventas.message}</p>}
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                      <p className="text-sm font-semibold text-gray-700">
                        <AlertCircle className="w-5 h-5 inline mr-2" />
                        Nota: La tarifa está sujeta a verificación por parte de FENALCO. La membresía se paga una única vez siempre y cuando el afiliado permanezca vinculado a Fenalco Santander.
                      </p>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Correo para Facturación Electrónica *</h4>
                    <input type="email" {...register('emailFacturacion', { required: 'Campo obligatorio' })} className="input-field mb-6" placeholder="correo@empresa.com" />
                    {errors.emailFacturacion && <p className="text-red-500 text-sm mt-1">{errors.emailFacturacion.message}</p>}

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Autorizaciones y Declaraciones</h4>

                    <div className="space-y-4 mb-6">
                      <div className="bg-gray-50 rounded-xl p-6 text-sm leading-relaxed">
                        <h5 className="font-bold mb-2">AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS</h5>
                        <p className="text-gray-700 mb-4">
                          Con el diligenciamiento y firma de este formato autorizo a LA FEDERACIÓN NACIONAL DE COMERCIANTES EMPRESARIOS – FENALCO SANTANDER (NIT 890201284-7), para que recopile, almacene y realice el tratamiento de mi información según la ley 1581 de 2012...
                        </p>
                        <label className="flex items-start gap-3">
                          <input type="checkbox" {...register('autorizacionDatos', { required: 'Debes aceptar' })} className="mt-1" />
                          <span className="font-semibold">Acepto la autorización para tratamiento de datos *</span>
                        </label>
                        {errors.autorizacionDatos && <p className="text-red-500 text-sm mt-1">{errors.autorizacionDatos.message}</p>}
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6 text-sm leading-relaxed">
                        <h5 className="font-bold mb-2">DECLARACIÓN DE ORIGEN DE BIENES Y/O FONDOS</h5>
                        <p className="text-gray-700 mb-4">
                          Declaro que mis recursos provienen del giro ordinario de mis actividades, no son fruto de ningún tipo de actividad ilícita y cumplo con las normas sobre LA/FT...
                        </p>
                        <label className="flex items-start gap-3">
                          <input type="checkbox" {...register('declaracionBienes', { required: 'Debes aceptar' })} className="mt-1" />
                          <span className="font-semibold">Acepto la declaración de origen de bienes *</span>
                        </label>
                        {errors.declaracionBienes && <p className="text-red-500 text-sm mt-1">{errors.declaracionBienes.message}</p>}
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6 text-sm leading-relaxed">
                        <h5 className="font-bold mb-2">CLÁUSULA DE PERMANENCIA</h5>
                        <p className="text-gray-700 mb-4">
                          Me comprometo a permanecer en la agremiación por el término mínimo de un (01) año, renovable automáticamente...
                        </p>
                        <label className="flex items-start gap-3">
                          <input type="checkbox" {...register('clausulaPermanencia', { required: 'Debes aceptar' })} className="mt-1" />
                          <span className="font-semibold">Acepto la cláusula de permanencia *</span>
                        </label>
                        {errors.clausulaPermanencia && <p className="text-red-500 text-sm mt-1">{errors.clausulaPermanencia.message}</p>}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold mb-4 text-primary-600">Firma Electrónica del Representante Legal</h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nombre Completo *</label>
                        <input {...register('firmaNombre', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.firmaNombre && <p className="text-red-500 text-sm mt-1">{errors.firmaNombre.message}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Cédula *</label>
                        <input {...register('firmaCedula', { required: 'Campo obligatorio' })} className="input-field" />
                        {errors.firmaCedula && <p className="text-red-500 text-sm mt-1">{errors.firmaCedula.message}</p>}
                      </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                      <label className="flex items-start gap-3">
                        <input type="checkbox" {...register('firmaConsentimiento', { required: 'Debes aceptar' })} className="mt-1" />
                        <span className="text-sm">
                          Al marcar esta casilla, confirmo que he leído y acepto todos los términos y condiciones de afiliación a FENALCO Santander. Esta firma electrónica tiene la misma validez que una firma manuscrita. *
                        </span>
                      </label>
                      {errors.firmaConsentimiento && <p className="text-red-500 text-sm mt-1">{errors.firmaConsentimiento.message}</p>}
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>Anterior</Button>
                      <Button type="submit" loading={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                      </Button>
                    </div>
                  </Card>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-primary">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Tienes dudas?</h2>
          <p className="text-xl text-white/90 mb-8">Contáctanos y resolveremos todas tus preguntas</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/573185840599" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" icon={<Phone className="w-5 h-5" />}>WhatsApp</Button>
            </a>
            <a href="mailto:comercial@fenalco.com.co">
              <Button variant="ghost" size="lg" icon={<Mail className="w-5 h-5" />} className="border-2 border-white text-white hover:bg-white hover:text-primary-600">Email</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;