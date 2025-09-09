interface ServiceChipsProps {
    services: string[];
    className?: string;
}

export default function ServiceChips({ services, className = "" }: ServiceChipsProps) {
    return (
        <div className={`flex flex-wrap gap-3 ${className}`}>
            {services.map((service, index) => (
                <span
                    key={index}
                    className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full font-mono border border-gray-700"
                >
                    {service}
                </span>
            ))}
        </div>
    );
}