import theme from 'theme/theme';
import React, { useState } from 'react';
import { format, newDate } from "date-fns-jalali";
import { Link, useResolvedPath } from 'react-router-dom';
import { convertToPersianDigits } from '@/utils/numbers';
import { entityFormFields, getEntityLabel } from 'utils/EntityForm';
import { AddCircle, Delete, Edit, Visibility } from '@mui/icons-material';
import { useGetEntitiesQuery, useDeleteEntityMutation } from 'features/api/entityApi';
// import TablePaginationActions from '@/components/theme/TablePaginationActions';

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
  useMediaQuery,
} from '@mui/material';

import './EntityIndex.scss';

const EntityIndex: React.FC<{ entity: string }> = ({ entity }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>گرفتن اطلاعات با مشکل مواجه شد</div>;

  const columns = Object.keys(entityFormFields[entity] || {});

  return (
    <div className="entity-index">
      <div className="entity-index__header">
        <Typography variant="h5" gutterBottom>
          لیست {getEntityLabel(entity, 'plural')}
        </Typography>
          { isMobile ? (
            <IconButton sx={{color: 'white'}} aria-label="ساخت" color="info" component={Link} to={`${pathName}/create`}>
              <Tooltip title={`ساخت ${getEntityLabel(entity, 'singular')} جدید`} arrow placement="top">
                <AddCircle />
              </Tooltip>
            </IconButton>
          ): (
            <Button variant="contained" color="info" component={Link} to={`${pathName}/create`}>
              ساخت {getEntityLabel(entity, 'singular')} جدید
            </Button>
            )
          }
        
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
                  <Tooltip title={String((entityFormFields[entity][key].type === 'date' ? convertToPersianDigits(format(item[key], "yyyy/MM/dd")) : item[key])?? '')} arrow placement="top">
                  { entityFormFields[entity][key].type === 'date' ?
                   (<span>{convertToPersianDigits(format(item[key], "yyyy/MM/dd"))}</span>) : 
                   (<span>{item[key]}</span>)}
                  </Tooltip>
                </TableCell>
                ))}
                <TableCell align="center">
                  <ButtonGroup size="small" aria-label="Small button group">
                    <IconButton color='primary' aria-label="مشاهده" component={Link} to={`${pathName}/${item.id}`}>
                      <Tooltip title={'مشاهده'} arrow placement="top">
                        <Visibility />
                      </Tooltip>
                    </IconButton>
                    <IconButton color='primary' aria-label="ویرایش" component={Link} to={`${pathName}/${item.id}/edit`}>
                      <Tooltip title={'ویرایش'} arrow placement="top">
                        <Edit />
                      </Tooltip>
                    </IconButton>
                    <IconButton color='error' aria-label="حذف" onClick={() => handleDelete(item.id)}>
                      <Tooltip title={'حذف'} arrow placement="top">
                        <Delete />
                      </Tooltip>
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