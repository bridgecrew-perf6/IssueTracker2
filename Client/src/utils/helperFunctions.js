import { format, formatDistanceToNowStrict } from 'date-fns';

export const formatDateTime = date => (
  date ? format(new Date(date), "dd/MM/yy',' h':'mm a") : "No Date Set"
)

export const formatTimeAgo = date => (
  date ? formatDistanceToNowStrict(new Date(date)) : "No Date Set"
)