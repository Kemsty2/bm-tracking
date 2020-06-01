import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton,
  Tooltip,
  useTheme,
  Badge,
  CardHeader,
  Divider,
  Button,
} from '@material-ui/core';

import { useStyles } from '../../../../assets/styles/DevicesPage/devicesList.style';
import { Device } from '../../../../models/Device';
import { FaEdit, FaMapMarkedAlt, FaPowerOff, FaUpload, FaDownload } from 'react-icons/fa';
import SearchInput from '../../../../components/SearchInput';
import { Add } from '@material-ui/icons';

type Props = {
  className?: any;
  devices: Device[];
};

const DevicesTable: React.FC<Props> = ({ className, devices, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [selectedDevices, setSelectedDevices] = useState([] as string[]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event: any) => {
    let selectedDevices: string[];

    if (event.target.checked) {
      selectedDevices = devices.map((device: Device) => device.id);
    } else {
      selectedDevices = [];
    }

    setSelectedDevices(selectedDevices);
  };

  const handleSelectOne = (_: any, id: string) => {
    const selectedIndex = selectedDevices.indexOf(id);
    let newSelectedDevices: any = [];

    if (selectedIndex === -1) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices, id);
    } else if (selectedIndex === 0) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices.slice(1));
    } else if (selectedIndex === selectedDevices.length - 1) {
      newSelectedDevices = newSelectedDevices.concat(selectedDevices.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDevices = newSelectedDevices.concat(
        selectedDevices.slice(0, selectedIndex),
        selectedDevices.slice(selectedIndex + 1),
      );
    }

    setSelectedDevices(newSelectedDevices);
  };

  const handlePageChange = (_: any, page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title="List of Devices"
        action={
          <>
            <Tooltip title="Import">
              <IconButton>
                <FaUpload />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export">
              <IconButton>
                <FaDownload />
              </IconButton>
            </Tooltip>
            <Button color="primary" variant="contained">
              <Add />
              Add Device
            </Button>
          </>
        }
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.row}>
            <SearchInput className={classes.searchInput} placeholder="Search Device" />
          </div>
          <Divider />
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDevices.length === devices.length}
                      color="primary"
                      indeterminate={selectedDevices.length > 0 && selectedDevices.length < devices.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>N°</TableCell>
                  <TableCell>Device Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>LastUpdate</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell align="center">Disabled</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.slice(0, rowsPerPage).map((device: Device, index: number) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={device.id}
                    selected={selectedDevices.indexOf(device.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedDevices.indexOf(device.id) !== -1}
                        color="primary"
                        onChange={(event) => handleSelectOne(event, device.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>{index}</div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{device.name}</Typography>
                    </TableCell>
                    <TableCell>{device.status}</TableCell>
                    <TableCell>{moment(device.lastUpdate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{device.phone}</TableCell>
                    <TableCell>{device.model ? device.model : 'Not Defined'}</TableCell>
                    <TableCell align="center">
                      <Badge
                        color={device.disabled ? 'error' : 'primary'}
                        badgeContent={device.disabled ? 'Disabled' : 'Active'}
                      />
                    </TableCell>
                    <TableCell>{device.groupId}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Monitor">
                        <IconButton>
                          <FaMapMarkedAlt />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton>
                          <FaEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={device.disabled ? 'Activate' : 'Desactivate'}>
                        <IconButton>
                          <FaPowerOff color={device.disabled ? theme.palette.error.main : theme.palette.success.main} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={devices.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

export default DevicesTable;
