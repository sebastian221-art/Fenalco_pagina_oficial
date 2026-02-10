import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Briefcase, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';

const iconMap = {
  Users: Users,
  Award: Award,
  Briefcase: Briefcase,
};

const ServiceCard = ({ service, index }) => {
  const Icon = iconMap[service.icon] || Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card padding="none" className="overflow-hidden group">
        {/* Image */}
        <div className="relative h-56 image-placeholder overflow-hidden">
          [IMAGEN: {service.title}]
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-500/30">
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-primary-600 transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <ul className="space-y-2 mb-6">
              {service.features.slice(0, 3).map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-700"
                >
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <button className="text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
            Más información
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
