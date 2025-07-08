import { Globe } from 'lucide-react'

const Switch = () => {
  return (
    <label className="w-18 h-8 bg-[#121212] shadow-inner rounded-full flex items-center px-1 relative cursor-pointer select-none border border-gray-600 transition-all duration-300 hover:bg-[#1a1a1a]">
      <input type="checkbox" className="peer hidden" />
      
      <span className="absolute left-2 text-sm font-semibold text-gray-300 transition-all duration-500 peer-checked:text-gray-500 peer-checked:opacity-60 z-10">
        Fr
      </span>
      <span className="absolute right-2 text-sm font-semibold text-gray-500 opacity-60 transition-all duration-500 peer-checked:text-gray-300 peer-checked:opacity-100 z-10">
        En
      </span>
      
      <div className="w-6 h-6 flex justify-center items-center text-white rounded-full duration-500 transform peer-checked:translate-x-10 shadow-lg hover:shadow-xl z-20" 
           style={{ 
             background: 'linear-gradient(135deg, #5d1a2f, #2d000f)',
             border: '2px solid #6d1e3f'
           }}>
        <Globe size={14} />
      </div>
    </label>
  );
}

export default Switch;