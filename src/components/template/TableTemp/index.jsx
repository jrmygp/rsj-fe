import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import DynamicEditForm from '@/app/dashboard/_components/DynamicEditForm';
import { useEffect, useState } from 'react';

const TableTemp = ({
  data,
  columns,
  actions = {},
  labels,
  firstRow,
  editFormik,
  renderActions,
  updateStatus,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (updateStatus === 'success') {
      setSelectedRow(null);
    }
  }, [updateStatus]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index} className={column.className}>
              {column.label}
            </TableHead>
          ))}
          {(actions.includes?.includes('edit') ||
            actions.includes?.includes('delete') ||
            renderActions) && (
            <TableHead className='w-24 text-center'>Action</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={row.id || rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex} className={column.className}>
                {column.accessor === 'index'
                  ? firstRow + rowIndex
                  : row[column.accessor] || 'N/A'}
              </TableCell>
            ))}
            {(actions.includes?.includes('edit') ||
              actions.includes?.includes('delete') ||
              renderActions) && (
              <TableCell className='w-24 text-center'>
                <div className='flex justify-center gap-3'>
                  {actions.includes?.includes('edit') && editFormik && (
                    <Dialog
                      open={row.ID === selectedRow}
                      onOpenChange={(isOpen) =>
                        setSelectedRow(isOpen ? row.ID : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setSelectedRow(row.ID);
                            actions.onEdit(row);
                          }}
                        >
                          <MdEdit />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                          <DialogTitle>Edit Entry</DialogTitle>
                          <DialogDescription>
                            Make changes here and click save when done.
                          </DialogDescription>
                        </DialogHeader>
                        <DynamicEditForm formik={editFormik} labels={labels} />
                      </DialogContent>
                    </Dialog>
                  )}
                  {actions.includes?.includes('delete') && actions.onDelete && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>
                          <MdDelete />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. It will permanently
                            delete this entry.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => actions.onDelete(row)}
                            disabled={actions.deleteStatus === 'pending'}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  {renderActions && renderActions(row, rowIndex)}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableTemp;
