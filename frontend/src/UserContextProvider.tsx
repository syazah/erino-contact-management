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

export type UserContextInterface = {
  openUpdatePopup: boolean;
  setOpenUpdatePopup: React.Dispatch<React.SetStateAction<boolean>>;
  updateItem: ContactType | null;
  setUpdateItem: React.Dispatch<React.SetStateAction<ContactType | null>>;
};

const UserContext = createContext<undefined | UserContextInterface>(undefined);

interface ChildrenInterface {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: ChildrenInterface) => {
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [updateItem, setUpdateItem] = useState<ContactType | null>(null);

  return (
    <UserContext.Provider
      value={{ openUpdatePopup, setOpenUpdatePopup, updateItem, setUpdateItem }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
