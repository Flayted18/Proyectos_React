
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Card
} from '@tremor/react';

const data: {
    id: string,
    name: string,
    email: string,
    github: string
}[] = [
    {
        id: "1",
        name: "Yazman Rodriguez",
        email: "yazmanito@gmail.com",
        github: "yazmanito"
    },
    {
        id: "2",
        name: "John Doe",
        email: "iaejbf@gmail.com",
        github: "johndoe"
    },
    {
        id: "3",
        name: "Jane Smith",
        email: "jane.smith@gmail.com",
        github: "janesmith"
    },
    {
        id: "4",
        name: "Bob Johnson",
        email: "bob.johnson@gmail.com",
        github: "bobjohnson"
    }
];

export default function ListOfUsers() {
  return (
        <Card>

      <Table className='mt-8'>
        <TableHead className="border-b border-tremor-border dark:border-dark-tremor-border">
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell >Email</TableHeaderCell>
            <TableHeaderCell >Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item) => (
              <TableRow key={item.name}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <img style={{width: "32px", height: '32px' }} src={`https://unavatar.io/github/${item.github}`} alt={`Foto de perfil de ${item.name}`} />
                {item.name}
                </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
    
  );
}