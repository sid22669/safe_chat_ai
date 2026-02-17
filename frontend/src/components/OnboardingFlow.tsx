import { useState } from 'react';
import { Shield, AlertTriangle, Brain, ChevronRight } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Shield,
      gradient: 'from-blue-400 to-cyan-500',
      title: 'Advanced Spam Detection',
      description: 'Our AI-powered system automatically identifies and filters spam messages, keeping your inbox clean and safe.',
    },
    {
      icon: AlertTriangle,
      gradient: 'from-red-400 to-pink-500',
      title: 'Harassment Filtering',
      description: 'Detect and block harassment, threats, and toxic messages before they reach you. Stay protected 24/7.',
    },
    {
      icon: Brain,
      gradient: 'from-purple-400 to-indigo-500',
      title: 'AI-Based Safety',
      description: 'Machine learning algorithms continuously learn and adapt to new threats, providing you with cutting-edge protection.',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 max-w-md mx-auto">
      <div className="p-6 flex justify-end">
        <button onClick={onComplete} className="text-slate-600 hover:text-slate-900 transition-colors">
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        <div className={`w-40 h-40 bg-gradient-to-br ${slide.gradient} rounded-full flex items-center justify-center mb-8 shadow-xl`}>
          <slide.icon className="w-20 h-20 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 text-center mb-4">{slide.title}</h1>
        <p className="text-slate-600 text-center leading-relaxed max-w-sm">{slide.description}</p>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className={`w-full py-4 px-6 bg-gradient-to-r ${slide.gradient} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
        >
          <span className="text-lg font-semibold">
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
