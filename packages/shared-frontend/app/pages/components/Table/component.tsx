import React from 'react'

import {
  Avatar,
  Checkbox,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

//
// This is unsuported in v5 of mui
//
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

// const columns = [
//   {
//     field: 'name',
//     headerName: 'Dessert',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'calories',
//     headerName: 'Calories',
//     type: 'number',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'fat',
//     headerName: 'Fat',
//     type: 'number',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'carbs',
//     headerName: 'Carbs',
//     type: 'number',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'protein',
//     headerName: 'Protein',
//     type: 'number',
//     width: 150,
//     editable: true,
//   },
// ]

const rows = [
  {
    id: 1,
    chef: 'R',
    name: 'Frozen yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    availability: 'Available!',
  },
  {
    id: 2,
    chef: 'G',
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
    availability: 'Limited.',
  },
  {
    id: 3,
    chef: 'G',
    name: 'Macaron',
    calories: 262,
    fat: 16,
    carbs: 24,
    protein: 6,
    availability: 'Available!',
  },
  {
    id: 4,
    chef: 'A',
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    availability: 'Available!',
  },
  {
    id: 5,
    chef: 'R',
    name: 'Gingerbread',
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
    availability: 'Sold out.',
  },
]

const handleChipVariant = (availability: string) => {
  if (availability === 'Available!') {
    return 'filled'
  } else {
    return 'outlined'
  }
}

const handleChefAvatar = (chef: string) => {
  if (chef === 'R') return '#008FB2'
  if (chef === 'G') return '#EE586B'
  if (chef === 'A') return '#FDB5A5'
}

export const Tables = () => {
  return (
    <>
      <Grid
        sx={{
          flex: 1,
        }}
        container
        spacing={8}
      >
        <Grid item xs={12}>
          <Typography variant="h6">Table</Typography>
        </Grid>

        <Grid item container xs={10}>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: '650px' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving) </TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat (g)</TableCell>
                  <TableCell align="right">Carbs (g)</TableCell>
                  <TableCell align="right">Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item container xs={10}>
          <TableContainer component={Paper}>
            <Table
              style={{ minWidth: '650px' }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving) </TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat (g)</TableCell>
                  <TableCell align="right">Carbs (g)</TableCell>
                  <TableCell align="right">Protein (g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item container xs={10}>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: '650px' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="80px">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Chef </TableCell>
                  <TableCell>Dessert</TableCell>
                  <TableCell align="right">% of Daily Calories</TableCell>
                  <TableCell align="right">Fat (g)</TableCell>
                  <TableCell align="right">Carbs (g)</TableCell>
                  <TableCell align="right">Availability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Avatar
                        style={{ backgroundColor: handleChefAvatar(row.chef) }}
                      >
                        {row.chef}
                      </Avatar>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <LinearProgress
                        style={{ borderRadius: '8px', height: '6px' }}
                        variant="determinate"
                        value={(row.calories / 2000) * 100}
                      />
                    </TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">
                      <Chip
                        color="primary"
                        variant={handleChipVariant(row.availability)}
                        label={row.availability}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* <Grid container item xs={10} style={{ height: 435, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            rowsPerPageOptions={[5]}
            pageSize={5}
          />
        </Grid> */}
      </Grid>
    </>
  )
}
