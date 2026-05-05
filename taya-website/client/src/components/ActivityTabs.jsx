import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

function ActivityTabs({ activities }) {
  const [activeTab, setActiveTab] = useState('women');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8 text-center">
        Shop by Activity
      </h2>
      <div className="flex justify-center mb-8">
        <div className="inline-flex border">
          <button
            onClick={() => setActiveTab('men')}
            className={`px-6 py-2 text-sm tracking-wide transition-colors ${
              activeTab === 'men'
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:text-black'
            }`}
          >
            Mens
          </button>
          <button
            onClick={() => setActiveTab('women')}
            className={`px-6 py-2 text-sm tracking-wide transition-colors ${
              activeTab === 'women'
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:text-black'
            }`}
          >
            Womens
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {activities[activeTab].map((activity) => (
          <Link
            key={activity.slug}
            to="#"
            className="group block relative overflow-hidden"
          >
            <div className="aspect-[4/5] overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                fallbackText={activity.name}
                fallbackBackground="#d4d4d4"
                fallbackForeground="#333333"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-center text-sm md:text-base font-medium tracking-wide">
                {activity.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ActivityTabs;
