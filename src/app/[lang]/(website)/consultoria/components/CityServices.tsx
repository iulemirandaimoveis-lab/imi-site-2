'use client'

import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import {
    Building2,
    Briefcase,
    Banknote,
    Settings,
    CreditCard,
    Home,
    TrendingUp,
    Search,
    BarChart3,
    LucideIcon
} from 'lucide-react'
import { ConsultingCity } from '../data/cities'

interface CityServicesProps {
    city: ConsultingCity
}

const iconMap: Record<string, LucideIcon> = {
    'Building2': Building2,
    'Briefcase': Briefcase,
    'Banknote': Banknote,
    'Settings': Settings,
    'CreditCard': CreditCard,
    'Home': Home,
    'TrendingUp': TrendingUp,
    'Search': Search,
    'BarChart3': BarChart3,
}

export default function CityServices({ city }: CityServicesProps) {
    return (
        <section className="section-padding">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-imi-900 mb-6 font-display">
                        Serviços de Consultoria em {city.name}
                    </h2>
                    <p className="text-lg text-imi-500 max-w-2xl mx-auto font-light">
                        Oferecemos suporte 360º para sua jornada de investimento, desde a estruturação jurídica até a gestão operacional.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                >
                    {city.services.map((service, index) => {
                        const Icon = iconMap[service.icon] || Building2
                        return (
                            <motion.div
                                key={index}
                                variants={slideUp}
                                className="p-10 rounded-3xl bg-white border border-imi-100 shadow-soft hover:shadow-card-hover transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-imi-900 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-imi-900 mb-4 font-display">
                                    {service.title}
                                </h3>
                                <p className="text-imi-500 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
