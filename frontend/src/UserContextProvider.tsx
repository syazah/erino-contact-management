import { createContext, useState } from "react";

export type ContactType = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
};
export type ErrorOcurred = {
  ocurred: boolean;
  message: string;
};

export type UserContextInterface = {
  openUpdatePopup: boolean;
  reload: boolean;
  setOpenUpdatePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  updateItem: ContactType | null;
  setUpdateItem: React.Dispatch<React.SetStateAction<ContactType | null>>;
  currentError: ErrorOcurred;
  setCurrentError: React.Dispatch<React.SetStateAction<ErrorOcurred>>;
};

const UserContext = createContext<undefined | UserContextInterface>(undefined);

interface ChildrenInterface {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: ChildrenInterface) => {
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [updateItem, setUpdateItem] = useState<ContactType | null>(null);
  const [currentError, setCurrentError] = useState({
    ocurred: false,
    message: "",
  });
  const [reload, setReload] = useState(true);
  return (
    <UserContext.Provider
      value={{
        openUpdatePopup,
        setOpenUpdatePopup,
        updateItem,
        setUpdateItem,
        currentError,
        setCurrentError,
        reload,
        setReload,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
