import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import {
  Users, Award, TrendingUp, BarChart3,
  FileText, Building2, UserCheck, CreditCard,
  Phone, Mail, ArrowRight, Download, CheckCircle,
  AlertCircle, ChevronRight, Landmark, Copy,
  Check, X, Info, Sparkles, Save, Clock,
  Shield, Zap, Star, Heart
} from 'lucide-react';

const BENEFITS = [
  { icon: <Users className="w-7 h-7" />, title: 'Aumentar red de contactos', desc: 'Conecta con empresarios de tu sector y amplía tu red profesional en la región.', color: 'bg-blue-500', light: 'bg-blue-50 text-blue-600' },
  { icon: <TrendingUp className="w-7 h-7" />, title: 'Conexiones empresariales', desc: 'Accede a eventos exclusivos, ruedas de negocios y espacios de networking.', color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-600' },
  { icon: <Award className="w-7 h-7" />, title: 'Representación Gremial', desc: 'Defendemos tus intereses ante entidades públicas y privadas de la región.', color: 'bg-violet-500', light: 'bg-violet-50 text-violet-600' },
  { icon: <BarChart3 className="w-7 h-7" />, title: 'Potencia tu negocio', desc: 'Herramientas, asesoría jurídica y formación continua para crecer.', color: 'bg-orange-500', light: 'bg-orange-50 text-orange-600' },
];

const REQUIREMENTS = [
  { icon: <Building2 className="w-5 h-5" />, title: 'Certificado de Cámara de Comercio', note: 'No mayor a 30 días' },
  { icon: <FileText className="w-5 h-5" />, title: 'Fotocopia del RUT', note: 'Registro Único Tributario actualizado' },
  { icon: <UserCheck className="w-5 h-5" />, title: 'Cédula Representante Legal', note: 'Copia por ambos lados' },
  { icon: <CreditCard className="w-5 h-5" />, title: 'Declaración de Renta', note: 'Del último año fiscal' },
];

const BANK_ACCOUNTS = [
  { bank: 'Bancolombia', type: 'Cuenta de Ahorros', number: '32275797846', color: 'from-yellow-400 to-yellow-500' },
  { bank: 'Banco Caja Social', type: 'Cuenta de Ahorros', number: '24081202128', color: 'from-red-500 to-red-600' },
];

const STEPS = [
  { num: 1, label: 'Empresa', icon: <Building2 className="w-4 h-4" /> },
  { num: 2, label: 'Contactos', icon: <UserCheck className="w-4 h-4" /> },
  { num: 3, label: 'Documentos', icon: <FileText className="w-4 h-4" /> },
  { num: 4, label: 'Finalizar', icon: <CheckCircle className="w-4 h-4" /> },
];

const Field = ({ label, required, error, children, id }) => (
  <div className="relative">
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1 text-red-500 text-xs mt-1.5"
        >
          <AlertCircle className="w-3 h-3" /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const Input = ({ className = '', error, ...props }) => (
  <input 
    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-all duration-300 ${
      error 
        ? 'border-red-300 focus:border-red-400 bg-red-50' 
        : 'border-gray-200 focus:border-primary-400 hover:border-gray-300'
    } ${className}`} 
    {...props} 
  />
);

const Select = ({ children, className = '', error, ...props }) => (
  <select 
    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-all duration-300 bg-white ${
      error 
        ? 'border-red-300 focus:border-red-400 bg-red-50' 
        : 'border-gray-200 focus:border-primary-400 hover:border-gray-300'
    } ${className}`} 
    {...props}
  >
    {children}
  </select>
);

const Textarea = ({ className = '', error, ...props }) => (
  <textarea 
    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:outline-none transition-all duration-300 resize-none ${
      error 
        ? 'border-red-300 focus:border-red-400 bg-red-50' 
        : 'border-gray-200 focus:border-primary-400 hover:border-gray-300'
    } ${className}`} 
    {...props} 
  />
);

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { 
    navigator.clipboard.writeText(text); 
    setCopied(true); 
    toast.success('¡Copiado!', { duration: 1500 });
    setTimeout(() => setCopied(false), 2000); 
  };
  
  return (
    <motion.button 
      onClick={handleCopy} 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }} 
      className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div 
            key="check" 
            initial={{ scale: 0, rotate: -180 }} 
            animate={{ scale: 1, rotate: 0 }} 
            exit={{ scale: 0, rotate: 180 }}
            className="flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 text-green-500" /> Copiado
          </motion.div>
        ) : (
          <motion.div 
            key="copy" 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            exit={{ scale: 0 }}
            className="flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" /> Copiar
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full relative overflow-hidden"
    >
      <motion.div
        animate={{ x: ["0%", "100%"] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </motion.div>
  </div>
);

const PaymentSection = () => (
  <section id="pago" className="section-padding bg-gray-50">
    <div className="container-custom max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="text-center mb-12"
      >
        <motion.span 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
        >
          💳 Forma de pago
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Pago de <span className="text-gradient">Mensualidad</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Realiza tu pago directamente a nuestras cuentas bancarias y envíanos el comprobante.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {BANK_ACCOUNTS.map((account, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: i * 0.1 }} 
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${account.color} p-5`}>
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Landmark className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <p className="text-white font-bold text-lg">{account.bank}</p>
                  <p className="text-white/80 text-sm">{account.type}</p>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Número de cuenta</p>
                  <p className="font-bold text-gray-800 text-lg tracking-wider">{account.number}</p>
                </div>
                <CopyButton text={account.number} />
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Titular</span>
                  <span className="font-semibold text-gray-800">FENALCO Sur de Santander</span>
                </div>
                <div className="flex justify-between">
                  <span>NIT</span>
                  <span className="font-semibold text-gray-800">900473716</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <div className="flex items-start gap-3 mb-5">
          <Info className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
          <h3 className="font-bold text-gray-800 text-lg">Pasos para realizar el pago</h3>
        </div>
        <div className="space-y-4">
          {[
            { step: '1', text: 'Realiza la transferencia o consignación a cualquiera de las cuentas bancarias indicadas.' }, 
            { step: '2', text: 'Guarda el comprobante de pago (foto o PDF).' }, 
            { step: '3', text: 'Envíalo por WhatsApp o correo electrónico con tu nombre y NIT de la empresa.' }, 
            { step: '4', text: 'Nuestro equipo verificará el pago y actualizará tu estado de afiliado en máximo 24 horas hábiles.' }
          ].map((item, idx) => (
            <motion.div 
              key={item.step} 
              initial={{ opacity: 0, x: -10 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.08 }} 
              className="flex items-start gap-4"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.4 }}
                className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
              >
                {item.step}
              </motion.div>
              <p className="text-gray-600 text-sm leading-relaxed pt-1">{item.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
          <motion.a 
            href="https://wa.me/573185840599?text=Hola,%20adjunto%20mi%20comprobante%20de%20pago%20de%20mensualidad%20FENALCO" 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.03, y: -2 }} 
            whileTap={{ scale: 0.98 }} 
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-semibold py-3 px-5 rounded-xl transition-all text-sm shadow-sm hover:shadow-md"
          >
            <Phone className="w-4 h-4" />
            Enviar comprobante por WhatsApp
          </motion.a>
          <motion.a 
            href="mailto:administrativosurdesantander@fenalco.com.co?subject=Comprobante de pago mensualidad" 
            whileHover={{ scale: 1.03, y: -2 }} 
            whileTap={{ scale: 0.98 }} 
            className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-5 rounded-xl transition-all text-sm shadow-sm hover:shadow-md"
          >
            <Mail className="w-4 h-4" />
            Enviar comprobante por correo
          </motion.a>
        </div>
      </motion.div>
    </div>
  </section>
);

const AffiliateForm = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    mode: 'onBlur',
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);

  const formTopRef = useRef(null);
  const formData = watch();

  // 🎯 Auto-save en localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        localStorage.setItem('fenalco_form_draft', JSON.stringify(formData));
        setAutoSaved(true);
        setTimeout(() => setAutoSaved(false), 2000);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // 🎯 Recuperar datos guardados
  useEffect(() => {
    const saved = localStorage.getItem('fenalco_form_draft');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        Object.keys(data).forEach(key => {
          if (data[key]) reset({ ...data, [key]: data[key] });
        });
        toast.success('Datos recuperados del borrador', { icon: '💾' });
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
  }, [reset]);

  const scrollToFormTop = () => { 
    setTimeout(() => { 
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    }, 50); 
  };

  const goNext = () => { 
    setStep(s => s + 1); 
    scrollToFormTop(); 
  };
  
  const goPrev = () => { 
    setStep(s => s - 1); 
    scrollToFormTop(); 
  };

  // 🎯 Calcular progreso
  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(val => val && val !== '').length;
    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log('📤 Enviando solicitud al backend...');
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else if (value !== undefined && value !== null && value !== '') {
          formData.append(key, String(value));
        }
      });
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/affiliations`, { 
        method: 'POST', 
        body: formData 
      });
      
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Error al enviar la solicitud');
      
      // 🎉 Confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast.success('¡Solicitud enviada! Recibirás un correo de confirmación.', {
        duration: 5000,
        icon: '🎉'
      });
      
      setSubmitted(true);
      reset();
      localStorage.removeItem('fenalco_form_draft');
      setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, 100);
    } catch (error) {
      console.error('❌ Error:', error);
      toast.error(error.message || 'Error al enviar. Intenta de nuevo.', {
        duration: 4000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="text-center py-20"
      >
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }} 
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mb-3"
        >
          ¡Solicitud enviada!
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-lg mb-8 max-w-md mx-auto"
        >
          Hemos recibido tu solicitud de afiliación. Nuestro equipo se comunicará contigo en las próximas 24 horas hábiles.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          onClick={() => { setSubmitted(false); setStep(1); }} 
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          Nueva solicitud
        </motion.button>
      </motion.div>
    );
  }

  const progress = calculateProgress();

  return (
    <div>
      <div ref={formTopRef} className="scroll-mt-40" />
      
      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-white rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Progreso del formulario
          </span>
          <div className="flex items-center gap-2">
            {autoSaved && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-green-600 flex items-center gap-1"
              >
                <Save className="w-3 h-3" />
                Guardado
              </motion.span>
            )}
            <span className="text-sm font-bold text-primary-600">{progress}%</span>
          </div>
        </div>
        <ProgressBar progress={progress} />
      </motion.div>

      {/* Steps Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.num}>
              <motion.div 
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  animate={{ 
                    scale: step === s.num ? 1.15 : 1,
                    rotate: step > s.num ? 360 : 0
                  }} 
                  transition={{ duration: 0.3 }} 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step > s.num 
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-200' 
                      : step === s.num 
                      ? 'bg-primary-500 text-white ring-4 ring-primary-100 shadow-lg' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step > s.num ? <Check className="w-6 h-6" /> : s.icon}
                </motion.div>
                <span className={`text-xs font-semibold hidden sm:block transition-colors duration-300 ${
                  step >= s.num ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </motion.div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-1.5 mx-3 rounded-full overflow-hidden bg-gray-200">
                  <motion.div 
                    animate={{ width: step > s.num ? '100%' : '0%' }} 
                    transition={{ duration: 0.5, ease: "easeOut" }} 
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          Paso {step} de {STEPS.length}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* PASO 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm">
                <motion.h3 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
                >
                  <Building2 className="w-5 h-5 text-primary-500" /> 
                  Información de la Empresa
                </motion.h3>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Razón Social" required error={errors.razonSocial?.message} id="razonSocial">
                    <Input 
                      id="razonSocial"
                      {...register('razonSocial', { required: 'Campo obligatorio' })} 
                      placeholder="Ej: Empresa S.A.S" 
                      autoComplete="organization"
                      error={errors.razonSocial}
                    />
                  </Field>
                  
                  <Field label="Nombre Comercial" required error={errors.nombreComercial?.message} id="nombreComercial">
                    <Input 
                      id="nombreComercial"
                      {...register('nombreComercial', { required: 'Campo obligatorio' })} 
                      placeholder="Nombre que usa el negocio" 
                      autoComplete="organization"
                      error={errors.nombreComercial}
                    />
                  </Field>
                  
                  <Field label="NIT" required error={errors.nit?.message} id="nit">
                    <Input 
                      id="nit"
                      {...register('nit', { required: 'Campo obligatorio' })} 
                      placeholder="123456789-0" 
                      autoComplete="off"
                      error={errors.nit}
                    />
                  </Field>
                  
                  <Field label="Matrícula Mercantil N°" required error={errors.matriculaMercantil?.message} id="matriculaMercantil">
                    <Input 
                      id="matriculaMercantil"
                      {...register('matriculaMercantil', { required: 'Campo obligatorio' })} 
                      autoComplete="off"
                      error={errors.matriculaMercantil}
                    />
                  </Field>
                  
                  <Field label="Código CIIU" required error={errors.codigoCIIU?.message} id="codigoCIIU">
                    <Input 
                      id="codigoCIIU"
                      {...register('codigoCIIU', { required: 'Campo obligatorio' })} 
                      placeholder="Ej: 4711" 
                      autoComplete="off"
                      error={errors.codigoCIIU}
                    />
                  </Field>
                  
                  <Field label="Naturaleza del Cliente" id="naturalezaCliente">
                    <Select id="naturalezaCliente" {...register('naturalezaCliente')} autoComplete="off">
                      <option value="">Selecciona</option>
                      <option value="persona_natural">Persona Natural</option>
                      <option value="persona_juridica">Persona Jurídica</option>
                    </Select>
                  </Field>
                  
                  <Field label="Sector" required error={errors.sector?.message} id="sector">
                    <Select id="sector" {...register('sector', { required: 'Campo obligatorio' })} autoComplete="off" error={errors.sector}>
                      <option value="">Selecciona un sector</option>
                      <option value="alimentos">Alimentos y Bebidas</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="textil">Textil y Confección</option>
                      <option value="construccion">Construcción</option>
                      <option value="salud">Salud</option>
                      <option value="comercio">Comercio al por menor</option>
                      <option value="comercio_mayor">Comercio al por mayor</option>
                      <option value="turismo">Turismo y Hotelería</option>
                      <option value="servicios">Servicios Profesionales</option>
                      <option value="educacion">Educación</option>
                      <option value="otro">Otro</option>
                    </Select>
                  </Field>
                  
                  <Field label="Sub Sector" id="subSector">
                    <Input id="subSector" {...register('subSector')} placeholder="Opcional" autoComplete="off" />
                  </Field>
                  
                  <Field label="N° de Empleados" required error={errors.numEmpleados?.message} id="numEmpleados">
                    <Input 
                      id="numEmpleados"
                      type="number" 
                      {...register('numEmpleados', { required: 'Campo obligatorio', min: { value: 1, message: 'Mínimo 1' } })} 
                      placeholder="Ej: 5" 
                      autoComplete="off"
                      error={errors.numEmpleados}
                    />
                  </Field>
                  
                  <Field label="Teléfono Fijo" id="telefonoFijo">
                    <Input 
                      id="telefonoFijo"
                      type="tel" 
                      {...register('telefonoFijo')} 
                      placeholder="Ej: 6077123456" 
                      autoComplete="tel"
                    />
                  </Field>
                  
                  <Field label="Celular" required error={errors.celular?.message} id="celular">
                    <Input 
                      id="celular"
                      type="tel" 
                      {...register('celular', { required: 'Campo obligatorio' })} 
                      placeholder="Ej: 3185840599" 
                      autoComplete="tel"
                      error={errors.celular}
                    />
                  </Field>
                  
                  <Field label="Correo Electrónico" required error={errors.email?.message} id="email">
                    <Input 
                      id="email"
                      type="email" 
                      {...register('email', { 
                        required: 'Campo obligatorio', 
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Correo inválido' } 
                      })} 
                      placeholder="empresa@correo.com" 
                      autoComplete="email"
                      error={errors.email}
                    />
                  </Field>
                </div>
                
                <div className="mt-5">
                  <Field label="Dirección" required error={errors.direccion?.message} id="direccion">
                    <Input 
                      id="direccion"
                      {...register('direccion', { required: 'Campo obligatorio' })} 
                      placeholder="Calle, Carrera, número" 
                      autoComplete="street-address"
                      error={errors.direccion}
                    />
                  </Field>
                </div>
                
                <div className="mt-5">
                  <Field label="Ciudad" required error={errors.ciudad?.message} id="ciudad">
                    <Input 
                      id="ciudad"
                      {...register('ciudad', { required: 'Campo obligatorio' })} 
                      placeholder="Ej: San Gil" 
                      autoComplete="address-level2"
                      error={errors.ciudad}
                    />
                  </Field>
                </div>
                
                <div className="mt-5">
                  <Field label="Productos o Servicios Comercializados" required error={errors.productosServicios?.message} id="productosServicios">
                    <Textarea 
                      id="productosServicios"
                      rows={3} 
                      {...register('productosServicios', { required: 'Campo obligatorio' })} 
                      placeholder="Describe brevemente qué productos o servicios ofrece tu empresa..." 
                      autoComplete="off"
                      error={errors.productosServicios}
                    />
                  </Field>
                </div>
                
                <div className="flex justify-end mt-8">
                  <motion.button 
                    type="button" 
                    onClick={goNext} 
                    whileHover={{ scale: 1.03, x: 5 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    Siguiente 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-primary-500" /> 
                    Representante Legal
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Primer Nombre" required error={errors.repPrimerNombre?.message} id="repPrimerNombre">
                      <Input 
                        id="repPrimerNombre"
                        {...register('repPrimerNombre', { required: 'Obligatorio' })} 
                        autoComplete="given-name"
                        error={errors.repPrimerNombre}
                      />
                    </Field>
                    
                    <Field label="Segundo Nombre" id="repSegundoNombre">
                      <Input 
                        id="repSegundoNombre"
                        {...register('repSegundoNombre')} 
                        autoComplete="additional-name"
                      />
                    </Field>
                    
                    <Field label="Primer Apellido" required error={errors.repPrimerApellido?.message} id="repPrimerApellido">
                      <Input 
                        id="repPrimerApellido"
                        {...register('repPrimerApellido', { required: 'Obligatorio' })} 
                        autoComplete="family-name"
                        error={errors.repPrimerApellido}
                      />
                    </Field>
                    
                    <Field label="Segundo Apellido" id="repSegundoApellido">
                      <Input 
                        id="repSegundoApellido"
                        {...register('repSegundoApellido')} 
                        autoComplete="family-name"
                      />
                    </Field>
                    
                    <Field label="Cédula" required error={errors.repCedula?.message} id="repCedula">
                      <Input 
                        id="repCedula"
                        {...register('repCedula', { required: 'Obligatorio' })} 
                        autoComplete="off"
                        error={errors.repCedula}
                      />
                    </Field>
                    
                    <Field label="Teléfono" required error={errors.repTelefono?.message} id="repTelefono">
                      <Input 
                        id="repTelefono"
                        type="tel" 
                        {...register('repTelefono', { required: 'Obligatorio' })} 
                        autoComplete="tel"
                        error={errors.repTelefono}
                      />
                    </Field>
                    
                    <div className="md:col-span-2">
                      <Field label="Correo electrónico" required error={errors.repEmail?.message} id="repEmail">
                        <Input 
                          id="repEmail"
                          type="email" 
                          {...register('repEmail', { required: 'Obligatorio' })} 
                          autoComplete="email"
                          error={errors.repEmail}
                        />
                      </Field>
                    </div>
                  </div>
                </div>

                {[
                  { title: 'Gerente', prefix: 'gerente' }, 
                  { title: 'Asistente de Gerencia', prefix: 'asistente' }, 
                  { title: 'Dr. Recurso Humano', prefix: 'rrhh' }, 
                  { title: 'Jefe / Jefa de Cartera', prefix: 'cartera' }
                ].map(({ title, prefix }, idx) => (
                  <motion.div 
                    key={prefix}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-all"
                  >
                    <h3 className="text-base font-bold text-gray-700 mb-4">
                      {title} <span className="text-gray-400 font-normal text-sm">(opcional)</span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <Input 
                          id={`${prefix}Nombre`}
                          {...register(`${prefix}Nombre`)} 
                          placeholder="Nombre completo" 
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <Input 
                          id={`${prefix}Telefono`}
                          type="tel" 
                          {...register(`${prefix}Telefono`)} 
                          placeholder="Teléfono" 
                          autoComplete="tel"
                        />
                      </div>
                      <div>
                        <Input 
                          id={`${prefix}Email`}
                          type="email" 
                          {...register(`${prefix}Email`)} 
                          placeholder="Correo electrónico" 
                          autoComplete="email"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="flex justify-between">
                  <motion.button 
                    type="button" 
                    onClick={goPrev} 
                    whileHover={{ scale: 1.03, x: -5 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold px-7 py-3 rounded-xl transition-all"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    Anterior
                  </motion.button>
                  <motion.button 
                    type="button" 
                    onClick={goNext} 
                    whileHover={{ scale: 1.03, x: 5 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md"
                  >
                    Siguiente 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* PASO 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="bg-primary-50 border-2 border-primary-100 rounded-2xl p-5"
                >
                  <label htmlFor="serviciosSocializados" className="flex items-start gap-3 cursor-pointer">
                    <input 
                      id="serviciosSocializados"
                      type="checkbox" 
                      {...register('serviciosSocializados')} 
                      className="mt-1 w-4 h-4 accent-primary-500" 
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Me fueron socializados los servicios y beneficios del portafolio de Fenalco Santander.
                    </span>
                  </label>
                </motion.div>

                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Referencias Comerciales</h3>
                  <p className="text-sm text-gray-500 mb-5">
                    Empresas con las que tiene relación como cliente o proveedor (opcional)
                  </p>
                  
                  {[1, 2].map(n => (
                    <motion.div 
                      key={n}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: n * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-100 transition-all"
                    >
                      <p className="text-sm font-bold text-gray-600 mb-3">Referencia {n}</p>
                      <div className="grid md:grid-cols-3 gap-3">
                        <Input 
                          id={`ref${n}Nombre`}
                          {...register(`ref${n}Nombre`)} 
                          placeholder="Nombre empresa" 
                          autoComplete="organization"
                        />
                        <Input 
                          id={`ref${n}Direccion`}
                          {...register(`ref${n}Direccion`)} 
                          placeholder="Dirección" 
                          autoComplete="street-address"
                        />
                        <Input 
                          id={`ref${n}Telefono`}
                          {...register(`ref${n}Telefono`)} 
                          placeholder="Teléfono" 
                          autoComplete="tel"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Refiera una empresa</h3>
                  <p className="text-sm text-gray-500 mb-5">
                    ¡Obtenga beneficios por referir empresas a Fenalco! (opcional)
                  </p>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input 
                        id="refiere1Nombre"
                        {...register('refiere1Nombre')} 
                        placeholder="Nombre empresa" 
                        autoComplete="organization"
                      />
                      <Input 
                        id="refiere1Direccion"
                        {...register('refiere1Direccion')} 
                        placeholder="Dirección" 
                        autoComplete="street-address"
                      />
                      <Input 
                        id="refiere1Email"
                        type="email" 
                        {...register('refiere1Email')} 
                        placeholder="Correo electrónico" 
                        autoComplete="email"
                      />
                      <Input 
                        id="refiere1Telefono"
                        {...register('refiere1Telefono')} 
                        placeholder="Teléfono" 
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-5">
                    <FileText className="inline w-5 h-5 text-primary-500 mr-2" />
                    Documentos Requeridos
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'docRUT', label: 'RUT', hint: 'Registro Único Tributario' }, 
                      { name: 'docCamara', label: 'Cámara de Comercio', hint: 'No mayor a 30 días' }, 
                      { name: 'docRepresentante', label: 'Cédula Representante Legal', hint: 'Ambos lados' }, 
                      { name: 'docRenta', label: 'Declaración de Renta', hint: 'Último año' }
                    ].map((doc, idx) => (
                      <motion.div 
                        key={doc.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.01, borderColor: '#3b82f6' }}
                        className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:bg-primary-50/30 transition-all"
                      >
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0"
                        >
                          <FileText className="w-5 h-5 text-primary-500" />
                        </motion.div>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-bold text-gray-700">
                            {doc.label} <span className="text-red-500">*</span>
                          </p>
                          <p className="text-xs text-gray-400">{doc.hint}</p>
                          {errors[doc.name] && (
                            <p className="text-red-500 text-xs mt-0.5">{errors[doc.name].message}</p>
                          )}
                        </div>
                        <input 
                          id={doc.name}
                          type="file" 
                          accept=".pdf,.jpg,.jpeg,.png" 
                          {...register(doc.name, { required: 'Documento requerido' })} 
                          className="text-xs text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100 file:transition-all file:cursor-pointer cursor-pointer" 
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <motion.button 
                    type="button" 
                    onClick={goPrev} 
                    whileHover={{ scale: 1.03, x: -5 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold px-7 py-3 rounded-xl transition-all"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    Anterior
                  </motion.button>
                  <motion.button 
                    type="button" 
                    onClick={goNext} 
                    whileHover={{ scale: 1.03, x: 5 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md"
                  >
                    Siguiente 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* PASO 4 */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-5">
                    <CreditCard className="inline w-5 h-5 text-primary-500 mr-2" />
                    Forma de Pago
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-5">
                    <Field label="Periodicidad de Facturación" required error={errors.periodicidad?.message} id="periodicidad">
                      <Select 
                        id="periodicidad"
                        {...register('periodicidad', { required: 'Obligatorio' })} 
                        autoComplete="off"
                        error={errors.periodicidad}
                      >
                        <option value="">Selecciona</option>
                        <option value="mensual">Mensual</option>
                        <option value="trimestral">Trimestral</option>
                        <option value="semestral">Semestral</option>
                        <option value="anual">Anual</option>
                      </Select>
                    </Field>
                    
                    <Field label="N° de Empleados" required error={errors.numEmpleadosPago?.message} id="numEmpleadosPago">
                      <Input 
                        id="numEmpleadosPago"
                        type="number" 
                        {...register('numEmpleadosPago', { required: 'Obligatorio' })} 
                        placeholder="Ej: 5" 
                        autoComplete="off"
                        error={errors.numEmpleadosPago}
                      />
                    </Field>
                    
                    <Field label="Ventas Anuales (COP)" required error={errors.ventas?.message} id="ventas">
                      <Input 
                        id="ventas"
                        type="number" 
                        {...register('ventas', { required: 'Obligatorio' })} 
                        placeholder="Ej: 50000000" 
                        autoComplete="off"
                        error={errors.ventas}
                      />
                    </Field>
                  </div>
                  
                  <div className="mt-5">
                    <Field label="Correo para Facturación Electrónica" required error={errors.emailFacturacion?.message} id="emailFacturacion">
                      <Input 
                        id="emailFacturacion"
                        type="email" 
                        {...register('emailFacturacion', { required: 'Obligatorio' })} 
                        placeholder="facturacion@empresa.com" 
                        autoComplete="email"
                        error={errors.emailFacturacion}
                      />
                    </Field>
                  </div>
                  
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800"
                  >
                    <AlertCircle className="inline w-4 h-4 mr-1.5" />
                    La tarifa está sujeta a verificación por parte de FENALCO. La membresía se paga una única vez, siempre que el afiliado permanezca vinculado.
                  </motion.div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm space-y-5">
                  <h3 className="text-lg font-bold text-gray-800">Autorizaciones y Declaraciones</h3>
                  
                  {[
                    { name: 'autorizacionDatos', title: 'Autorización Tratamiento de Datos', text: 'Autorizo a FENALCO SANTANDER (NIT 890201284-7) para que recopile y trate mi información personal según la ley 1581 de 2012, con la finalidad de propender por el desarrollo del comercio y los comerciantes de la región.' }, 
                    { name: 'declaracionBienes', title: 'Declaración de Origen de Bienes', text: 'Declaro que mis recursos provienen del giro ordinario de mis actividades y no son fruto de actividades ilícitas. Cumplo con las normas sobre prevención de lavado de activos y financiación del terrorismo (LA/FT).' }, 
                    { name: 'clausulaPermanencia', title: 'Cláusula de Permanencia', text: 'Me comprometo a permanecer en la agremiación por mínimo un (1) año, prorrogable automáticamente. Para retiro, notificaré con 30 días calendario de antelación.' }
                  ].map((auth, idx) => (
                    <motion.div 
                      key={auth.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-primary-100 transition-all"
                    >
                      <h4 className="font-bold text-sm text-gray-700 mb-2">{auth.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">{auth.text}</p>
                      <label htmlFor={auth.name} className="flex items-center gap-2.5 cursor-pointer">
                        <input 
                          id={auth.name}
                          type="checkbox" 
                          {...register(auth.name, { required: 'Debes aceptar este campo' })} 
                          className="w-4 h-4 accent-primary-500" 
                        />
                        <span className="text-sm font-semibold text-gray-700">
                          Acepto <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors[auth.name] && (
                        <p className="text-red-500 text-xs mt-1">{errors[auth.name].message}</p>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-5">
                    Firma Electrónica del Representante Legal
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <Field label="Nombre Completo" required error={errors.firmaNombre?.message} id="firmaNombre">
                      <Input 
                        id="firmaNombre"
                        {...register('firmaNombre', { required: 'Obligatorio' })} 
                        placeholder="Nombre y apellidos completos" 
                        autoComplete="name"
                        error={errors.firmaNombre}
                      />
                    </Field>
                    
                    <Field label="Cédula" required error={errors.firmaCedula?.message} id="firmaCedula">
                      <Input 
                        id="firmaCedula"
                        {...register('firmaCedula', { required: 'Obligatorio' })} 
                        placeholder="Número de cédula" 
                        autoComplete="off"
                        error={errors.firmaCedula}
                      />
                    </Field>
                  </div>
                  
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4"
                  >
                    <label htmlFor="firmaConsentimiento" className="flex items-start gap-3 cursor-pointer">
                      <input 
                        id="firmaConsentimiento"
                        type="checkbox" 
                        {...register('firmaConsentimiento', { required: 'Debes aceptar para continuar' })} 
                        className="mt-1 w-4 h-4 accent-primary-500" 
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Al marcar esta casilla confirmo que he leído y acepto todos los términos de afiliación a FENALCO Santander. Esta firma electrónica tiene la misma validez legal que una firma manuscrita. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.firmaConsentimiento && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.firmaConsentimiento.message}</p>
                    )}
                  </motion.div>
                </div>

                <div className="flex justify-between">
                  <motion.button 
                    type="button" 
                    onClick={goPrev} 
                    whileHover={{ scale: 1.03, x: -5 }} 
                    whileTap={{ scale: 0.97 }} 
                    className="flex items-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold px-7 py-3 rounded-xl transition-all"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    Anterior
                  </motion.button>
                  
                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting} 
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:opacity-60 text-white font-bold px-10 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" /> 
                        Enviar Solicitud
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

const Affiliate = () => {
  const [activeTab, setActiveTab] = useState('formulario');
  const tabsSectionRef = useRef(null);
  
  const scrollToTabs = (tab) => { 
    setActiveTab(tab); 
    setTimeout(() => { 
      tabsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
    }, 50); 
  };

  return (
    <div className="pt-20">
      <section className="relative gradient-primary py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} 
            className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }} 
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} 
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" 
          />
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ 
                y: [0, -30, 0], 
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }} 
              transition={{ 
                duration: 3 + (i % 5), 
                repeat: Infinity, 
                delay: i * 0.2 
              }} 
              className="absolute w-1 h-1 bg-white/40 rounded-full" 
              style={{ 
                left: `${10 + (i * 4.5)}%`, 
                top: `${20 + ((i % 3) * 25)}%` 
              }} 
            />
          ))}
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }} 
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-full mb-6 border border-white/20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Únete a más de 500 empresarios
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            >
              Haz parte de la<br />
              <span className="relative">
                <span className="relative z-10">fuerza</span>
                <motion.div 
                  initial={{ scaleX: 0 }} 
                  animate={{ scaleX: 1 }} 
                  transition={{ delay: 0.5, duration: 0.5 }} 
                  className="absolute bottom-0 left-0 right-0 h-4 bg-white/20 rounded-full -z-0" 
                />
              </span> que une
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-xl max-w-2xl mx-auto mb-10"
            >
              Fortalece tu empresa con el respaldo del gremio más importante del Sur de Santander
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -3 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => scrollToTabs('formulario')} 
                className="flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Formulario de Afiliación 
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -3 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => scrollToTabs('pago')} 
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all border border-white/20"
              >
                <Landmark className="w-4 h-4" /> 
                Pagar Mensualidad
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-16 block">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-12"
          >
            <motion.span 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
            >
              Por qué afiliarte
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              ¿Cuáles son los <span className="text-gradient">beneficios</span>?
            </h2>
            <p className="text-gray-500 text-lg">
              Todo lo que obtienes al ser parte de Fenalco Sur de Santander
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {BENEFITS.map((b, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-2xl hover:border-primary-100 transition-all duration-300 group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 ${b.light} rounded-2xl flex items-center justify-center mb-5`}
                >
                  {b.icon}
                </motion.div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="inline-flex items-center gap-2 border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-semibold px-7 py-3 rounded-xl transition-all"
            >
              <Download className="w-4 h-4" /> 
              Descargar Portafolio de Servicios
            </motion.button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-10"
          >
            <motion.span 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
            >
              Documentos necesarios
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Requisitos para <span className="text-gradient">Afiliarse</span>
            </h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {REQUIREMENTS.map((r, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                whileHover={{ y: -5, scale: 1.03 }}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-11 h-11 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300"
                >
                  {r.icon}
                </motion.div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-gray-400">{r.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div ref={tabsSectionRef} className="scroll-mt-20">
        <section className="bg-white py-6 sticky top-20 z-30 shadow-md backdrop-blur-sm bg-white/90">
          <div className="container-custom">
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-2xl p-1.5 flex gap-1">
                {[
                  { id: 'formulario', label: '📋 Formulario de Afiliación' }, 
                  { id: 'pago', label: '🏦 Pagar Mensualidad' }
                ].map(tab => (
                  <motion.button 
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id)} 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-white text-primary-600 shadow-lg' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'formulario' && (
          <motion.section 
            key="formulario" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="section-padding bg-gray-50"
          >
            <div className="container-custom">
              <div className="grid lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
                <div className="lg:col-span-1">
                  <div className="sticky top-40">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white mb-5 shadow-2xl"
                    >
                      <div className="w-16 h-16 bg-white/20 rounded-xl mb-4 flex items-center justify-center border border-white/20">
                        <Phone className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">¿Necesitas ayuda?</h3>
                      <p className="text-white/80 text-sm mb-5">
                        Carolina Chacón<br />Coordinadora Comercial
                      </p>
                      <div className="space-y-3">
                        <motion.a 
                          href="https://wa.me/573185840599?text=Hola,%20necesito%20ayuda%20con%20mi%20afiliación%20a%20Fenalco" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          whileHover={{ scale: 1.05, x: 5 }} 
                          whileTap={{ scale: 0.95 }} 
                          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-sm shadow-lg"
                        >
                          <Phone className="w-4 h-4" /> WhatsApp
                        </motion.a>
                        <motion.a 
                          href="mailto:administrativosurdesantander@fenalco.com.co" 
                          whileHover={{ scale: 1.05, x: 5 }} 
                          whileTap={{ scale: 0.95 }} 
                          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-sm"
                        >
                          <Mail className="w-4 h-4" /> Enviar correo
                        </motion.a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700"
                    >
                      <Info className="inline w-3.5 h-3.5 mr-1" />
                      Tienes dudas sobre el proceso de afiliación, escríbenos y te ayudamos.
                    </motion.div>
                  </div>
                </div>
                
                <div className="lg:col-span-3">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                      Formulario de Afiliación
                    </h2>
                    <p className="text-gray-500">Solicitud oficial — FENALCO Sur de Santander</p>
                  </motion.div>
                  <AffiliateForm />
                </div>
              </div>
            </div>
          </motion.section>
        )}
        
        {activeTab === 'pago' && (
          <motion.div 
            key="pago" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
          >
            <PaymentSection />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section-padding gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} 
            className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} 
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} 
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" 
          />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Tienes dudas sobre la afiliación?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-lg mx-auto">
              Contáctanos directamente y resolveremos todas tus preguntas
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="https://wa.me/573185840599" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.08, y: -3 }} 
                whileTap={{ scale: 0.95 }} 
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-2xl"
              >
                <Phone className="w-5 h-5" /> WhatsApp
              </motion.a>
              <motion.a 
                href="mailto:administrativosurdesantander@fenalco.com.co" 
                whileHover={{ scale: 1.08, y: -3 }} 
                whileTap={{ scale: 0.95 }} 
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all border border-white/20"
              >
                <Mail className="w-5 h-5" /> Enviar correo
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Affiliate;