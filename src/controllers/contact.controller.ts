export const AddNewContactController = (req: any, res: any, next: any) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
};
