export type CardPriority = 'low' | 'medium' | 'high';

export type CardDto = {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  assignedTo?: string;
  priority?: CardPriority;
};
