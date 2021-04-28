export class ToDo{
  id?: string;
  name: string;
  description: string;
  status: Status;
  date: string;
  priority: number;
}

enum Status{ "En proceso", "Pendiente", "Resuelto"}
