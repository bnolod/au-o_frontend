import { useEffect, useState } from "react";

export default function DriversLicense() {
      const [isDark, setIsDark] = useState(false);
      useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
    
        if (mq.matches) {
          setIsDark(true);
        }
    
        // This callback will fire if the perferred color scheme changes without a reload
        mq.addEventListener('change', (evt) => setIsDark(evt.matches));
      }, []);
    return (
    <div className="bg-backdropSecondary text-textColor rounded-xl p-3 h-1/3 aspect-[90/55] flex">
        <div >
        <img src={isDark ? '/assets/auoLogo_white.svg' : '/assets/auoLogo_black.svg'} className="" alt="AUO logo" />
        <h1>_igazolvány</h1>
        </div>
    </div>
    
    )

}