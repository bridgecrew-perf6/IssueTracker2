import { format } from 'date-fns';
export const formatDateTime = date => format(new Date(date), "dd/MM/yy',' h':'mm a")