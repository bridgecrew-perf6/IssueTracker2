import { format, formatDistanceToNowStrict } from 'date-fns';

export const formatDateTime = date => (
  date ? format(new Date(date), "dd/mm/yy',' h':'mm a") : "No Date Set"
)

export const formatTimeAgo = date => (
  date ? formatDistanceToNowStrict(new Date(date)) : "No Date Set"
)

export const formatFormDate = date => (
  date ? format(new Date(date), "yyyy-MM-dd") : undefined
)

export const formatDateTable = date => (
  date ? format(new Date(date), "dd-MM-yyyy") : undefined
)