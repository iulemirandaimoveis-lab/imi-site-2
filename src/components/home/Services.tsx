'use client'

import { FileText, TrendingUp, Home } from 'lucide-react'

interface ServicesProps {
    dict: {
        card_appraisals_title: string
        card_appraisals_desc: string
        card_consulting_title: string
        card_consulting_desc: string
        card_brokerage_title: string
        card_brokerage_desc: string
    }
}

export default function Services({ dict }: ServicesProps) {
    return (
        <section className="section-padding bg-imi-50">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {/* Card 1 */}
                    <div className="group p-8 rounded-xl bg-white border border-imi-100 shadow-soft hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-12 h-12 bg-imi-900 text-white rounded-xl flex items-center justify-center mb-6">
                            <FileText className='w-5 h-5' strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-imi-900 mb-3 font-display">{dict.card_appraisals_title}</h3>
                        <p className="text-imi-500 leading-relaxed text-sm">
                            {dict.card_appraisals_desc}
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-8 rounded-xl bg-white border border-imi-100 shadow-soft hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-12 h-12 bg-imi-900 text-white rounded-xl flex items-center justify-center mb-6">
                            <TrendingUp className='w-5 h-5' strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-imi-900 mb-3 font-display">{dict.card_consulting_title}</h3>
                        <p className="text-imi-500 leading-relaxed text-sm">
                            {dict.card_consulting_desc}
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group p-8 rounded-xl bg-white border border-imi-100 shadow-soft hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
                        <div className="w-12 h-12 bg-imi-900 text-white rounded-xl flex items-center justify-center mb-6">
                            <Home className='w-5 h-5' strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-imi-900 mb-3 font-display">{dict.card_brokerage_title}</h3>
                        <p className="text-imi-500 leading-relaxed text-sm">
                            {dict.card_brokerage_desc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
