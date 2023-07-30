import React, { createContext, useState, useContext, ReactNode } from 'react';

type AlertType = 'info' | 'warning' | 'success' | 'error' | 'loading';

interface IAlertContext {
  alert: string | null;
  type: AlertType;
  showAlert: (message: string, type?: AlertType) => void;
}

const AlertContext = createContext<IAlertContext | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<string | null>(null);
  const [type, setType] = useState<AlertType>('error');

  const showAlert = (message: string, alertType: AlertType = 'error') => {
    setAlert(message);
    setType(alertType);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, type, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): IAlertContext => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within a AlertProvider');
  }
  return context;
};
