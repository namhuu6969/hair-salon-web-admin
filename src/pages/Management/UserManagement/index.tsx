import TableComponent, { Column } from "../../../components/Table/TableComponent"

const UserManagement = () => {
  const column:Column[] = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id'
    }
  ]
  return (
    <TableComponent columns={column} apiUri='' title="User"/>
  )
}

export default UserManagement