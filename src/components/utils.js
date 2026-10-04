export function getDeadlineStatus(deadlineStr) {
  if (!deadlineStr) return null;
  const deadline = new Date(deadlineStr);
  const now = new Date();
  const diffTime = deadline - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { text: "Expired", color: "text-red-600 bg-red-50 border-red-200" };
  } else if (diffDays <= 7) {
    return { text: "Closing soon", color: "text-orange-600 bg-orange-50 border-orange-200" };
  }
  return null;
}
