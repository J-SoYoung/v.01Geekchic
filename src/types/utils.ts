export const calculateDaysAgo = (createdAt: string): string => {
  const uploadDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - uploadDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
  return `${daysDifference}일전`;
};