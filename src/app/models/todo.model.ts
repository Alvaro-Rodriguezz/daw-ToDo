export class ToDo{
  id?: string;
  name: string;
  description: string;
  status: Status;
}

enum Status{ "En proceso", "Pendiente", "Resuelto"}
