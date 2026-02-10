import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { CONTACT_INFO, COMPANY_INFO, NAV_ITEMS } from '@/utils/constants';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white pt-24 pb-12">
      {/* Wave Divider Top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none -translate-y-px">
        <svg
          className="relative block w-full h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="currentColor"
            className="text-gray-800"
          />
        </svg>
      </div>

      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-14 h-14 image-placeholder rounded-xl group-hover:scale-105 transition-transform">
                LOGO
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors">
                  Fenalco
                </h3>
                <p className="text-sm text-gray-400">Sur de Santander</p>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {COMPANY_INFO.fullName}. Representando y fortaleciendo el sector
              empresarial de San Gil y la región desde hace más de 30 años.
            </p>
            <div className="flex gap-4">
              <a
                href={CONTACT_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={CONTACT_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors inline-block link-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary-400" />
                <div className="text-sm">
                  <p>{CONTACT_INFO.address}</p>
                  <p className="text-gray-400">{CONTACT_INFO.city}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0 text-primary-400" />
                <div className="text-sm">
                  {CONTACT_INFO.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone}`}
                      className="block hover:text-primary-400 transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-primary-400" />
                <div className="text-sm space-y-1">
                  {CONTACT_INFO.emails.map((email, index) => (
                    <a
                      key={index}
                      href={`mailto:${email}`}
                      className="block hover:text-primary-400 transition-colors break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 flex-shrink-0 text-primary-400" />
                <div className="text-sm">
                  <p className="font-semibold">{CONTACT_INFO.schedule.weekdays}</p>
                  <p>{CONTACT_INFO.schedule.morning}</p>
                  <p>{CONTACT_INFO.schedule.afternoon}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} {COMPANY_INFO.shortName} - NIT{' '}
              {COMPANY_INFO.nit}. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                to="/politica-privacidad"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                to="/terminos"
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
