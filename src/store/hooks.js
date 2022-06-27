import { useState, useEffect } from 'react';

// CALL MODAL FORM
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

// DEMO CUSTOM HOOK
function DemoCustomHook() {
  const [DemoCustomHookVal, setDemoCustomHookVal] = useState(0);
  useEffect(()=>{
      setInterval(() => setDemoCustomHookVal(prev => prev + 1), 1000);
  },[]);

return DemoCustomHookVal;
}

export  {useModal, DemoCustomHook};