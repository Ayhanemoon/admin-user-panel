import React, { useState } from 'react';
import { Link, useResolvedPath } from 'react-router-dom';
import { useGetEntitiesQuery, useDeleteEntityMutation } from 'features/api/entityApi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
  TablePagination,
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@mui/material';
import { entityFormFields, getEntityLabel } from 'utils/EntityForm';

import './EntityIndex.scss';
import TablePaginationActions from '@/components/theme/TablePaginationActions';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const EntityIndex: React.FC<{ entity: string }> = ({ entity }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isLoading, isError } = useGetEntitiesQuery({
    entity,
    page: page + 1, // backend expects 1-based
    limit: rowsPerPage,
  });
  const items = data?.items || data || [];
  const totalCount = data?.total || data?.length || 0;
  
  const [deleteEntity] = useDeleteEntityMutation();
  const resolvedPath = useResolvedPath('');
  const pathName = resolvedPath.pathname.split('/').slice(0, -1).join('/');

  const handleDelete = async (id: string) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟')) {
      await deleteEntity({ entity, id });
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // Logic to fetch new data based on page change

  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>گرفتن اطلاعات با مشکل مواجه شد</div>;

  const columns = Object.keys(entityFormFields[entity] || {});

  function defaultLabelDisplayedRows({ from, to, count }: { from: number; to: number; count: number }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  return (
    <div className="entity-index">
      <div className="entity-index__header">
        <Typography variant="h5" gutterBottom>
          لیست {getEntityLabel(entity, 'plural')}
        </Typography>
        <Button variant="contained" color="info" component={Link} to={`${pathName}/create`}>
          ساخت {getEntityLabel(entity, 'singular')} جدید
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((key) => (
                key === 'id' ? 
                <TableCell sx={{ whiteSpace: 'nowrap' }} key={key}>
                  # شناسه
                </TableCell>
                   : 
                <TableCell sx={{ whiteSpace: 'nowrap' }} key={key}>
                   <strong>{entityFormFields[entity][key]?.label}</strong>
                 </TableCell>
              ))}
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any) => (
              <TableRow key={item.id}>
                {columns.map((key) => (
                  <TableCell
                  key={key}
                  sx={{
                    maxWidth: 150,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Tooltip title={String(item[key] ?? '')} arrow placement="top">
                    <span>{item[key]}</span>
                  </Tooltip>
                </TableCell>
                ))}
                <TableCell align="center">
                  <ButtonGroup size="small" aria-label="Small button group">
                    <IconButton color='primary' aria-label="مشاهده" component={Link} to={`${pathName}/${item.id}`}>
                      <Visibility />
                    </IconButton>
                    <IconButton color='primary' aria-label="ویرایش" component={Link} to={`${pathName}/${item.id}/edit`}>
                      <Edit />
                    </IconButton>
                    <IconButton color='error' aria-label="حذف" onClick={() => handleDelete(item.id)}>
                      <Delete />
                    </IconButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage={null}
      />
    </div>
  );
};

export default EntityIndex;